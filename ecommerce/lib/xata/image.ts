import type { iImage } from "$lib/interface";
import { onError, onSuccess } from "@toolsntuts/utils";
import { getXataClient } from ".";

export const addImage = async (partialImage: Partial<iImage>) => {
  const xata = getXataClient()

  try {
    const image = await xata.db.image.create(partialImage)
    return onSuccess(image)
  } catch (error: any) {
    console.log("addImage()", error.message)
    return onError(error.message)
  }
}

export const getImage = async (imageId: string) => {
  const xata = getXataClient()

  try {
    const image = await xata.db.image.read(imageId)
    return onSuccess(image)
  } catch (error: any) {
    console.log("addImage()", error.message)
    return onError(error.message)
  }
}

export const updateImage = async (imageId: string, data: any) => {
  const xata = getXataClient()
  try {
    const image = await xata.db.image.update(imageId, data)
    return onSuccess(image)
  } catch (error: any) {
    console.log("updateImage()", error.message)
    return onError(error.message)
  } 
}

export const deleteImage = async (imageId: string) => {
  const xata = getXataClient()

  try {
    const image = await xata.db.image.delete(imageId)
    return onSuccess(image)
  } catch (error: any) {
    console.log("deleteImage()", error.message)
    return onError(error.message)
  }
}