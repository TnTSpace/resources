import type { iCategory, iSize, iUser, iProduct, iShipping } from '$lib/interface';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getMe } from '$lib/xata/user'
import { getCategories } from '$lib/xata/category';
import { Role } from '$lib/constants';
import { getSizes } from '$lib/xata/size';
import { getProducts } from '$lib/xata/product'
import { getShippings } from '$lib/xata/shipping'

export const load = (async ({ locals, url }) => {

  const userId = locals.auth.userId
  const user = locals.user
  const pathname = url.pathname
  if (!userId) {
    throw redirect(302, `/sign-in?redirect=${pathname}`)
  }

  const me = await getMe(user.emailAddresses[0].emailAddress) as iUser


  if (me.role !== Role.ADMIN) {
    throw redirect(302, '/')
  }

  const shippingResult: { data?: iShipping[] } = await getShippings()
  const shippings = shippingResult.data ?? []

  const categoryResult = await getCategories()
  const categories = categoryResult.data ?? []

  const sizeResult = await getSizes()
  const sizes = sizeResult.data as iSize[]

  const productsResult: { data?: iProduct[] } = await getProducts(url)
  const products = productsResult.data ?? []
  
  return { me, categories, shippings, sizes, products };
}) satisfies LayoutServerLoad;