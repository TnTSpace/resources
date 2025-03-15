import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iShipping } from "$lib/interface"

export const getShipping = async (shippingId: string) => {
  const xata = getXataClient()
  try {
    const shipping = await xata.db.shipping
    .filter({ xata_id: shippingId })
    .getFirst()
    
    return onSuccess(shipping)
  } catch (error: any) {
    console.log("getShipping()", error.message)
    return onError(error.message)
  }
}

export const addShipping = async (partialShipping: Partial<iShipping>) => {
  const xata = getXataClient()
  try {
    const shipping = await xata.db.shipping.create({
      ...partialShipping
    })
    return onSuccess(shipping)
  } catch (error: any) {
    console.log("addShipping()", error.message)
    return onError(error.message)
  }
}

export const deleteShipping = async (shippingId: string) => {
  const xata = getXataClient()

  try {
    const shipping = await xata.db.shipping.delete(shippingId)
    return onSuccess(shipping)
  } catch (error: any) {
    console.log("deleteShipping()", error.message)
    return onError(error.message)
  }
}

export const updateShipping = async (shippingId: string, data: any) => {
  const xata = getXataClient()

  try {
    const shipping = await xata.db.shipping.update(shippingId, data)
    return onSuccess(shipping)
  } catch (error: any) {
    console.log("updateShipping()", error.message)
    return onError(error.message)
  } 
}

export const getShippings = async () => {
  const xata = getXataClient()

  try {
    const categories = await xata.db.shipping 
    .sort("xata_updatedat", "desc")
    .getMany({ pagination: { size: 200 } })

    return onSuccess(categories)
  } catch (error: any) {
    console.log("getShippings()", error.message)
    return onError(error.message)
  }
}