import type { PageServerLoad } from './$types';
import { getAllOrders } from '$lib/xata/order';

export const load = (async () => {
  const result = await getAllOrders()
  const orders = result.data as any[]
  return { orders: orders || [] };
}) satisfies PageServerLoad;