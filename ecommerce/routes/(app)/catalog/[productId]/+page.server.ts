import type { iCategory, iProduct, iRecentlyViewed } from '$lib/interface';
import { getProduct, getProducts } from '$lib/xata/product';
import { addRecentlyViewed } from '$lib/xata/recently-viewed';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, url, parent }) => {

  const { productId } = params

  const { me } = await parent()

  const productResult = await getProduct(productId)

  if (me && productResult.status === 'success') {
    const partialRecentlyViewed: Partial<iRecentlyViewed> = {
      user: me.xata_id,
      product: productId
    }
    await addRecentlyViewed(partialRecentlyViewed)
  }

  const product = productResult.data as iProduct

  const category = (product.category as iCategory)

  const queryUrl = url

  queryUrl.searchParams.set('category', category.name)

  const fetchRelatedProducts = async (url?: URL) => {
    const result = await getProducts(url as URL)
    const products = result.data as iProduct[]
    return products
  }

  return { product, relatedProducts: fetchRelatedProducts(queryUrl), relatedHref: `/catalog/?category=${category.name}` };
}) satisfies PageServerLoad;