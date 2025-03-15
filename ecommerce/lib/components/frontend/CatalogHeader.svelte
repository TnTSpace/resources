<script lang="ts">
	import type { iProduct, ProductCardType } from '$lib/interface';
	import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group';
	import { Grid, List } from 'lucide-svelte';
	import { viewStore } from '$lib/stores';
	import { Separator } from '$lib/components/ui/separator';
	import { buttonVariants } from '$lib/components/ui/button';
	import FilterBtns from '$lib/components/frontend/FilterBtns.svelte';

	interface Props {
		products: iProduct[];
	}
	let { products }: Props = $props();

	const onValueChange = (value: any) => {
		if (value.length) {
			$viewStore = value as ProductCardType;
		}
	};
</script>

<div
	class="sticky left-0 top-16 z-[1] dark:bg-background py-2 md:px-4 flex flex-col gap-2"
>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<span>Catalog</span>
			<Separator orientation="vertical" class="h-4" />
			<span class="text-sm text-gray-500">{products.length} Item(s)</span>
		</div>
		<ToggleGroup type="single" value={$viewStore} {onValueChange}>
			<ToggleGroupItem
				value="grid"
				aria-label="Grid view"
				class={buttonVariants({ variant: 'outline', size: 'icon' })}
			>
				<Grid class="size-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="list"
				aria-label="List view"
				class={buttonVariants({ variant: 'outline', size: 'icon' })}
			>
				<List class="size-4" />
			</ToggleGroupItem>
		</ToggleGroup>
	</div>
	<FilterBtns />
</div>
