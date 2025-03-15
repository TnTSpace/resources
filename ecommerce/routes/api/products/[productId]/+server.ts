import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iProduct } from '$lib/interface';
import { deleteProduct, getProduct, updateProduct } from '$lib/xata/product';

export const GET: RequestHandler = async ({ params }) => {
  const { productId } = params

  if (!productId) {
    return json(onError("Product ID is required"))
  }

  const result = await getProduct(productId)
  return json(result)
};

export const DELETE: RequestHandler = async ({ params, locals }) => {

  const { productId } = params

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  if (!productId) {
    return json(onError("Product ID is required"))
  }


  const result = await deleteProduct(productId)

  return json(result)
};

export const PATCH: RequestHandler = async ({ params, locals, request }) => {

  const { productId } = params

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }
  
  if (!productId) {
    return json(onError("Product ID is required"))
  }

  const partialProduct = await request.json() as Partial<iProduct>

  const result = await updateProduct(productId, partialProduct)
  
  return json(result)
};