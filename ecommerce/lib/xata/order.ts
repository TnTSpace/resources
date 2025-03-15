import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iOrder, iOrderItem } from "$lib/interface"

export const getAllOrders = async () => {
  const xata = getXataClient()

  try {
    const orders = await xata.db.order
      .select(["*", "user.*", {
        "name": "<-order_item.order",
        "columns": [
          "name", "price", "image", "quantity", "size", "color",
        ]
      }])
      .sort("xata_createdat", "desc")
      .getMany()

    return onSuccess(orders)
  } catch (error: any) {
    console.log("getOrders()", error.message)
    return onError(error.message)
  }
}

export const getOrders = async (user: string) => {
  const xata = getXataClient()

  try {
    const orders = await xata.db.order
      .select(["*", "user.*", {
        "name": "<-order_item.order",
        "columns": [
          "name", "price", "image", "quantity", "size", "color",
        ]
      }])
      .filter({ user })
      .sort("xata_createdat", "desc")
      .getMany()
    console.log({ user, orders })

    return onSuccess(orders)
  } catch (error: any) {
    console.log("getOrders()", error.message)
    return onError(error.message)
  }
}

export const getOrderByReference = async (reference: string) => {
  const xata = getXataClient()

  try {
    const order = await xata.db.order
      .select(["*", "user.*", {
        "name": "<-order_item.order",
        "columns": [
          "name", "price", "image", "quantity", "size", "color",
        ]
      }])
      .filter({
        reference
      })
      .getFirst()

    return onSuccess(order)
  } catch (error: any) {
    console.log("getOrder()", error.message)
    return onError(error.message)
  }
}

export const getOrder = async (orderId: string) => {
  const xata = getXataClient()

  try {
    const order = await xata.db.order
      .select(["*", "user.*", {
        "name": "<-order_item.order",
        "columns": [
          "name", "price", "image", "quantity", "size", "color",
        ]
      }])
      .filter({
        xata_id: orderId
      })
      .getFirst()

    return onSuccess(order)
  } catch (error: any) {
    console.log("getOrder()", error.message)
    return onError(error.message)
  }
}

export const addOrder = async (partialOrder: Partial<iOrder>, orderItems: Partial<iOrderItem>[]) => {
  const xata = getXataClient()

  try {
    const order = await xata.db.order.create(partialOrder)

    const transactions = orderItems.map(orderItem => {
      orderItem.order = order.xata_id
      orderItem.reference = order.reference as string
      return {
        insert: {
          table: 'order_item',
          record: orderItem
        }
      }
    })

    const result = await xata.transactions.run(transactions as any)
    console.log("successful addition of order")
    return onSuccess(result)
  } catch (error: any) {
    console.log("addOrder()", error.message)
    return onError(error.message)
  }
}