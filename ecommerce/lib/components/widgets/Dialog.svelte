<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { modalStore } from '$lib/stores';
	import CategoryForm from '$lib/components/forms/CategoryForm.svelte';
	import ColorForm from '$lib/components/forms/ColorForm.svelte';
	import SizeForm from '$lib/components/forms/SizeForm.svelte';
	import CheckoutForm from '$lib/components/forms/CheckoutForm.svelte';
	import SizeList from '$lib/components/lists/SizeList.svelte';
</script>

<Dialog.Root open={$modalStore.open}>
	<Dialog.Content class="z-[100] rounded-lg">
		{#if $modalStore.type === 'createColor'}
			<ColorForm color={null} />
		{/if}
		{#if $modalStore.type === 'createSize'}
			<SizeForm size={null} />
		{/if}
		{#if $modalStore.type === 'createCategory'}
			<CategoryForm />
		{/if}
		{#if $modalStore.type === 'checkoutOrder'}
			<CheckoutForm />
		{/if}
		{#if $modalStore.type === 'sizeList'}
			<SizeList />
		{/if}
	</Dialog.Content>
</Dialog.Root>
