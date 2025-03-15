import type { iCategory } from '$lib/interface';
import { getCategory } from '$lib/xata/category';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

  const { categoryId } = params


  const categoryResult = await getCategory(categoryId)

  const category = categoryResult.data as iCategory
  return { category };
}) satisfies PageServerLoad;