<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { eProductCardType } from '$lib/constants';
	import { addToCart, deleteFromCart, getDiscount, onCheckout, updateCart } from '$lib/fxn';
	import type {
		iCart,
		iCategory,
		iImage,
		iProduct,
		iSelect,
		iUser,
		iXataCart
	} from '$lib/interface';
	import { cartStore, modalStore, viewStore } from '$lib/stores';
	import { Share2Icon, ExpandIcon, PlusIcon } from 'lucide-svelte';
	import ProductDropdown from '$lib/components/frontend/dropdowns/ProductDropdown.svelte';
	import { onShare, getStyle } from '@toolsntuts/utils';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';
	import ProductQuantityDialog from '$lib/components/frontend/ProductQuantityDialog.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import SpinLoader from '$lib/components/widgets/SpinLoader.svelte';

	interface Props {
		product: iProduct;
		type?: 'grid' | 'list';
	}

	const me = getContext('me') as iUser;

	let { product, type }: Props = $props();

	let loading = $state(false);
	let style = $state('');

	let viewMode = $derived(type ? type : $viewStore);

	let addedToCart = $state(false);

	const href = `${page.url.origin}/catalog/${product.xata_id}`;

	const handleShare = async () => {
		await onShare({
			title: product.name,
			url: href,
			text: product.name
		});
	};

	const handleExpand = () => {
		$modalStore = { ...$modalStore, open: true, data: product, type: 'expandProduct' };
	};

	$effect(() => {
		addedToCart = !!$cartStore.find(
			(item) => (item.product as iProduct).xata_id === product.xata_id
		);
	});

	const addToCartWhenSignedOut = (cartItem: Partial<iXataCart>) => {
		$cartStore = [...$cartStore, cartItem];
	};

	const addToCartWhenSignedIn = async (cartItem: Partial<iXataCart>) => {
		const result = await addToCart(cartItem, me);
		if (result.status === 'success') {
			$cartStore = [...$cartStore, { ...result.data }];
		}
	};

	const updateCartWhenSignedOut = (item: Partial<iXataCart>, quantity: number) => {
		$cartStore = $cartStore.map((cartItem) => {
			const target = (cartItem.product as iProduct).xata_id === (item.product as iProduct).xata_id;
			if (target) {
				cartItem.quantityOrdered = quantity;
			}
			return cartItem;
		});
	};

	const updateCartWhenSignedIn = async (item: Partial<iXataCart>, quantity: number) => {
		const result = await updateCart(item.xata_id as string, item);
		if (result.status === 'success') {
			updateCartWhenSignedOut(item, quantity);
		}
	};

	const deleteFromCartWhenSignedOut = (product: iProduct) => {
		$cartStore = $cartStore.filter(
			(item) => (item.product as iProduct).xata_id !== product.xata_id
		);
	};

	const deleteFromCartWhenSignedIn = async (item: Partial<iXataCart>) => {
		const result = await deleteFromCart(item.xata_id as string);
		if (result.status === 'success') {
			$cartStore = $cartStore.filter(
				(item) => (item.product as iProduct).xata_id !== product.xata_id
			);
		}
	};

	const handleAddToCart = async () => {
		loading = true;
		const cartItem = {
			product,
			quantityOrdered: 1
		};
		me ? await addToCartWhenSignedIn(cartItem) : addToCartWhenSignedOut(cartItem);
		addedToCart = true;
		loading = false;
	};

	const onselect = async (quantity: number) => {
		let item = $cartStore.find((pr) => (pr.product as iProduct).xata_id === product.xata_id);

		loading = true;
		if (quantity === 0) {
			me
				? await deleteFromCartWhenSignedIn(item as Partial<iXataCart>)
				: deleteFromCartWhenSignedOut(product);
		} else {
			if (item) {
				item.quantityOrdered = quantity;
				me ? await updateCartWhenSignedIn(item, quantity) : updateCartWhenSignedOut(item, quantity);
			}
		}
		loading = false;
	};

	$effect(() => {
		if (product.images) {
			style = getStyle((product!.thumbnail as iImage)?.url || '/placeholder.webp');
		}
	});

	const srcset = `${(product!.thumbnail as iImage)?.url || '/placeholder.webp'}?w=480;1024;1920&format=webp&as=srcset`;
</script>

