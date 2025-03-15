<script lang="ts">
	import Search from '$lib/components/widgets/Search.svelte';
	import type { iProduct } from '$lib/interface';
	import pkg from 'lodash';
	import { writable, type Writable } from 'svelte/store';
	import Heading from '$lib/components/sections/Heading.svelte';
	import ProductSelectInfiniteList from './ProductSelectInfiniteList.svelte';
	const { debounce } = pkg;

	interface Props {
		items: iProduct[];
		onselect: (selected: iProduct) => void;
	}

	let { items, onselect }: Props = $props();

	const filterKeys: (keyof iProduct)[] = [
		'name',
		'price',
		'oldPrice',
		'sku',
		'description',
		'xata_createdat',
		'xata_updatedat'
	];

	let itemsStore: Writable<iProduct[]> = writable(items);

	let searchTerm = $state('');

	const filterItems = debounce((term: string) => {
		const lowercasedTerm = term.toLowerCase();
		$itemsStore = items.filter((item) =>
			filterKeys.some((key) => {
				const childValue = item[key];
				return childValue?.toString().toLowerCase().includes(lowercasedTerm);
			})
		);
	}, 300);

	const onkeyup = (evt: Event) => {
		const term = (evt.target as HTMLInputElement).value;
		searchTerm = term;
		filterItems(term);
	};

</script>

<div class="space-y-2">
	<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
		<Heading
			title={`Products (${$itemsStore.length})`}
			description="Select product"
		/>
		<Search inputValue={searchTerm} {onkeyup} />
	</div>
	{#key $itemsStore.length}
		<ProductSelectInfiniteList
			list={$itemsStore}
			{onselect}
			class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
		/>
	{/key}
</div>
