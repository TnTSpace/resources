import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Webhook } from "svix"
import { CLERK_WEBHOOK_SECRET } from '$env/static/private';
import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import { emailToTag } from '@toolsntuts/utils'
import { addUser, getUser } from '$lib/xata/user'
import type { iUser } from '$lib/interface';
import { getXataClient, XataClient } from '$lib/xata';

export const GET: RequestHandler = async () => {

  return json({ message: "Hello World" })
};

const database = async (xata: XataClient, result: WebhookEvent) => {
  switch (result.type) {
    case "user.created":
      const data = {
        name: `${result.data.first_name ?? "Guest"} ${result.data.last_name ?? ""}`,
        email: result.data.email_addresses[0]?.email_address,
        image: result.data.image_url,
        userId: result.data.id,
        firstName: result.data.first_name ?? "Guest",
        lastName: result.data.last_name ?? "",
        nameTag: emailToTag(result.data.email_addresses[0]?.email_address),
        role: "guest"
      }
      await xata.db.user.createOrUpdate({...data})
      break;
    case "user.updated":
      const record = await xata.db.user.filter({
        userId: result.data.id
      }).getFirst()
      if (!record) {
        throw new Error("User not found")
      }
      await xata.db.user.update(record.xata_id, {
        image: result.data.image_url
      })
      break;
    default:
      break;
  }
}

export const POST: RequestHandler = async ({ request }) => {

  try {

    const xata = getXataClient()
    const wh = new Webhook(CLERK_WEBHOOK_SECRET)

    const payload = await request.text()
    const headerPayload = request.headers
    const headers = {
      "svix-id": headerPayload.get("svix-id") as string,
      "svix-signature": headerPayload.get("svix-signature") as string,
      "svix-timestamp": headerPayload.get("svix-timestamp") as string
    }

    const result = wh.verify(payload, headers) as WebhookEvent

    await database(xata, result)
    return new Response(null, { status: 200 });
  } catch (error: any) {
    console.log("Webhook Error 🔥🔥", error.message)
    return new Response(error.message, { status: 400 })
  }
};