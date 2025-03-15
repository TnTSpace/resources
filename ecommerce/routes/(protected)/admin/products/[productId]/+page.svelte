<script lang="ts">
	import ProductForm from '$lib/components/forms/ProductForm.svelte';
	import type { iProduct, iSize } from '$lib/interface';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const product = data.product as iProduct;
</script>

<div class="flex-col">
	<div class="flex-1 space-y-4 p-4 pt-2">
		<ProductForm {product} />
	</div>
</div>
