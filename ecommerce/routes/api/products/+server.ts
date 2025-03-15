import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iImage, iProduct } from '$lib/interface';
import { addProduct, getProducts } from '$lib/xata/product';
import { updateImage } from '$lib/xata/image';

export const GET: RequestHandler = async ({ params, url }) => {
  const result = await getProducts(url)
  return json(result)
};

export const POST: RequestHandler = async ({ locals, request }) => {

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  const partialProduct = await request.json() as Partial<iProduct>

  const result = await addProduct(partialProduct)

  if (result.status === 'error') {
    return json(result)
  }

  const product = result.data as iProduct

  const promise = async (imageId: string | iImage) => {
    const result = await updateImage(imageId as string, { product: product.xata_id })
    return result
  }

  const promises = product.images.map(promise)

  const results = await Promise.all(promises)

  return json(result)
};