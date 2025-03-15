import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iProduct, iUser, iXataCart } from "$lib/interface"
import { getProduct } from "./product"

export const getCart = async (user: string) => {
  const xata = getXataClient()

  try {
    const cart = await xata.db.cart
      .select(["*", "product.*", "product.thumbnail.*", "product.category.*"])
      .filter({ user })
      .sort("xata_createdat", "desc")
      .getMany()

    const promise = async (productId: string) => {
      const result = await getProduct(productId)
      return result.data as iProduct
    }

    let originalCartItems = cart as unknown as iXataCart[]
    let newCartItems: iXataCart[] = []
    let len = originalCartItems.length

    for (let i = 0; i < len; i++) {
      const cartItem = originalCartItems[i]
      const productId = (cartItem.product as iProduct).xata_id as string
      const product = await promise(productId)

      let newCartItem = { ...cartItem }
      newCartItem.product = product
      newCartItems = [...newCartItems, newCartItem]
    }
    return onSuccess(newCartItems)
  } catch (error: any) {
    console.log("getCart()", error.message)
    return onError(error.message, [])
  }
}

const getCartItem = async (xata_id: string) => {
  const xata = getXataClient()
  const cart = await xata.db.cart
    .select(["*", "product.*", "product.thumbnail.*", "product.category.*"])
    .filter({ xata_id })
    .getFirst()

  return cart
}

export const addCart = async (cart: Partial<iXataCart>) => {
  const xata = getXataClient()

  try {

    const exists = await xata.db.cart
      .select(["*", "product.*", "product.thumbnail.*", "product.category.*"])
      .filter({
        user: cart.user,
        product: cart.product as string
      }).getFirst()

    if (exists) {
      const result = await xata.db.cart.update(exists.xata_id, cart)
      const cartItem = await getCartItem(result!.xata_id)
      return onSuccess(cartItem)
    } else {
      const result = await xata.db.cart.create(cart)
      const cartItem = await getCartItem(result!.xata_id)
      return onSuccess(cartItem)
    }

  } catch (error: any) {
    console.log("addCart()", error.message)
    return onError(error.message)
  }
}

export const updateCart = async (cartId: string, data: Partial<iXataCart>) => {
  const xata = getXataClient()

  try {
    const result = await xata.db.cart
      .update(cartId, {
        product: (data.product as iProduct).xata_id,
        user: (data.user as iUser).xata_id,
        quantityOrdered: Number(data.quantityOrdered)
      })

    const cartItem = await getCartItem(result!.xata_id)
    return onSuccess(cartItem)
  } catch (error: any) {
    console.log("updateCart()", error.message)
    return onError(error.message)
  }
}

export const deleteCart = async (cartId: string) => {
  const xata = getXataClient()

  try {
    const cart = await xata.db.cart.delete(cartId)
    return onSuccess(cart)
  } catch (error: any) {
    console.log("deleteCart()", error.message)
    return onError(error.message)
  }
}

export const clearCart = async (cartStore: iXataCart[]) => {
  const xata = getXataClient()

  try {
    const transactions = cartStore.map(cart => ({
      delete: {
        table: 'cart',
        id: cart.xata_id
      }
    }))
    const result = await xata.transactions.run(transactions as any)
    return onSuccess(result)
  } catch (error: any) {
    console.log("deleteCart()", error.message)
    return onError(error.message)
  }
}