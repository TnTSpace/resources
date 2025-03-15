<script lang="ts">
	import { page } from '$app/state';
	import ExpandedProductForm from '$lib/components/forms/ExpandedProductForm.svelte';
	import ProductGrid from '$lib/components/frontend/ProductGrid.svelte';
	import { Button } from '$lib/components/ui/button';
	import Wrap from '$lib/components/widgets/Wrap.svelte';
	import { stripHtmlTags } from '$lib/fxn';
	import type { iImage, iMeta } from '$lib/interface';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const product = data.product;

	const getProducts = data.relatedProducts;

	const relatedHref = data.relatedHref;

	let meta = $state<iMeta>();

	if (product) {
		meta = {
			title: product.name,
			description: stripHtmlTags(product.description),
			ogimage: (product!.thumbnail as iImage)?.url || '/placeholder.webp',
			link: `https://www.beuzibahstores.com${page.url.pathname}`,
			keywords: [product.name, stripHtmlTags(product.description), 'Beuzibah Stores', 'buy', 'shop']
		};
	} else {
		meta = {
			title: 'Not Found | Beuzibah Stores',
			description: 'Style, Beauty, and Innovation Delivered!',
			ogimage: 'https://www.beuzibahstores.com/screenshot-wide.webp',
			link: `https://www.beuzibahstores.com${page.url.pathname}`,
			keywords: ['search', 'product', 'price', 'tag', 'buy', 'shop']
		};
	}
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

{#if product}
	<Wrap class="px-4 py-4 md:px-0">
		<ExpandedProductForm {product} showHeading={false} />
	</Wrap>
	<Wrap class="bg-paper-100 py-4 dark:bg-background md:py-12 lg:py-20">
		<ProductGrid
			exclude={product.xata_id}
			viewAll={relatedHref}
			title="Related Products"
			{getProducts}
		/>
	</Wrap>
{:else}
	<div class="flex h-screen w-full items-center justify-center">
		<div class="flex flex-col gap-2">
			<h1 class="text-2xl font-semibold">Product Not Found</h1>
			<Button href="/">Homepage 👉</Button>
		</div>
	</div>
{/if}
