<script lang="ts">
	import Search from '$lib/components/widgets/Search.svelte';
	import type { iCategory, iSize } from '$lib/interface';
	import pkg from 'lodash';
	import { writable, type Writable } from 'svelte/store';
	import { Button } from '$lib/components/ui/button';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { PlusIcon } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import ApiList from '$lib/components/widgets/APIList.svelte';
	import SizeInfiniteList from './SizeInfiniteList.svelte';
	import { getContext } from 'svelte';
	const { debounce } = pkg;

	const sizes = getContext('sizes') as iSize[];

	const filterKeys: (keyof iSize)[] = [
		'name',
		'value',
		'xata_createdat',
		'xata_updatedat',
		'category'
	];

	let itemsStore: Writable<iSize[]> = writable(sizes);

	let searchTerm = $state('');

	const filterItems = debounce((term: string) => {
		const lowercasedTerm = term.toLowerCase();
		$itemsStore = sizes.filter((item) =>
			filterKeys.some((key) => {
				if (key === 'category') {
					const childValue = (item.category as iCategory).name
					return childValue?.toString().toLowerCase().includes(lowercasedTerm);
				} else {
					const childValue = item[key];
					return childValue?.toString().toLowerCase().includes(lowercasedTerm);
				}
			})
		);
	}, 300);

	const onkeyup = (evt: Event) => {
		const term = (evt.target as HTMLInputElement).value;
		searchTerm = term;
		filterItems(term);
	};

	const href = `/admin/sizes/new`;
</script>

<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
	<Heading title={`Sizes (${$itemsStore.length})`} description="Manage sizes for your store" />
	<div class="grid grid-cols-[1fr_auto] gap-2">
		<Search inputValue={searchTerm} {onkeyup} />
		<Button {href} class="size-10 sm:size-auto">
			<PlusIcon class="size-4" />
			<span class="hidden sm:flex">Add New</span>
		</Button>
	</div>
</div>

<Separator />

{#key $itemsStore.length}
	<SizeInfiniteList
		list={$itemsStore}
		class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
	/>
{/key}
<Heading title="API" description="API calls for Sizes" />
<Separator />
<ApiList entityName="sizes" entityIdName="sizeId" />
