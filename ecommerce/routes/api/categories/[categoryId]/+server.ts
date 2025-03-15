import { onError, type iResult } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { deleteCategory, getCategory, updateCategory } from '$lib/xata/category';
import type { iCategory } from '$lib/interface';

export const GET: RequestHandler = async ({ params }) => {
  const { categoryId } = params

  const result = await getCategory(categoryId)
  return json(result)
};

export const DELETE: RequestHandler = async ({ params, locals, request }) => {

  const { categoryId } = params

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  const result = await deleteCategory(categoryId)

  return json(result)
};

export const PATCH: RequestHandler = async ({ params, locals, request }) => {

  const { categoryId } = params

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  const partialCategory = await request.json() as Partial<iCategory>

  const result = await updateCategory(categoryId, partialCategory)
  
  return json(result)
};