import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iShipping } from '$lib/interface';
import { addShipping, getShippings } from '$lib/xata/shipping';

export const GET: RequestHandler = async ({ params }) => {

  const result = await getShippings()
  return json(result)
};

export const POST: RequestHandler = async ({ params, locals, request }) => {

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  const partialShipping = await request.json() as Partial<iShipping>

  const result = await addShipping(partialShipping)
  return json(result)
};