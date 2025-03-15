import type { iProduct, iWidget, iWidgetItem } from "$lib/interface";
import { getProducts } from "$lib/xata/product";
import { getWidgets } from "$lib/xata/widget";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {

  const result = await getProducts(url)
  const products = result.data as iProduct[]

  const widgetsResult = await getWidgets()
  const items = widgetsResult.data

  const widgets = items.widgets as iWidget[]
  const widgetItems = items.widgetItems as iWidgetItem[]

  console.log({ widgets, widgetItems })
  return { products: products || [], widgets, widgetItems };
};