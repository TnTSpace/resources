<script lang="ts">
	import type { iCategory, iImage, iProduct } from '$lib/interface';
	import { getStyle, onCopy } from '@toolsntuts/utils';
	import { Trash2Icon, PencilIcon, CopyIcon } from 'lucide-svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { deleteProductApi } from '$lib/api-utils';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { cn } from '$lib/utils';
	import { discount } from '$lib/common';
	import { Badge } from '$lib/components/ui/badge';

	interface Props {
		product: iProduct;
		onedit: (id: string) => void;
		onview: (id: string) => void;
	}

	let { product, onedit }: Props = $props();
	const { xata_id, name, category, xata_updatedat } = product;

	const style = getStyle(
		(product!.thumbnail as iImage)?.url || '/placeholder.webp' || '/placeholder.webp'
	);
</script>

<Card class="flex flex-col gap-1 overflow-hidden border-none bg-white shadow-md dark:bg-background">
	<div {style} class="aspect-square rounded-lg"></div>
	<div class="flex flex-col gap-1 px-2 py-0">
		<p class="line-clamp-2">{name}</p>
		<div>
			<p class="font-semibold">₦ {product.price.toLocaleString()}</p>
			{#if product.price < product.oldPrice}
				<div class="flex items-center gap-1">
					<p class="text-xs text-muted-foreground line-through">
						₦ {product.oldPrice.toLocaleString()}
					</p>
					<p class="text-xs text-[#ff9900]">
						-{discount(product.oldPrice, product.price)}% OFF
					</p>
				</div>
			{/if}
			<p class="text-xs text-muted-foreground">Updated at: {xata_updatedat.toLocaleString()}</p>
		</div>
	</div>
	<div class="mt-auto flex flex-col gap-2">
		{#if category}
			<Badge class="w-fit">{(category as iCategory)?.name}</Badge>
		{/if}
		<div class="flex items-center justify-end border-t border-t-muted-foreground/10">
			<Button
				onclick={() => onCopy(xata_id)}
				class="rounded-none border-y-0 border-l-0 text-green-500"
				variant="outline"
				size="icon"
				aria-label="copy product id"
			>
				<CopyIcon class="size-4" />
			</Button>
			<Button
				onclick={() => onedit(xata_id)}
				class="rounded-none border-y-0 border-l-0 text-blue-500"
				variant="outline"
				size="icon"
				aria-label="edit product"
			>
				<PencilIcon class="size-4" />
			</Button>
			<AlertDialog
				class={cn(
					buttonVariants({ variant: 'outline' }),
					'rounded-none border-y-0 border-l-0 text-red-500'
				)}
				name={`${product.name} product`}
				onconfirm={() => deleteProductApi(product)}
				disabled={false}
			>
				<Trash2Icon class="size-4" />
			</AlertDialog>
		</div>
	</div>
</Card>
