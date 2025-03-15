import type { iCategory, iColor, iProduct, iShipping, iSize } from "$lib/interface";
import type { iResult } from "@toolsntuts/utils";
import { toast } from "svelte-sonner";

export const deleteCategoryApi = async (category: iCategory) => {
  if (category) {
    try {
      const url = `/api/categories/${category.xata_id}`;

      const options: RequestInit = {
        method: 'DELETE',
      };

      const response = await fetch(url, options);
      const { status, message } = (await response.json()) as iResult;

      if (status === 'error') {
        toast.error(message);
      } else {
        location.href = `/admin/categories`;
        toast.success('Category deleted');
      }
    } catch (error: any) {
      console.log("deleteCategoryApi()")
      toast.error('Make sure you remove products using this category');
    }
  }
};

export const deleteSizeApi = async (size: iSize) => {
  if (size) {
    try {
      const url = `/api/sizes/${size.xata_id}`;

      const options: RequestInit = {
        method: 'DELETE',
      };

      const response = await fetch(url, options);
      const { status, message } = (await response.json()) as iResult;

      if (status === 'error') {
        toast.error(message);
      } else {
        location.href = `/admin/sizes`;
        toast.success('Size deleted');
      }
    } catch (error: any) {
      console.log("deleteSizeApi()")
      toast.error('Make sure you remove products using this size');
    }
  }
};

export const deleteColorApi = async (color: iColor) => {
  if (color) {
    try {
      const url = `/api/colors/${color.xata_id}`;

      const options: RequestInit = {
        method: 'DELETE',
      };

      const response = await fetch(url, options);
      const { status, message } = (await response.json()) as iResult;

      if (status === 'error') {
        toast.error(message);
      } else {
        location.href = `/admin/colors`;
        toast.success('Color deleted');
      }
    } catch (error: any) {
      console.log("deleteColorApi()")
      toast.error('Make sure you remove products using this color');
    }
  }
};

export const deleteProductApi = async (product: iProduct) => {
  if (product) {
    try {
      const url = `/api/products/${product.xata_id}`;

      const options: RequestInit = {
        method: 'DELETE',
      };

      const response = await fetch(url, options);
      const { status, message } = (await response.json()) as iResult;

      if (status === 'error') {
        toast.error(message);
      } else {
        location.href = `/admin/products`;
        toast.success('Color deleted');
      }
    } catch (error: any) {
      console.log("deleteColorApi()")
      toast.error('Make sure you remove products using this color');
    }
  }
};

export const deleteShippingApi = async (shipping: iShipping) => {
  if (shipping) {
    try {
      const url = `/api/shippings/${shipping.xata_id}`;

      const options: RequestInit = {
        method: 'DELETE',
      };

      const response = await fetch(url, options);
      const { status, message } = (await response.json()) as iResult;

      if (status === 'error') {
        toast.error(message);
      } else {
        location.href = `/admin/shippings`;
        toast.success('Shipping deleted');
      }
    } catch (error: any) {
      console.log("deleteShippingApi()")
      toast.error('Make sure you remove products using this shipping');
    }
  }
};