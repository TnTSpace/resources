import type { iShipping } from '$lib/interface';
import { getShipping } from '$lib/xata/shipping';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

  const { id } = params


  const shippingResult = await getShipping(id)

  const shipping = shippingResult.data as iShipping
  return { shipping };
}) satisfies PageServerLoad;