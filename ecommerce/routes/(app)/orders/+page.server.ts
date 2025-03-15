import type { iOrder, iUser } from '$lib/interface';
import { getOrders } from '$lib/xata/order';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {

  const data = await parent()
  const me = data.me as iUser

  if (me) {

    const result = await getOrders(me.xata_id)

    const orders = await result.data as iOrder[]

    return { orders }
  } else {
    return { orders: [] }
  }
}) satisfies PageServerLoad;