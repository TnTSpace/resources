import { Constants } from "$lib/constants";
import type { iCart, iModal, iUser, iXataCart } from "$lib/interface";
import type { iResult } from "@toolsntuts/utils";
import { toast } from "svelte-sonner";
import type { Writable } from "svelte/store";

export const getDiscount = (oldPrice: number, price: number) => {
  return Math.round((oldPrice - price) * 100 / oldPrice)
}

export const stripHtmlTags = (input: string) => {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}

export const getTailwindColorClass = (input: string): string => {
  const tailwindColors = [
    "red-500",
    "blue-500",
    "green-500",
    "yellow-500",
    "purple-500",
    "pink-500",
    "orange-500",
    "teal-500",
    "cyan-500",
    "indigo-500",
  ];

  // Simple hash function to generate an index
  const hash = Array.from(input)
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % tailwindColors.length;

  const col = `bg-${tailwindColors[hash]} dark:bg-${tailwindColors[hash]} text-white dark:text-white`;
  return col
};

export const createWhatsAppUrl = (msg: string) => {
  const url = new URL("https://api.whatsapp.com/send/")
  url.searchParams.set('phone', Constants.SELLERNO)
  url.searchParams.set('text', msg)
  return url.href
}

export const addToCart = async (cart: Partial<iXataCart>, me: iUser) => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cart, me })
  }
  const url = '/api/cart'
  const response = await fetch(url, options)
  const result = await response.json() as iResult
  return result
};

export const deleteFromCart = async (cartId: string) => {
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cartId })
  }
  const url = '/api/cart'
  const response = await fetch(url, options)
  const result = await response.json() as iResult
  return result
}

export const updateCart = async (cartId: string, partialCart: Partial<iXataCart>) => {
  const options: RequestInit = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cartId, partialCart })
  }
  const url = '/api/cart'
  const response = await fetch(url, options)
  const result = await response.json() as iResult
  if (result.status === 'error') {
    console.trace(result.message)
  }
  return result
};


export const onCheckout = (cart: iCart[], modalStore: Writable<iModal>) => {
  modalStore.update(value => ({ ...value, open: true, data: cart, type: 'checkoutOrder' }))
}

export function formattedOrderDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  // Ensure the day doesn't have a leading zero (e.g., "Jan 05" -> "Jan 5")
  return formattedDate.replace(/(\w+, \w+) 0?(\d+), (\d{4})/, "$1 $2, $3");
}

export const getAmount = (typeAmount: number | undefined, miscellaneous: number | undefined) => {
  return Number(typeAmount) + Number(miscellaneous)
}
