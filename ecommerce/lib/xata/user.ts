import { getXataClient } from "."

export const getMe = async (email: string) => {
  const xata = getXataClient()

  try {
    const user = await xata.db.user
      .select(["*", {
        "name": "<-cart.user",
        "columns": [
          "product", "product.*", "quantityOrdered", "sizeOrdered", "colorOrdered"
        ]
      }])
      .filter({
        email
      }).getFirst()

    if (!user) {
      return null
    }
    return user
  } catch (error: any) {
    console.log("Internal Error", error.messge)
    return null
  }
}

export const getUser = async (userId: string) => {
  const xata = getXataClient()

  try {
    const user = await xata.db.user
      .select(["*", {
        "name": "<-cart.user",
        "columns": [
          "product", "product.*", "quantityOrdered", "sizeOrdered", "colorOrdered"
        ]
      }])
      .filter({
        userId
      }).getFirst()

    if (!user) {
      return null
    }
    return user
  } catch (error: any) {
    console.log("Internal Error", error.messge)
    return null
  }
}

export const addUser = async (data: any) => {
  const xata = getXataClient()

  try {
    const user = await xata.db.user.create(data)
    return user
  } catch (error: any) {
    console.log("Internal Error", error.messge)
    return null
  }
}