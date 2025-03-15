<script lang="ts">
	import type { iProduct } from '$lib/interface';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import ProductCard from '$lib/components/frontend/cards/ProductCard.svelte';
	import ProductCardSkeleton from '$lib/components/frontend/cards/ProductCardSkeleton.svelte';
	import { Card } from '$lib/components/ui/card';
	import { page } from '$app/state';
	import AlertWidget from '$lib/components/widgets/AlertWidget.svelte';

	interface Props {
		title: string;
		getProducts: Promise<iProduct[]>;
		viewAll: string;
		exclude?: string;
		class?: string;
	}

	let { title, getProducts, viewAll, class: className, exclude = '' }: Props = $props();
</script>

<Card class={cn('flex flex-col gap-2', className)}>
	<div
		class="flex items-center justify-between bg-white px-4 py-2 dark:bg-secondary md:rounded-t-md"
	>
		<h2 class="text-lg font-semibold">{title}</h2>
		<Button href={viewAll} variant="outline" class="rounded-full">View All →</Button>
	</div>
	<ScrollArea orientation="horizontal" class="pb-4">
		<div
			class="grid auto-cols-[280px] grid-flow-col gap-4 overflow-x-auto px-4 xs:auto-cols-[300px]"
		>
			{#await getProducts}
				{#each [1, 2, 3, 4, 5, 6] as _, i}
					<ProductCardSkeleton />
				{/each}
			{:then products}
				{#each products.slice(0, 10) as product, i}
					<ProductCard {product} />
				{/each}
			{:catch error}
				<AlertWidget
					title="Error loading products"
					linkText="Reload"
					message={error}
					href={page.url.href}
					variant="destructive"
				/>
			{/await}
		</div>
	</ScrollArea>
</Card>
