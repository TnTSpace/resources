import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iCategory } from "$lib/interface"

export const getCategory = async (categoryId: string) => {
  const xata = getXataClient()
  try {
    const category = await xata.db.category
    .filter({ xata_id: categoryId })
    .select(["*", "banner.*", "thumbnail.*"])
    .getFirst()
    
    return onSuccess(category)
  } catch (error: any) {
    console.log("getCategory()", error.message)
    return onError(error.message)
  }
}

export const addCategory = async (partialCategory: Partial<iCategory>) => {
  const xata = getXataClient()
  try {
    const category = await xata.db.category.create({
      ...partialCategory
    })
    return onSuccess(category)
  } catch (error: any) {
    console.log("addCategory()", error.message)
    return onError(error.message)
  }
}

export const deleteCategory = async (categoryId: string) => {
  const xata = getXataClient()

  try {
    const category = await xata.db.category.delete(categoryId)
    return onSuccess(category)
  } catch (error: any) {
    console.log("deleteCategory()", error.message)
    return onError(error.message)
  }
}

export const updateCategory = async (categoryId: string, data: any) => {
  const xata = getXataClient()

  try {
    const category = await xata.db.category.update(categoryId, data)
    return onSuccess(category)
  } catch (error: any) {
    console.log("updateCategory()", error.message)
    return onError(error.message)
  } 
}

export const getCategories = async () => {
  const xata = getXataClient()

  try {
    const categories = await xata.db.category
    .select(["*", "banner.*", "thumbnail.*"])
    .sort("xata_updatedat", "desc")
    .getMany({ pagination: { size: 200 } })

    return onSuccess(categories)
  } catch (error: any) {
    console.log("getCategories()", error.message)
    return onError(error.message)
  }
}