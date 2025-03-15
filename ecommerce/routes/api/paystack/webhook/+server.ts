import type { RequestHandler } from './$types';
import { GOOGLE_APPSCRIPT_API, PAYSTACK_API_KEY } from '$env/static/private';
import type { Response } from 'paystack'
import type { iOrder, iPaystackWebhookData, iPaystackWebhookResponse } from '$lib/interface';
import { addOrder } from '$lib/xata/order';


// Create the HMAC hash using the Web Crypto API
async function createHmacSha512(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const messageData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: { name: 'SHA-512' } },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);

  // Convert the signature to a hex string
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export const POST: RequestHandler = async ({ request }) => {
  const obj = await request.json();
  // Generate the hash
  const hash = await createHmacSha512(PAYSTACK_API_KEY, JSON.stringify(obj));

  if (hash === request.headers.get('x-paystack-signature')) {
    const response = obj as iPaystackWebhookResponse

    switch (response.event) {
      case 'charge.success':
        const data = JSON.parse(JSON.stringify(response.data)) as iPaystackWebhookData
        const amount = Number(data.amount) / 100
        const reference = data.reference
        const name = data.metadata.details.name
        const email = data.metadata.details.email
        const address = data.metadata.details.address
        const phone = data.metadata.details.phone
        const products = data.metadata.details.products
        const user = data.metadata.details.user
        const shippingType = data.metadata.details.shippingType
        const shippingAmount = data.metadata.details.shippingAmount
        const shippingLocation = data.metadata.details.shippingLocation

        const orderItems = data.metadata.orderItems
        const order: Partial<iOrder> = {
          amount, phone, address, reference, name, email, products, isPaid: true, user, shippingType, shippingAmount, shippingLocation
        }

        console.log({ shippingAmount })

        await addOrder(order, orderItems)

        const options: RequestInit = {
          method: 'post',
          body: JSON.stringify({ order, orderItems }),
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const emailResponse = await fetch(GOOGLE_APPSCRIPT_API, options)

        const emailData = await emailResponse.text()
        console.log("sent email response", emailResponse)
        if (emailResponse.ok) {
          console.log("Google Email Successfully Sent", emailData)
        } else {
          console.log({ emailData })
          console.log("Google Email Unsuccessful", emailData)
        }
        break;

      default:
        break;
    }
  } else {
    console.log({ from: "not from paystack" });
  }

  return new Response();
};
