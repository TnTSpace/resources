import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteFile, uploadFile } from '$lib/api-utils/imagekit';
import type { iImage } from '$lib/interface';
import type { UploadResponse } from 'imagekit/dist/libs/interfaces';
import { addImage, deleteImage } from '$lib/xata/image';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ request }) => {

  const formData = await request.formData()

  const entries = Object.fromEntries(formData.entries())

  const file = entries.file as File
  const categoryId = entries.id as string

  const result = await uploadFile(file)

  if (result.status === 'error') {
    return json(result)
  }
  
  const response = result.data as UploadResponse

  const partialImage: Partial<iImage> = {
    fileId: response.fileId,
    url: response.url,
    category: categoryId || null
  }

  const imageResult = await addImage(partialImage)

  const image = imageResult.data as iImage

  return json({ url: response.url, fileId: partialImage.fileId, xata_id: image.xata_id })
};

export const DELETE: RequestHandler = async ({ request, url }) => {

  const formData = await request.formData()
  const xata_id = formData.get("xata_id") as string
  const fileId = formData.get("fileId") as string 

  const result = await deleteFile(fileId)

  if (result.status === 'error') {
    return json(result)
  }

  const imageResult = await deleteImage(xata_id)

  return json(imageResult)
};