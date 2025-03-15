<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';
	import { Button } from '../ui/button';
	import type { iUser } from '$lib/interface';
	import { Role } from '$lib/constants';

	interface Props {
		class?: string;
	}

	const me = getContext('me') as iUser;

	let { class: className }: Props = $props();

	const pathname = page.url.pathname;
	const isActiveRoute = (path: string) => pathname === path;
</script>

<div class={cn('flex', className)}>
	<Button class="rounded-full" href="/" variant={isActiveRoute('/') ? 'default' : 'outline'}
		>Home</Button
	>
	<Button
		class="rounded-full"
		href="/catalog"
		variant={isActiveRoute('/catalog') ? 'default' : 'outline'}
		>Catalog
	</Button>
	<Button
		class="rounded-full"
		href="/orders"
		variant={isActiveRoute('/orders') ? 'default' : 'outline'}
	>
		Orders
	</Button>
	{#if me && me.role === Role.ADMIN}
		<Button
			class="rounded-full"
			href="/admin"
			variant={isActiveRoute('/admin') ? 'default' : 'outline'}
		>
			Admin
		</Button>
	{/if}
</div>
