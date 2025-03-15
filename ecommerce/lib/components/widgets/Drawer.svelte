<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import { cn } from '$lib/utils';
	import FilterSidebar from '../frontend/FilterSidebar.svelte';
	import { buttonVariants } from '../ui/button';
	import { MenuIcon } from 'lucide-svelte';
	import { drawerStore } from '$lib/stores';
	import Navigation from '../frontend/Navigation.svelte';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();

	const data = $drawerStore.data;
</script>

<Drawer.Root>
	<Drawer.Trigger
		class={cn(
			buttonVariants({ variant: 'ghost' }),
			'flex h-auto flex-col items-center gap-1 text-muted-foreground',
			className
		)}
	>
		<MenuIcon class="!size-5" />
		<span class="text-xs">Menu</span>
	</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>{$drawerStore.title}</Drawer.Title>
			<Drawer.Description>{$drawerStore.description}</Drawer.Description>
		</Drawer.Header>
		<div class="max-h-56 overflow-y-auto">
			{#if $drawerStore.type === 'navigation'}
				<Navigation class="grid grid-cols-2 gap-4 px-4" />
			{/if}
			{#if $drawerStore.type === 'filter'}
				{@const { sizes, categories, colors } = data}
				<FilterSidebar {sizes} {categories} {colors} />
			{/if}
		</div>
		<Drawer.Footer>
			<Drawer.Close class={buttonVariants({ variant: "outline" })}>Cancel</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
