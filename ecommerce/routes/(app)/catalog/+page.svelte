<script lang="ts">
	import type { PageData } from './$types';
	import type { iMeta, iProduct } from '$lib/interface';
	import { eProductCardType } from '$lib/constants';
	import ProductInfiniteList from '$lib/components/frontend/lists/ProductInfiniteList.svelte';
	import { cn } from '$lib/utils';
	import FilterSidebar from '$lib/components/frontend/FilterSidebar.svelte';
	import CatalogHeader from '$lib/components/frontend/CatalogHeader.svelte';
	import { drawerStore, viewStore } from '$lib/stores';
	import Wrap from '$lib/components/widgets/Wrap.svelte';

	let { data }: { data: PageData } = $props();

	const products = data.products;
	const sizes = data.sizes;
	const colors = data.colors;
	const categories = data.categories;

	$drawerStore = { ...$drawerStore, type: 'filter', data: { sizes, colors, categories } };

	const meta: iMeta = {
		title: 'Beuzibah Stores Catalog - Shop the Best Products',
		description:
			'Discover the best appliances, fashion, and beauty products. Explore our wide catalog at Beuzibah Stores for quality and innovation.',
		ogimage: 'https://www.beuzibahstores.com/catalog-preview.webp', // Update with an image of the catalog or banner
		link: 'https://www.beuzibahstores.com/catalog',
		keywords: [
			'catalog',
			'shop',
			'products',
			'appliances',
			'fashion',
			'beauty',
			'innovation',
			'Beuzibah Stores'
		]
	};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{meta.title}</title>
	<meta name="title" content={meta.title} />
	<meta name="description" content={meta.description} />
	<meta name="keywords" content={meta.keywords.join(', ')} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={meta.link} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.ogimage} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={meta.link} />
	<meta property="twitter:title" content={meta.title} />
	<meta property="twitter:description" content={meta.description} />
	<meta property="twitter:image" content={meta.ogimage} />
</svelte:head>

<Wrap>
	<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-[276px_1fr]">
		<div class="hidden lg:sticky lg:left-0 lg:top-16 lg:z-[1] lg:flex">
			<FilterSidebar {categories} {colors} {sizes} />
		</div>
		<div class="px-4 lg:px-0">
			<CatalogHeader {products} />
			<ProductInfiniteList
				class={cn(
					'grid gap-4 py-4',
					$viewStore === eProductCardType.GRID
						? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
						: 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
				)}
				list={products as iProduct[]}
			/>
		</div>
	</div>
</Wrap>
