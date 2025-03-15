import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iProduct, iRecentlyViewed, iUser } from "$lib/interface"

export const addRecentlyViewed = async (partialRecentlyViewed: Partial<iRecentlyViewed>) => {
  const xata = getXataClient()
  try {
    const exists = await xata.db.recently_viewed
    .filter({
      product: partialRecentlyViewed.product as string,
      user: partialRecentlyViewed.user as string
    }).getFirst()

    if (exists) {
      const recently_viewed = await xata.db.recently_viewed.update(exists.xata_id, partialRecentlyViewed)
      return onSuccess(recently_viewed)
    } else {
      const recently_viewed = await xata.db.recently_viewed.create({
        ...partialRecentlyViewed
      })
      return onSuccess(recently_viewed)
    }
  } catch (error: any) {
    console.log("addRecentlyViewed()", error.message)
    return onError(error.message)
  }
}

export const deleteRecentlyViewed = async (recently_viewedId: string) => {
  const xata = getXataClient()

  try {
    const recently_viewed = await xata.db.recently_viewed.delete(recently_viewedId)
    return onSuccess(recently_viewed)
  } catch (error: any) {
    console.log("deleteRecentlyViewed()", error.message)
    return onError(error.message)
  }
}

export const getRecentlyViewed = async (me?: iUser) => {
  const xata = getXataClient()

  if (!me) {
    return onError("Not authenticated", [])
  }

  const userId = me.xata_id

  try {
    const recents = await xata.db.recently_viewed
    .select(["*", "product.*", "product.thumbnail.*",  "product.category.*"])
    .filter({
      user: userId
    })
    .sort("xata_updatedat", "desc")
    .getMany({ pagination: { size: 10 } })


    const products = recents.map(rv => rv.product)

    const getTXQuery = (image: string) => {
      return {
        get: {
          table: 'image',
          id: image,
          columns: ['fileId', 'url']
        }
      }
    }

    const promise = async (images: string[]) => {
      const transactions = images.map(getTXQuery)
      const productimages = await xata.transactions.run(transactions as any)
      return productimages
    }

    const getPromises = async (product: iProduct) => {
      let newProduct: iProduct = { ...product }
      const images = await promise(product.images as any[])
      newProduct.images = images.results.map((result: any) => ({ ...result.columns }))
      return newProduct
    }

    const promises = products.map(product => getPromises(product as unknown as iProduct))

    const results = await Promise.all(promises)
 
    return onSuccess(results)
  } catch (error: any) {
    console.trace("getRecentlyViewed()", error.message)
    return onError(error.message)
  }
}