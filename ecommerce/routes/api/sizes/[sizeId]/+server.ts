import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iSize } from '$lib/interface';
import { deleteSize, getSize, updateSize } from '$lib/xata/size';

export const GET: RequestHandler = async ({ params }) => {
  const { sizeId } = params

  const result = await getSize(sizeId)
  return json(result)
};

export const DELETE: RequestHandler = async ({ params, locals }) => {

  const { sizeId } = params

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  const result = await deleteSize(sizeId)

  return json(result)
};

export const PATCH: RequestHandler = async ({ params, locals, request }) => {

  const { sizeId } = params

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  const partialSize = await request.json() as Partial<iSize>

  const result = await updateSize(sizeId, partialSize)
  
  return json(result)
};