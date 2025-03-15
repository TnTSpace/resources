import type { iOrder } from '$lib/interface';
import { clearCart } from '$lib/xata/cart';
import { getOrder } from '$lib/xata/order';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, parent }) => {
  const reference = url.searchParams.get('reference') as string

  const { cart } = await parent()

  if (reference) {

    const result = await getOrder(reference)

    const order = await result.data as iOrder

    await clearCart(cart)

    return { order }
  } else {
    return {}
  }
}) satisfies PageServerLoad;