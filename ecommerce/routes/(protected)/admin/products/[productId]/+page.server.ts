import type { iProduct } from '$lib/interface'; 
import { getProduct } from '$lib/xata/product'; 
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

  const { productId } = params

  const productResult = await getProduct(productId)
  const product = productResult.data as iProduct

  return { product };
}) satisfies PageServerLoad;