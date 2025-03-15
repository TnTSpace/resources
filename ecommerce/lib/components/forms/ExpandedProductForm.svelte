<script lang="ts">
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { type iResult } from '@toolsntuts/utils';
	import { Label } from '$lib/components/ui/label';
	import type {
		iCart,
		iCategory,
		iImage,
		iPaystackParams,
		iPaystackRes,
		iProduct,
		iUser,
		iXataCart
	} from '$lib/interface';
	import { toast } from 'svelte-sonner';
	import { cn } from '$lib/utils';
	import { modalStore } from '$lib/stores';
	import ImageCarousel from '../products/ImageCarousel.svelte';
	import { addToCart, deleteFromCart, getDiscount, onCheckout, updateCart } from '$lib/fxn';
	import Stars from '../widgets/Stars.svelte';
	import { cartStore } from '$lib/stores';
	import { PlusIcon, ShoppingCartIcon } from 'lucide-svelte';
	import { Badge } from '../ui/badge';
	import { ScrollArea } from '../ui/scroll-area';
	import { getContext } from 'svelte';
	import { page } from '$app/state';
	import ProductQuantityDialog from '../frontend/ProductQuantityDialog.svelte';
	import { SpinLoader } from '@toolsntuts/svelte-components';
	import ProductCardSmall from '../cards/ProductCardSmall.svelte';

	interface Props {
		product?: iProduct;
		class?: string;
		descriptionClass?: string;
		showHeading?: boolean;
	}

	const me = getContext('me') as iUser;

	let {
		product: productProp,
		class: className,
		showHeading = true,
		descriptionClass
	}: Props = $props();

	const product = productProp ? productProp : ($modalStore.data as iProduct);
	const title = 'Product Detail';
	const description = 'Learn more about this product';
	const href = `/catalog/${product.xata_id}`;
	const next = product.next as iProduct;

	let images = $state(product.images);
	let addedToCart = $state(false);
	let colors = $state(product.colors);
	let sizes = $state(product.sizes);
	let selectedColor = $state(colors.length ? colors[0] : '');
	let selectedSize = $state(sizes.length ? sizes[0] : '');
	let isOnPdpPage = $state(page.url.pathname === href);
	let loading = $state(false);

	const selectColor = (color: string) => {
		selectedColor = color;
	};

	const selectSize = (size: string) => {
		selectedSize = size;
	};

	const isSelectedColor = (color: string) => selectedColor === color;
	const isSelectedSize = (size: string) => selectedSize === size;

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
		addedToCart = !!$cartStore.find(
			(item) => (item.product as iProduct).xata_id === product.xata_id
		);
	});

	$effect(() => console.log({ isOnPdpPage }))
</script>

{#if showHeading}
	<Heading class="text-start" {title} {description} />
	<Separator />
{/if}
<div
	class={cn(
		'grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[384px_1fr_384px]',
		!isOnPdpPage && 'max-h-[65vh] overflow-y-auto lg:grid-cols-2',
		className
	)}
>
	<ImageCarousel images={images as iImage[]} class="w-full max-w-sm" />
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-0.5">
			<Badge class="w-fit">{(product.category as iCategory).name}</Badge>
			<h3 class="text-lg font-medium">{product.name}</h3>
			<!-- <div class="flex items-baseline gap-1">
				<Stars filled={4} />
				<span>{product.rating ? product.rating : 0.0}</span>
				<span class="text-muted-foreground">
					({product.reviews || 0})
				</span>
			</div> -->
		</div>

		<div class="flex flex-col gap-0.5">
			<Label class="text-sm text-muted-foreground">Price</Label>
			<div class="mt-1 flex items-center gap-2">
				<span class="text-2xl font-semibold">₦{product.price.toLocaleString()}</span>
				{#if product.oldPrice > product.price}
					<span class="text-muted-foreground line-through">
						₦{product.oldPrice.toLocaleString()}
					</span>
				{/if}
			</div>
			<!-- discount -->
			{#if product.oldPrice > product.price}
				<span class="w-fit rounded-full bg-destructive px-2 py-1 text-xs font-semibold text-white"
					>{getDiscount(product.oldPrice, product.price)}% OFF</span
				>
			{/if}
		</div>

		<!-- Rating and stock -->
		<div class="flex flex-col gap-0.5">
			<Label class="text-sm text-muted-foreground">Stock</Label>
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
		{#if colors.length}
			<div class="flex flex-col gap-1">
				<Label class="text-sm text-muted-foreground">Color</Label>
				<div class="grid grid-cols-[40px_40px_40px_40px] gap-4">
					{#each colors as color}
						<Button
							size="icon"
							variant="ghost"
							style={`background-color: ${color}`}
							class={cn(
								'mx-2 inline-block rounded-full capitalize',
								isSelectedColor(color) && 'ring-2 ring-primary ring-offset-2 dark:ring-white'
							)}
							onclick={() => selectColor(color)}
						/>
					{/each}
				</div>
			</div>
		{/if}

		{#if sizes.length}
			<div class="flex flex-col gap-1">
				<Label class="text-sm text-muted-foreground">Size</Label>
				<div class="grid grid-cols-[40px_40px_40px_40px] gap-4">
					{#each sizes as size}
						<Button
							size="icon"
							variant="outline"
							class={cn(
								'mx-2 inline-block rounded-lg capitalize',
								isSelectedSize(size) && 'ring-2 ring-primary ring-offset-2 dark:ring-white'
							)}
							onclick={() => selectSize(size)}>{size}</Button
						>
					{/each}
				</div>
			</div>
		{/if}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="flex flex-col gap-4"></div>
		</div>

		<div class="mt-auto flex flex-col gap-2">
			<div class="flex flex-col gap-2">
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
	</div>
	<div class={cn("flex flex-col gap-4", isOnPdpPage && "sm:col-span-2 lg:col-span-1")}>
		{#if product.description && product.description.length}
			{#if isOnPdpPage}
				<ScrollArea
					class={cn(
						'h-max lg:h-[288px]',
						descriptionClass,
					)}
				>
					<div class="prose dark:prose-invert">
						<Label class="text-sm text-muted-foreground">Description</Label>
						{@html product.description}
					</div>
				</ScrollArea>
			{:else}
				<div
					class={cn(
						'h-max',
						descriptionClass,
					)}
				>
					<div class="prose dark:prose-invert">
						<Label class="text-sm text-muted-foreground">Description</Label>
						{@html product.description}
					</div>
				</div>
			{/if}
		{/if}
		{#if next}
			<div class="flex flex-col gap-0.5">
				<Label class="text-sm text-muted-foreground">Next Product in the same category</Label>
				<Button
					href={`/catalog/${next.xata_id}`}
					variant="ghost"
					class="h-auto w-32 p-0 hover:bg-transparent"
				>
					<ProductCardSmall product={next} />
				</Button>
			</div>
		{/if}
	</div>
</div>
