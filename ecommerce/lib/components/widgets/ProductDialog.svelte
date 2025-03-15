<script lang="ts">
	import {  buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { iProduct } from '$lib/interface';
	import { type Snippet } from 'svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { cn } from '$lib/utils';
	import ProductSelectList from '$lib/components/lists/ProductSelectList.svelte';

	interface Props {
		children: Snippet;
		title?: string;
		initial?: iProduct;
		products: iProduct[];
		onselect: (selected: iProduct) => void;
		class?: string;
	}

	let { children, title = 'Upload your file', products, initial, onselect, class: className }: Props = $props();
	let open = $state(false);
	let selected = $state(initial);

	const handleSelect = (selected: iProduct) => {
		onselect(selected)
		open = false
	}

</script>

<Dialog.Root bind:open>
	<Dialog.Trigger type="button" class={cn(buttonVariants({ variant: 'outline' }), className)}
		>{@render children()}</Dialog.Trigger
	>
	<Dialog.Content class="mx-auto w-[calc(100%-32px)] rounded-lg p-4">
		<ScrollArea>
			<ProductSelectList onselect={handleSelect} items={products} />
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>
