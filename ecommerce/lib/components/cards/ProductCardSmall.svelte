<script lang="ts">
	import type { iImage, iProduct } from '$lib/interface';
	import { cn } from '$lib/utils';
	import Button from '$lib/components/ui/button/button.svelte';

	interface Props {
		product: iProduct;
		onselect?: (product: iProduct) => void;
		class?: string;
	}

	let { product, onselect, class: className }: Props = $props();
</script>

<Button
	onclick={() => onselect?.(product)}
	variant="outline"
	class={cn('h-auto w-full flex-col p-0 hover:bg-transparent', className)}
>
	<img
		class="aspect-square rounded-lg"
		src={(product!.thumbnail as iImage)?.url || '/placeholder.webp'}
		alt={product.name}
	/>
	<p
		class="w-full overflow-hidden text-ellipsis whitespace-nowrap p-2 text-xs text-muted-foreground"
	>
		{product.name}
	</p>
</Button>
