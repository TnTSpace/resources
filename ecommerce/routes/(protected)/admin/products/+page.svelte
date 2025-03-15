<script lang="ts">
	import ProductList from '$lib/components/lists/ProductList.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const products = data.products;
</script>

<div class="flex-col">
	<div class="flex-1 space-y-4 p-4 pt-2">
		<ProductList items={products} />
	</div>
</div>
