<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { cartStore } from '$lib/stores';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import type { iProduct } from '$lib/interface';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	interface Props {
		product: iProduct;
		onselect: (quantity: number) => void
	}

	let { product, onselect }: Props = $props()
	
	let open = $state(false)

	const item = $cartStore.find(item => (item.product as iProduct).xata_id === product.xata_id)
	
	let cartItemQuantity = $state(Number(item?.quantityOrdered))

	let stock = Array.from({ length: Number(product.stock) }, (_, i) => i);


	const onclick = (quantity: number) => {
		cartItemQuantity = quantity
		onselect(quantity)
		open = false
	}

	const format = (quantity: number) => quantity > 1 ? `${quantity} items` : `${quantity} item`
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>{format(cartItemQuantity)}</Dialog.Trigger>
	<Dialog.Content class="z-[100] mx-auto w-[calc(100%-32px)] max-w-3xl rounded-lg p-4">
		<div class="flex items-center justify-between">
			<Heading
				class="text-start"
				title="Select Product Quantity"
				description="Select how much of this item you wish to order"
			/>
		</div>
		<Separator />
		<ScrollArea class="h-80">
			<div class="flex flex-col gap-2">
				{#each stock as num, i}
					<Button variant="outline" onclick={() => onclick(num)}>
						{format(num)}
					</Button>
				{/each}
			</div>
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>
