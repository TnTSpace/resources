import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iSize } from '$lib/interface';
import { addSize, getSizes } from '$lib/xata/size';

export const GET: RequestHandler = async () => {

  const result = await getSizes()
  return json(result)
};

export const POST: RequestHandler = async ({ params, locals, request }) => {

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  const partialSize = await request.json() as Partial<iSize>

  const result = await addSize(partialSize)
  return json(result)
};