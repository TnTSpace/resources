<script lang="ts">
	import { Button } from '../ui/button';

	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import type { iCategory } from '$lib/interface';

	interface Props {
		data: iCategory[]
	}

	let { data }: Props = $props()
	
	const pathname = page.url.pathname

	const routes = data.map(route => ({
		href: `/category/${route.xata_id}`,
		label: route.name,
		active: pathname === `/category/${route.xata_id}`
	}))
</script>

<nav class="mx-6 flex items-center space-x-4 lg:space-x-6">
	{#each routes as route, i}
		<Button href={route.href} class={cn("text-sm font-medium transition-colors", route.active ? 'text-primary dark:text-white' : 'text-muted-foreground')}>
			{route.label}
		</Button>
	{/each}
</nav>
