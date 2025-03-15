import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iUser, iWidget } from '$lib/interface';
import { Role } from '$lib/constants';
import { addWidget, deleteWidget } from '$lib/xata/widget';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ request, locals }) => {

  const user = locals.user
  
  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const { me, partialWidget } = await request.json() as { me: iUser, partialWidget: Partial<iWidget> }

  if (me.role !== Role.ADMIN) {
    return json(onError("Unauthorized"))
  }

  const result = await addWidget(partialWidget)
  return json(result)
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
  
  const user = locals.user
  
  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const { id, me } = await request.json() as { id: string, me: iUser }

  if (me.role !== Role.ADMIN) {
    return json(onError("Unauthorized"))
  }

  const result = await deleteWidget(id)
  return json(result)

};