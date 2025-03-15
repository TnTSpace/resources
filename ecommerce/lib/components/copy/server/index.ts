
import { v2 as cloudinary, type UploadApiOptions } from 'cloudinary';
import { PUBLIC_CLOUDINARY_API_KEY, PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public';
import { CLOUDINARY_API_SECRET } from '$env/static/private';
import type { iMedia, iUploadResource } from '../interface/index.js';

export const deleteFileFromCloudinary = async (media: iMedia) => {
  const { public_id, type, resource_type } = media
  cloudinary.config({
    cloud_name: PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: PUBLIC_CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  })
  const response = await cloudinary.api.delete_resources([public_id as string], { type, resource_type })
  return response
}

export const uploadToCloudinary = async (resource: iUploadResource) => { 
  const { file, folder } = resource
  cloudinary.config({
    cloud_name: PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: PUBLIC_CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  })

  const arrayBuffer = await (file as File).arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer)

  const options: UploadApiOptions = {
    folder,
		maxFileSize: 31457280,
  }

  return await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error)
        return
      }
      resolve(result)
    })
    // @ts-ignore
    .end(buffer)
  })
}

export const uploadUrlToCloudinary = async (resource: iUploadResource) => {
  const { url, folder } = resource
  cloudinary.config({
    cloud_name: PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: PUBLIC_CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  })
  const options: UploadApiOptions = {
    folder,
		maxFileSize: 31457280,
  }
  const res = await cloudinary.uploader.upload(url as string, options)
  return res
}