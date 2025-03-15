import type { iProduct } from "$lib/interface";
import { getProducts } from "$lib/xata/product";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  
  const productsResult: { data?: iProduct[] } = await getProducts(url)
  const products = productsResult.data ?? []
  return { products };
};