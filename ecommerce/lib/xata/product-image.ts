import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iProductImage } from "$lib/interface"

export const getProductImage = async (productImageId: string) => {
  const xata = getXataClient()
  try {
    const productImage = await xata.db.product_image
    .filter({ xata_id: productImageId })
    .select(["*", "product.*", "image.*"])
    .getFirst()
    
    return onSuccess(productImage)
  } catch (error: any) {
    console.log("getProductImage()", error.message)
    return onError(error.message)
  }
}

export const addProductImage = async (partialProductImage: Partial<iProductImage>) => {
  const xata = getXataClient()
  try {
    const productImage = await xata.db.product_image.create({
      ...partialProductImage
    })
    return onSuccess(productImage)
  } catch (error: any) {
    console.log("addProductImage()", error.message)
    return onError(error.message)
  }
}

export const deleteProductImage = async (productImageId: string) => {
  const xata = getXataClient()

  try {
    const productImage = await xata.db.product_image.delete(productImageId)
    return onSuccess(productImage)
  } catch (error: any) {
    console.log("deleteProductImage()", error.message)
    return onError(error.message)
  }
}

export const updateProductImage = async (productImageId: string, data: any) => {
  const xata = getXataClient()

  try {
    const productImage = await xata.db.product_image.update(productImageId, data)
    return onSuccess(productImage)
  } catch (error: any) {
    console.log("updateProductImage()", error.message)
    return onError(error.message)
  } 
}

export const getCategories = async () => {
  const xata = getXataClient()

  try {
    const categories = await xata.db.product_image
    .select(["*", "product.*", "image.*"])
    .sort("xata_updatedat", "desc")
    .getMany({ pagination: { size: 200 } })

    return onSuccess(categories)
  } catch (error: any) {
    console.log("getCategories()", error.message)
    return onError(error.message)
  }
}