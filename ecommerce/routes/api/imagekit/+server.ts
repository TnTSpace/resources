import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { onError } from '@toolsntuts/utils';
import { deleteFile } from '$lib/api-utils/imagekit';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const DELETE: RequestHandler = async ({ locals, request }) => {

  const user = locals.user

  if (!user) {
    return json(onError("Unauthorized"))
  }

  const formData = await request.formData()
  const fileId = formData.get("fileId") as string

  const result = await deleteFile(fileId)
  return json(result)
};