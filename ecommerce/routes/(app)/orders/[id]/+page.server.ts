import type { iOrder } from '$lib/interface';
import { getOrder } from '$lib/xata/order';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

  const { id } = params

  const result = await getOrder(id)

  const order = await result.data as iOrder

  return { order }
}) satisfies PageServerLoad;