<script lang="ts">
	import { Clock, Home, LayoutGrid } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import Drawer from '$lib/components/widgets/Drawer.svelte';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import SpinLoader from '$lib/components/widgets/SpinLoader.svelte';
	import type { iRoute } from '$lib/interface';
	import { onMount } from 'svelte';

	const pathname = page.url.pathname;

	const isActiveRoute = (path: string) =>
		path === '/' ? pathname === path : pathname.includes(path);

	let clicked = $state('');

	let routes: iRoute[] = [
		{
			href: '/',
			name: 'Home',
			icon: Home
		},
		{
			href: '/catalog',
			name: 'Catalog',
			icon: LayoutGrid
		},
		{
			href: '/orders',
			name: 'Orders',
			icon: Clock
		}
	];

	const navigating = (name: string) => (clicked = name);

	onMount(() => clicked = '')
</script>

<nav
	class="fixed bottom-0 left-0 right-0 grid w-full grid-cols-4 border-t bg-white dark:bg-secondary lg:hidden"
>
	{#each routes as { href, name, icon: Icon }, i}
		<Button
			{href}
			onclick={() => navigating(name)}
			variant={isActiveRoute(href) ? 'outline' : 'ghost'}
			class={cn(
				'flex h-auto flex-col items-center gap-1 text-muted-foreground',
				isActiveRoute(href) && 'text-primary dark:text-white'
			)}
		>
			{#if clicked === name}
				<SpinLoader class="!size-5 border-primary dark:border-white" />
			{:else}
				<Icon class="!size-5" />
			{/if}
			<span class="text-xs">{name}</span>
		</Button>
	{/each}
	<Drawer />
</nav>
