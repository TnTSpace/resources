import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {

  const { userId } = locals.auth
  if (!userId) {
    redirect(302, `/sign-in/?redirect=/admin/`)
  }
  return {};
}) satisfies PageServerLoad;