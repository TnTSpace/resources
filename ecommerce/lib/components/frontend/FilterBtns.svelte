<script lang="ts">
	import { page } from '$app/state';
	import { XIcon } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { ScrollArea } from '../ui/scroll-area';

	const category = page.url.searchParams.get('category') || undefined;
	const sizeOptions = page.url.searchParams.get('size') || undefined;
	let sizes = $state(sizeOptions ? sizeOptions.split('--') : []);
	const search = page.url.searchParams.get('search') || undefined;
	const isFeatured = page.url.searchParams.get('isFeatured') || undefined;
	const price = page.url.searchParams.get('price') || undefined;
	const prices = price ? price.split('-').map((p) => Number(p)) : [];
  const sort = page.url.searchParams.get('sort') || undefined
  const [column, direction] = sort ? sort.split('_') : []

	const removeCategoryFilter = () => {
		page.url.searchParams.delete('category');
		location.href = page.url.href;
	};

	const removeSizeFilter = (size: string) => {
		sizes = sizes.filter((sz) => sz !== size);

		if (sizes.length === 0) {
			page.url.searchParams.delete('size');
		} else {
			page.url.searchParams.set('size', sizes.join('--'));
		}
		location.href = page.url.href;
	};

	const removePriceFilter = () => {
		page.url.searchParams.delete('price');
		location.href = page.url.href;
	};

	const removeSort = () => {
		page.url.searchParams.delete('sort');
		location.href = page.url.href;
	}
	
	const removeIsFeatured = () => {
		page.url.searchParams.delete('isFeatured')
		location.href = page.url.href
	}
	
	const removeSearchFilter = () => {
		page.url.searchParams.delete('search');
		location.href = page.url.href;
	};
</script>

<ScrollArea orientation="horizontal">
	<div class="flex w-full items-center gap-2">
		{#if search}
		<Button
			variant="outline"
			class="items-center rounded-full text-xs capitalize"
			size="sm"
			onclick={removeSearchFilter}
		>
			{search}
			<XIcon class="size-4" />
		</Button>
		{/if}
		{#if isFeatured}
		<Button
			variant="outline"
			class="items-center rounded-full text-xs capitalize"
			size="sm"
			onclick={removeIsFeatured}
		>
			Is on Homepage
			<XIcon class="size-4" />
		</Button>
		{/if}
		{#if category}
			<Button
				variant="outline"
				class="items-center rounded-full text-xs capitalize"
				size="sm"
				onclick={removeCategoryFilter}
			>
				{category}
				<XIcon class="size-4" />
			</Button>
		{/if}
		{#each sizes as size}
			<Button
				variant="outline"
				class="items-center rounded-full text-xs capitalize"
				size="sm"
				onclick={() => removeSizeFilter(size)}
			>
				size {size}
				<XIcon class="size-4" />
			</Button>
		{/each}
		{#if prices.length}
			<Button
				variant="outline"
				class="items-center rounded-full text-xs capitalize"
				size="sm"
				onclick={removePriceFilter}
			>
				<span>₦ {prices[0].toLocaleString()} - ₦ {prices[1].toLocaleString()}</span>
				<XIcon class="size-4" />
			</Button>
		{/if}
		{#if sort}
			<Button
				variant="outline"
				class="items-center rounded-full text-xs capitalize"
				size="sm"
				onclick={removeSort}
			>
				Sort by {column} ({direction})
				<XIcon class="size-4" />
			</Button>
		{/if}
	</div>
</ScrollArea>
