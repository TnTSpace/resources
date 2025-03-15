// hooks.server.ts
import { clerkClient, withClerkHandler } from 'svelte-clerk/server';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

export const clerk = withClerkHandler();

export const getUser: Handle = async ({ event, resolve }) => {
  const { locals } = event
  const { userId } = locals.auth

  if (userId) {
    const userTxt = await clerkClient.users.getUser(userId as string)
    const user = JSON.parse(JSON.stringify(userTxt))
    event.locals.user = user
  }

  return resolve(event)
}

export const handle: Handle = sequence(clerk, getUser)