import type { iShipping, iUser, iXataCart } from '$lib/interface';
import { getCart } from '$lib/xata/cart';
import { getMe } from '$lib/xata/user';
import type { iResult } from '@toolsntuts/utils';
import type { LayoutServerLoad } from './$types';
import { getShippings } from '$lib/xata/shipping';

export const load = (async ({ locals, url }) => {

  const user = locals.user

  let me = null
  let cart: iXataCart[] = []

  if (user) {
    me = await getMe(user.emailAddresses[0].emailAddress) as iUser
    const cartResult = await getCart(me!.xata_id) as iResult
  
    cart = cartResult.data as iXataCart[]
  }

  const shippingsResult = await getShippings()
  const shippings = shippingsResult.data as iShipping[]
  
  return { me, cart, shippings: shippings ?? [] };
}) satisfies LayoutServerLoad;