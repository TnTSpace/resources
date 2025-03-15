import { PAYSTACK_API_KEY } from "$env/static/private"
import type { iPaystackParams } from "$lib/interface"
import Paystack from "paystack"


const paystack = Paystack(PAYSTACK_API_KEY as string)

export const initializeTransaction = async (params: iPaystackParams) => {
  return await paystack.transaction.initialize(params)
}