<script lang="ts">
	import DealBanner from '$lib/components/frontend/DealBanner.svelte';
	import ProductGrid from '$lib/components/frontend/ProductGrid.svelte';
	import HeroTwo from '$lib/components/widgets/HeroTwo.svelte';
	import Wrap from '$lib/components/widgets/Wrap.svelte'; 
	import type { PageServerData } from './$types';

	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();

	const getProducts = data.getProducts;
	const getRecentlyViewed = data.getRecentlyViewed;
	const me = data.me
</script>

<div class="flex flex-col">
	<HeroTwo />

	<Wrap class="bg-paper-50 py-4 dark:bg-secondary/50 md:py-12 lg:py-20">
		<DealBanner />
	</Wrap>
	{#if me}
		<Wrap class="bg-paper-100 py-4 dark:bg-background md:py-12 lg:py-20">
			<ProductGrid
				viewAll={`/catalog/`}
				title="Recently Viewed Products"
				getProducts={getRecentlyViewed}
			/>
		</Wrap>
	{/if}
	<Wrap class="bg-paper-50 py-4 dark:bg-secondary/50 md:py-12 lg:py-20">
		<ProductGrid viewAll={`/catalog/?isFeatured=true`} title="Featured Products" {getProducts} />
	</Wrap>
</div>
