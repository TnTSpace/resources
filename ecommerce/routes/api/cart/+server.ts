import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iProduct, iUser, iXataCart } from '$lib/interface';
import { addCart, deleteCart, updateCart } from '$lib/xata/cart';

export const POST: RequestHandler = async ({ locals, request }) => {

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  const { cart, me } = await request.json() as { cart: Partial<iXataCart>, me: iUser }

  const cartItem = { 
    product: (cart.product as iProduct).xata_id,
    quantityOrdered: cart.quantityOrdered,
    sizeOrdered: cart.sizeOrdered,
    colorOrdered: cart.colorOrdered,
    user: me.xata_id
  }
  const result = await addCart(cartItem)

  return json(result)

};

export const PATCH: RequestHandler = async ({ locals, request }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  const { cartId, partialCart } = await request.json()
  const result = await updateCart(cartId, partialCart)

  return json(result)
};

export const DELETE: RequestHandler = async ({ locals, request }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }
  const { cartId } = await request.json() as { cartId: string }

  const result = await deleteCart(cartId)
  return json(result)
};