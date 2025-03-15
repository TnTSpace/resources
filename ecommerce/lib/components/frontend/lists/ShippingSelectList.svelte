<script lang="ts">
	import Search from '$lib/components/widgets/Search.svelte';
	import type { iShipping } from '$lib/interface';
	import pkg from 'lodash';
	import { writable, type Writable } from 'svelte/store'; 
	import { Separator } from '$lib/components/ui/separator';
	import { getContext } from 'svelte'; 
	import ShippingSelectInfiniteList from './ShippingSelectInfiniteList.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	const { debounce } = pkg;

	interface Props {
		onselect: (shipping: iShipping) => void;
	}

	let { onselect }: Props = $props();

	const items = getContext('shippings') as iShipping[];

	const filterKeys: (keyof iShipping)[] = [
		'country',
		'state',
		'location',
		'expressNote',
		'standardNote',
		'xata_createdat',
		'xata_updatedat'
	];

	let itemsStore: Writable<iShipping[]> = writable(items);

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

	const href = `/admin/shippings/new`;
</script>

<div class="space-y-4">
	<Search inputValue={searchTerm} {onkeyup} />
<Separator />
<ScrollArea class="h-80">
	{#key $itemsStore.length}
		<ShippingSelectInfiniteList
			{onselect}
			list={$itemsStore}
			class="grid grid-cols-2 gap-4 md:grid-cols-3"
		/>
	{/key}
</ScrollArea>
</div>
