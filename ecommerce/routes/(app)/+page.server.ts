import type { iProduct } from '$lib/interface';
import { getProducts } from '$lib/xata/product';
import { getRecentlyViewed } from '$lib/xata/recently-viewed'
import type { PageServerLoad } from './$types';

export const load = (async ({ parent, url }) => {

  const { me } = await parent()

  const fetchProducts = async (url?: URL) => {
    url?.searchParams.set('isFeatured', 'true')
    const result = await getProducts(url as URL)
    const products = result.data as iProduct[]
    return products
  }

  const fetchRecentlyViewed = async (url?: URL) => {
    if (me) {
      const result = await getRecentlyViewed(me)
      const recentlyViewed = result.data as iProduct[]
      return recentlyViewed
    }
    return []
  }
  return {
    getProducts: fetchProducts(url),
    getRecentlyViewed: fetchRecentlyViewed(url),
    me
  };
}) satisfies PageServerLoad;