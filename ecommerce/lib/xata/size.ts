import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iSize } from "$lib/interface"

export const getSize = async (sizeId: string) => {
  const xata = getXataClient()
  try {
    const size = await xata.db.size
      .select(["*", "category.*"])
      .filter({ xata_id: sizeId })
      .getFirst()
    return onSuccess(size)
  } catch (error: any) {
    console.log("getSize()", error.message)
    return onError(error.message)
  }
}

export const addSize = async (partialSize: Partial<iSize>) => {
  const xata = getXataClient()
  try {
    const size = await xata.db.size.create({
      ...partialSize
    })
    return onSuccess(size)
  } catch (error: any) {
    console.log("addSize()", error.message)
    return onError(error.message)
  }
}

export const deleteSize = async (sizeId: string) => {
  const xata = getXataClient()

  try {
    const size = await xata.db.size.delete(sizeId)
    return onSuccess(size)
  } catch (error: any) {
    console.log("deleteSize()", error.message)
    return onError(error.message)
  }
}

export const updateSize = async (sizeId: string, data: any) => {
  const xata = getXataClient()

  try {
    const size = await xata.db.size.update(sizeId, data)
    return onSuccess(size)
  } catch (error: any) {
    console.log("updateSize()", error.message)
    return onError(error.message)
  }
}

export const getSizes = async () => {
  const xata = getXataClient()

  try {
    const sizes = await xata.db.size
      .select(["*", "category.*"])
      .sort("xata_updatedat", "desc")
      .getMany({ pagination: { size: 200 } })

    return onSuccess(sizes)
  } catch (error: any) {
    console.log("getSizes()", error.message)
    return onError(error.message)
  }
}