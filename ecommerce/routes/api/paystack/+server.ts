import type { iPaystackParams } from '$lib/interface';
import { initializeTransaction } from '$lib/paystack';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { onError, onSuccess } from '@toolsntuts/utils';

export const POST: RequestHandler = async ({ locals, request }) => {

  const params = await request.json() as iPaystackParams

  try {
    console.log({ params, from: "before initialize transaction" })
    const res = await initializeTransaction(params)
    console.log({ res, from: "after initialize transaction" })
    const result = onSuccess(res)
    return json(result)
  } catch (error: any) {
    console.trace(error.message);
    const result = onError(error.message)
    return json(result)
  }
}; 