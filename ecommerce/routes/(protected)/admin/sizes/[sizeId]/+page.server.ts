import type { iSize } from '$lib/interface';
import { getSize } from '$lib/xata/size';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

  const { sizeId } = params

  const result = await getSize(sizeId)

  const size = result.data as iSize
  return { size };
}) satisfies PageServerLoad;