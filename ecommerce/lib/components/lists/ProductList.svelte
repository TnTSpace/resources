<script lang="ts">
	import Search from '$lib/components/widgets/Search.svelte';
	import type { iProduct } from '$lib/interface';
	import pkg from 'lodash';
	import { writable, type Writable } from 'svelte/store';
	import { Button } from '$lib/components/ui/button';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { PlusIcon } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator'; 
	import ApiList from '$lib/components/widgets/APIList.svelte';
	import ProductInfiniteList from './ProductInfiniteList.svelte';
	const { debounce } = pkg;

	interface Props {
		items: iProduct[];
	}

	let { items }: Props = $props();

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

	const href = `/admin/products/new`;
</script>

<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
	<Heading
		title={`Products (${$itemsStore.length})`}
		description="Manage products for your store"
	/>
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
	<ProductInfiniteList
		list={$itemsStore}
		class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
	/>
{/key}
<Heading title="API" description="API calls for Products" />
<Separator />
<ApiList entityName="products" entityIdName="productId" />
