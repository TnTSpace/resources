import type { iProduct, iSummary } from '$lib/interface';
import { filterProducts, getFilters, getProducts } from '$lib/xata/product';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {

  const productsResult = await getProducts(url)

  const search = url.searchParams.get('search')

  let products = productsResult.data as iProduct[]

  let sizes: string[] = []
  let categories: string[] = []
  let colors: string[] = []

  const filtersResult = await getFilters()
  const filters = filtersResult.data as iSummary[]
  const len = filters.length
  for (let i = 0; i < len; i++) {
    const filter = filters[i]
    categories.push(filter.category.name)
    sizes = [...sizes, ...filter.sizes]
    colors = [...colors, ...filter.colors]
  }
  categories = [...new Set(categories)]
  sizes = [...new Set(sizes)]
  colors = [...new Set(colors)]

  if (search) {
    products = filterProducts(products, search)
  }

  return { products, sizes, colors, categories };
}) satisfies PageServerLoad;