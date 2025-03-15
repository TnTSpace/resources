import { buildClerkProps } from 'svelte-clerk/server';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {

  const userId = locals.auth.userId
  const user = locals.user
  
  return {
    ...buildClerkProps(locals.auth),
    userId,
    user,
  };
}) satisfies LayoutServerLoad;

