import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iCategory } from '$lib/interface';
import { addCategory, getCategories } from '$lib/xata/category';

export const GET: RequestHandler = async ({ params }) => {

  const result = await getCategories()
  return json(result)
};

export const POST: RequestHandler = async ({ params, locals, request }) => {

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  const partialCategory = await request.json() as Partial<iCategory>

  const result = await addCategory(partialCategory)
  return json(result)
};