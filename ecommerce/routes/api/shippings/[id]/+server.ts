import { onError, type iResult } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { deleteShipping, getShipping, updateShipping } from '$lib/xata/shipping';
import type { iShipping } from '$lib/interface';

export const GET: RequestHandler = async ({ params }) => {
  const { id } = params

  const result = await getShipping(id)
  return json(result)
};

export const DELETE: RequestHandler = async ({ params, locals }) => {

  const { id } = params

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  const result = await deleteShipping(id)

  return json(result)
};

export const PATCH: RequestHandler = async ({ params, locals, request }) => {

  const { id } = params

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  const partialShipping = await request.json() as Partial<iShipping>

  const result = await updateShipping(id, partialShipping)
  
  return json(result)
};