<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { modalStore } from '$lib/stores';
	// import CheckoutForm from '$lib/components/forms/CheckoutForm.svelte';
	import ExpandedProductForm from '../forms/ExpandedProductForm.svelte';
	// import ProductQuantityForm from '../forms/ProductQuantityForm.svelte';
</script>

<Dialog.Root open={$modalStore.open}>
	<Dialog.Content class="z-[100] p-4 rounded-lg w-[calc(100%-32px)] mx-auto max-w-3xl">
		<!-- {#if $modalStore.type === 'checkoutOrder'}
			<CheckoutForm />
		{/if} -->
		{#if $modalStore.type === 'expandProduct'}
			<ExpandedProductForm class="md:grid-cols-2" descriptionClass="md:col-span-2" />
		{/if}
		<!-- {#if $modalStore.type == 'productQuantity'}
			<ProductQuantityForm />
		{/if} -->
	</Dialog.Content>
</Dialog.Root>