{#if viewMode === eProductCardType.GRID}
	<Card
		class="flex flex-col overflow-hidden rounded-lg bg-white text-current shadow-lg dark:bg-background"
	>
		<a {href} class="relative">
			<img
				loading="lazy"
				{srcset}
				sizes="(max-width: 640px) 480px, (max-width: 1024px) 1024px, 1920px"
				alt={product.name}
				class="aspect-square w-full rounded-t-lg object-cover"
			/>
			{#if product.oldPrice > product.price}
				<span
					class="absolute right-2 top-2 rounded-full bg-destructive px-2 py-1 text-xs font-semibold text-white"
					>{getDiscount(product.oldPrice, product.price)}% OFF</span
				>
			{/if}
		</a>
		<div class="flex flex-col space-y-2 p-2">
			<div class="flex flex-col items-start space-y-1">
				<h3 class="text-sm font-medium">{product.name}</h3>
				<div class="flex gap-1 md:flex-row">
					{#if product.category}
						<Badge>{(product.category as iCategory).name}</Badge>
					{/if}
				</div>
			</div>
			<div class="mt-auto">
				<div class="flex items-center gap-1">
					<span class="font-semibold">₦{product.price.toLocaleString()}</span>
					{#if product.oldPrice > product.price}
						<span class="text-xs text-muted-foreground line-through">
							₦{product.oldPrice.toLocaleString()}
						</span>
					{/if}
				</div>
				<div class="flex items-center justify-between">
					<div class="flex items-baseline gap-1">
						<!-- <div class="mt-1 flex items-baseline gap-1">
							<div class="flex items-center gap-1 text-sm">
								<span>{product.rating ? product.rating : 0.0}</span>
								<span class="flex size-5 items-center justify-center rounded-full text-[#f90]"
									>★</span
								>
							</div>
							<span class="text-xs text-muted-foreground">
								({product.reviews || 0})
							</span>
						</div> -->
						<div
							class={cn(
								'text-xs',
								product.stock < 10
									? 'text-red-800 dark:text-red-500'
									: 'text-green-800 dark:text-green-500'
							)}
						>
							{product.stock}
							{product.stock > 1 ? 'items' : 'item'} left
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-auto flex items-center justify-between">
			<div class="flex items-center justify-center border-t border-t-muted-foreground/10">
				<ProductDropdown {product} />
				<Button
					class="rounded-none border-y-0 border-l-0 text-amber-500"
					variant="outline"
					size="icon"
					aria-label="share product url"
					onclick={handleShare}
				>
					<Share2Icon class="size-4" />
				</Button>
				<Button
					class="rounded-none border-y-0 border-l-0 text-fuchsia-500"
					variant="outline"
					size="icon"
					aria-label="open product detail"
					onclick={handleExpand}
				>
					<ExpandIcon class="size-4" />
				</Button>
			</div>
			<div>
				{#if !addedToCart}
					{#if loading}
						<Button class="w-[84px]">
							<SpinLoader/>
						</Button>
					{:else}
						<Button aria-label="add product to cart" onclick={handleAddToCart}>
							<PlusIcon class="size-4" />
							Cart
						</Button>
					{/if}
				{:else if loading}
					<Button variant="outline" class="w-[84px]">
						<SpinLoader />
					</Button>
				{:else}
					<ProductQuantityDialog {product} {onselect} />
				{/if}
			</div>
		</div>
	</Card>
{/if}

{#if viewMode === eProductCardType.LIST}
	<Card class="overflow-hidden rounded-lg bg-white text-current shadow-lg dark:bg-secondary">
		<article
			class="relative grid w-full grid-cols-[88px_1fr] items-start md:grid-cols-[120px_1fr]"
			data-sku={product.sku}
		>
			<a {href} class="relative aspect-[88/156] h-[156px] md:aspect-[120/156]" {style}>
				{#if product.oldPrice > product.price}
					<span
						class="absolute right-2 top-2 rounded-full bg-destructive px-2 py-1 text-xs font-semibold text-white"
						>{getDiscount(product.oldPrice, product.price)}% OFF</span
					>
				{/if}
			</a>
			<div aria-label="details" class="relative flex h-full w-full flex-col items-start p-2">
				<div class="flex h-full w-full flex-col items-start gap-1">
					<h3 class="line-clamp-2 w-full text-ellipsis text-sm font-medium">{product.name}</h3>
					<div aria-label="prices" class="flex items-baseline justify-start gap-2 leading-[1]">
						<div class="w-fit font-medium">₦{product.price.toLocaleString()}</div>
						<div class="relative flex h-4 items-center gap-2">
							{#if product.oldPrice > product.price}
								<div class="hidden text-xs text-muted-foreground line-through sm:flex">
									₦{product.oldPrice.toLocaleString()}
								</div>
							{/if}
						</div>
					</div>
					<div class="flex items-baseline gap-1">
						<div class="mt-1 flex items-baseline gap-1">
							<div class="flex items-center gap-1 text-sm">
								<span class="flex size-5 items-center justify-center rounded-full text-[#f90]"
									>★</span
								>
								<span>{product.rating ? product.rating : 0.0}</span>
							</div>
							<span class="text-xs text-muted-foreground">
								({product.reviews || 0})
							</span>
						</div>

						<div
							class={cn(
								'text-xs',
								product.stock < 10
									? 'text-red-800 dark:text-red-500'
									: 'text-green-800 dark:text-green-500'
							)}
						>
							{product.stock}
							{product.stock > 1 ? 'items' : 'item'} left
						</div>
					</div>
				</div>
				<div class="flex flex-col gap-1">
					{#if product.category}
						<Badge>{(product.category as iCategory).name}</Badge>
					{/if}
				</div>
			</div>
		</article>
		<div class="flex w-full items-center justify-between border-t border-t-muted-foreground/10">
			<div class="mt-auto flex items-center">
				<ProductDropdown {product} />
				<Button
					class="rounded-none border-y-0 border-l-0 text-amber-500"
					variant="outline"
					size="icon"
					aria-label="share product url"
					onclick={handleShare}
				>
					<Share2Icon class="size-4" />
				</Button>
				<Button
					class="rounded-none border-y-0 border-l-0 text-fuchsia-500"
					variant="outline"
					size="icon"
					aria-label="open product detail"
					onclick={handleExpand}
				>
					<ExpandIcon class="size-4" />
				</Button>
			</div>
			<div class="mt-auto">
				{#if !addedToCart}
					{#if loading}
						<Button class="w-[84px]">
							<SpinLoader class="size-4 !border-white dark:!border-primary" />
						</Button>
					{:else}
						<Button aria-label="add product to cart" onclick={handleAddToCart}>
							<PlusIcon class="size-4" />
							Cart
						</Button>
					{/if}
				{:else if loading}
					<Button variant="outline" class="w-[84px]">
						<SpinLoader class="size-4 !border-primary dark:!border-white" />
					</Button>
				{:else}
					<ProductQuantityDialog {product} {onselect} />
				{/if}
			</div>
		</div>
	</Card>
{/if}
