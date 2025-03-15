<script lang="ts">
	import ProductCard from '$lib/components/frontend/cards/ProductCard.svelte';
	import { cartStore } from '$lib/stores';
	import CheckoutForm from '$lib/components/forms/CheckoutForm.svelte';
	import type { iMeta, iProduct, iShipping, iShippingType } from '$lib/interface';
	import { Card } from '$lib/components/ui/card';
	import { writable, type Writable } from 'svelte/store';
	import { getAmount } from '$lib/fxn';
	import InfoAlert from '$lib/components/alerts/InfoAlert.svelte';

	const meta: iMeta = {
		title: 'Cart | Beuzibah Stores',
		description: 'Style, Beauty, and Innovation Delivered!',
		ogimage: 'https://www.beuzibahstores.com/screenshot-wide.webp',
		link: 'https://www.beuzibahstores.com/',
		keywords: ['cart', 'search', 'product', 'price', 'tag', 'buy', 'shop']
	};

	const shippingType: Writable<iShippingType> = writable({
		amount: 0,
		type: 'standard'
	});

	const shippingLocation: Writable<Partial<iShipping>> = writable({
		country: 'N/A',
		state: 'N/A',
		location: 'N/A',
		standardNote: 'N/A',
		standard: 0,
		expressNote: 'N/A',
		express: 0,
		miscellaneous: 0
	});

	const getShippingFee = (): number => {
		if (!$shippingLocation || !$shippingType) {
			return 0;
		}

		const baseShippingFee = $shippingLocation[$shippingType.type] ?? 0;
		const miscFee = $shippingLocation.miscellaneous ?? 0;

		return baseShippingFee + Number(miscFee);
	};

	let cartAmount = $derived(
		$cartStore.reduce(
			(acc, cur) => (acc += (cur.product as iProduct).price * (cur.quantityOrdered as number)),
			0
		) + getAmount($shippingLocation[$shippingType.type], $shippingLocation.miscellaneous)
	);

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

<section>
	<div class="grid grid-cols-1 gap-4 center lg:grid-cols-[1fr_320px]">
		<Card
			class="flex items-center justify-between rounded-lg px-4 py-2 dark:bg-secondary lg:hidden"
		>
			<h2 class="text-sm font-semibold uppercase">subtotal</h2>
			<p class="font-bold">₦{cartAmount.toLocaleString()}</p>
		</Card>
		<div class="grid h-min grid-cols-1 gap-2">
			<h2 class="text-sm font-semibold uppercase">cart details</h2>
			<div class="grid grid-cols-1 gap-4">
				{#each $cartStore as item, i}
					<ProductCard type="list" product={item.product as iProduct} />
				{:else}
					<InfoAlert
						linkText="Shop Now"
						href="/catalog"
						title="No Cart Item Yet"
						message="Your items will appear here once added to cart. Stay ahead—explore our collection and add your first order to cart today! 🚀"
					/>
				{/each}
			</div>
		</div>
		<div class="hidden gap-2 lg:flex lg:flex-col">
			<h2 class="text-sm font-semibold uppercase">cart summary</h2>
			{#key cartAmount}
				<Card class=" flex flex-col gap-4 rounded-lg p-4 dark:bg-secondary">
					{#each $cartStore as item, i}
						<div class="flex items-center justify-between gap-4">
							<div class="flex items-center gap-1 text-sm font-semibold capitalize">
								<p class="line-clamp-1">{(item.product as iProduct).name}</p>
								<span class="lowercase text-muted-foreground">x{item.quantityOrdered}</span>
							</div>
							<p class="font-bold">
								₦{(
									(item.product as iProduct).price * (item.quantityOrdered as number)
								).toLocaleString()}
							</p>
						</div>
					{/each}
					{#if $shippingLocation && $shippingType.type && $shippingLocation.location}
						<div
							class="flex items-center justify-between border-muted-foreground/50 py-2 dark:border-muted-foreground/20"
						>
							<h2 class="text-sm font-semibold capitalize">
								{$shippingType.type} shipping ({$shippingLocation.location})
							</h2>
							<p class="font-bold">₦{getShippingFee().toLocaleString()}</p>
						</div>
					{/if}
					<div
						class="flex items-center justify-between border-y border-muted-foreground/30 py-2 dark:border-muted-foreground/10"
					>
						<h2 class="text-sm font-semibold uppercase">subtotal</h2>
						<p class="font-bold">₦{cartAmount.toLocaleString()}</p>
					</div>
				</Card>
			{/key}

			{#if $cartStore.length}
				<Card class="mt-2 p-4 dark:bg-secondary">
					<CheckoutForm {shippingType} {shippingLocation} disableHeading={true} />
				</Card>
			{/if}
		</div>
		{#key cartAmount}
			<Card class="flex flex-col gap-4 rounded-lg p-4 dark:bg-secondary lg:hidden">
				{#each $cartStore as item, i}
					<div class="flex items-center justify-between gap-4">
						<div class="flex items-center gap-1 text-sm font-semibold capitalize">
							<p class="line-clamp-1">{(item.product as iProduct).name}</p>
							<span class="lowercase text-muted-foreground">x{item.quantityOrdered}</span>
						</div>
						<p class="font-bold">
							₦{(
								(item.product as iProduct).price * (item.quantityOrdered as number)
							).toLocaleString()}
						</p>
					</div>
				{/each}
				{#if $shippingLocation && $shippingType.type}
					<div
						class="flex items-center justify-between border-muted-foreground/50 py-2 dark:border-muted-foreground/20"
					>
						<h2 class="text-sm font-semibold capitalize">
							{$shippingType.type} shipping ({$shippingLocation.location})
						</h2>
						<p class="font-bold">₦{getShippingFee().toLocaleString()}</p>
					</div>
				{/if}
				<div
					class="flex items-center justify-between border-y border-muted-foreground/50 py-2 dark:border-muted-foreground/20"
				>
					<h2 class="text-sm font-semibold uppercase">subtotal</h2>
					<p class="font-bold">₦{cartAmount.toLocaleString()}</p>
				</div>
				<CheckoutForm {shippingType} {shippingLocation} disableHeading={true} />
			</Card>
		{/key}
	</div>
</section>
