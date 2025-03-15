import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iWidget, iWidgetItem } from "$lib/interface";

export const getWidgets = async () => {
  const xata = getXataClient()
  try {
    const widgetItems = await xata.db.widget_item
      .select(["*", "widget", "widget.*", "banner.*", "product.*"])
      .getMany();

    const widgets = await xata.db.widget.getMany()
    return onSuccess({ widgetItems, widgets })
  } catch (error: any) {
    console.log("getWidgets()", error.message)
    return onError(error.message)
  }
}

export const addWidget = async (partialWidget: Partial<iWidget>) => {
  const xata = getXataClient()
  try {
    const widget = await xata.db.widget.create({
      ...partialWidget
    })
    return onSuccess(widget)
  } catch (error: any) {
    console.log("addWidget()", error.message)
    return onError(error.message)
  }
}

export const addWidgetItem = async (partialWidgetItem: Partial<iWidgetItem>) => {
  const xata = getXataClient()
  try {
    const widgetItem = await xata.db.widget_item.create({
      ...partialWidgetItem
    })
    return onSuccess(widgetItem)
  } catch (error: any) {
    console.log("addWidgetItem()", error.message)
    return onError(error.message)
  }
}

export const deleteWidget = async (widgetId: string) => {
  const xata = getXataClient()

  try {
    const widget = await xata.db.widget.delete(widgetId)
    return onSuccess(widget)
  } catch (error: any) {
    console.log("deleteWidget()", error.message)
    return onError(error.message)
  }
}
export const deleteWidgetItem = async (widgetItemId: string) => {
  const xata = getXataClient()

  try {
    const widgetItem = await xata.db.widget_item.delete(widgetItemId)
    return onSuccess(widgetItem)
  } catch (error: any) {
    console.log("deleteWidgetItem()", error.message)
    return onError(error.message)
  }
}