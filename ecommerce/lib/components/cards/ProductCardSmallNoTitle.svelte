<script lang="ts">
	import type { iImage, iProduct } from '$lib/interface';
	import { cn } from '$lib/utils';
	import { getStyle } from '@toolsntuts/utils';
	import Button from '../ui/button/button.svelte';

	interface Props {
		product: iProduct;
		onselect?: (product: iProduct) => void;
		class?: string;
	}

	let { product, onselect, class: className }: Props = $props();

	const style = getStyle(
		(product!.thumbnail as iImage)?.url || '/placeholder.webp' || '/placeholder.webp'
	);
</script>

<Button
	onclick={() => onselect?.(product)}
	variant="outline"
	class={cn('h-auto w-full flex-col p-0 hover:bg-transparent', className)}
>
	<div {style} class="aspect-square w-full rounded-lg"></div>
</Button>
