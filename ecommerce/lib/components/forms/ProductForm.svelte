<script lang="ts">
	import type { iCategory, iImage, iProduct, iSize } from '$lib/interface';
	import { getContext } from 'svelte';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		Trash2Icon,
		MonitorUpIcon,
		ArchiveXIcon,
		XIcon,
		PackagePlusIcon,
		PlusIcon
	} from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { removeRingClasses, type iResult } from '@toolsntuts/utils';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { deleteProductApi } from '$lib/api-utils';
	import Currency from '$lib/components/widgets/Currency.svelte';
	import OnOff from '$lib/components/widgets/OnOff.svelte';
	import ImageWidget from '$lib/components/widgets/images/ImageWidget.svelte';
	import CategorySelect from '$lib/components/selects/CategorySelect.svelte';
	import SizeSelect from '$lib/components/selects/SizeSelect.svelte';
	import { writable, type Writable } from 'svelte/store';
	import ColorPicker from '$lib/components/widgets/ColorPicker.svelte';
	import ProductCardSmallNoTitle from '$lib/components/cards/ProductCardSmallNoTitle.svelte';
	import Tiptap from '$lib/components/widgets/editor/Tiptap.svelte';
	import SpinLoader from '$lib/components/widgets/SpinLoader.svelte';
	import ProductDialog from '../widgets/ProductDialog.svelte';

	const categories = getContext('categories') as iCategory[];
	const allSizes = getContext('sizes') as iSize[];
	const allProducts = getContext('products') as iProduct[];

	interface Props {
		product?: iProduct;
	}

	let { product }: Props = $props();

	const title = $state(product ? 'Edit product' : 'Create product');
	const description = $state(product ? 'Edit a product' : 'Add a new product');
	const toastMessage = $state(product ? 'Product updated' : 'Product created');
	const action = $state(product ? 'Save changes' : 'Create');
	const extractSizes = (category: string) =>
		allSizes.filter((size) => (size.category as iCategory).name === category);

	let name = $state(product?.name || '');
	let desc = $state(product?.description || '');
	let stock = $state(product?.stock || 0);
	let price = $state(product?.price || '');
	let oldPrice = $state(product?.oldPrice || '');
	let isFeatured = $state(product?.isFeatured || false);
	let isArchived = $state(product?.isArchived || false);
	let images = $state(product?.images || []);
	let selectedCategory = $state(product?.category);
	let sizes = $state(product?.sizes || []);
	let next = $state(product?.next);

	let loading = $state(false);

	const getInitialSizes = () => {
		let initial = selectedCategory ? extractSizes((selectedCategory as iCategory).name) : [];
		initial = ([...initial] as iSize[]).map((initialSize: iSize) => {
			let newSize = { ...initialSize };
			const isSelected = sizes.includes(newSize.value);
			if (isSelected) {
				newSize.dirty = true;
				return newSize;
			}
			return initialSize;
		});
		return initial;
	};

	let categorySizes: Writable<iSize[]> = writable(getInitialSizes());
	let colors = $state(product?.colors || []);

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);

		const entries = Object.fromEntries(formData.entries());

		if (!selectedCategory) {
			toast.error('Category is required');
			return;
		}
		const isTrueOrFalse = (flag: 'on' | 'off') => {
			return flag === 'on' ? true : false;
		};

		const partialProduct: Partial<iProduct> = {
			name: entries.name as string,
			description: desc,
			price: Number(entries.price),
			oldPrice: Number(entries.oldPrice),
			stock: Number(entries.stock),
			sku: `SKU${Date.now()}`,
			isFeatured: isTrueOrFalse(entries.featured as unknown as 'on' | 'off'),
			isArchived: isTrueOrFalse(entries.archived as unknown as 'on' | 'off'),
			images: (images as iImage[]).map((image) => image.xata_id as string),
			category: (selectedCategory as iCategory).xata_id,
			colors,
			sizes,
			next: next ? (next as iProduct).xata_id : undefined,
			thumbnail: (images[0] as iImage).xata_id
		};

		try {
			loading = true;
			let response: Response;

			if (product) {
				const options: RequestInit = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialProduct)
				};
				const url = `/api/products/${product.xata_id}`;

				response = await fetch(url, options);
			} else {
				const options: RequestInit = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialProduct)
				};
				const url = `/api/products`;
				response = await fetch(url, options);
			}

			const { message, status } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				location.href = `/admin/products`;
				toast.success(toastMessage);
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};

	const oncomplete = (response: any) => {
		const imgs = response.successful.map((item: any) => ({
			fileId: item.response.body.fileId,
			xata_id: item.response.body.xata_id,
			url: item.response.body.url
		}));

		images = [...images, ...imgs];
	};

	const getcontent = (content: string) => {
		desc = content;
	};

	const onCategorySelect = (category: iCategory) => {
		selectedCategory = category;
		$categorySizes = extractSizes(category.name);
	};

	const getColor = (color: string) => {
		if (!colors.includes(color)) {
			colors = [...colors, color];
		}
	};

	const removeColor = (color: string) => (colors = colors.filter((cl) => cl !== color));

	const getsizes = (selected: string[]) => {
		sizes = selected;
	};

	const onselect = (product: iProduct) => {
		next = product;
	};

	$effect(() => console.log({ product, images }));

	const nextProducts = allProducts.filter((pr) => {
		if (product) {
			return (pr.category as iCategory).name === (selectedCategory as iCategory).name && pr.xata_id !== product.xata_id
		}
		return (pr.category as iCategory).name === (selectedCategory as iCategory).name
	});
</script>

<div class="flex items-center justify-between">
	<Heading class="text-start" {title} {description} />
	<div class="space-x-2">
		<Button href="/admin/products/new" size="icon">
			<PlusIcon class="size-4" />
		</Button>
		{#if product}
			<AlertDialog
				name={`${product.name} product`}
				onconfirm={() => deleteProductApi(product)}
				disabled={loading}
			>
				<Trash2Icon class="size-4" />
			</AlertDialog>
		{/if}
	</div>
</div>
<Separator />
<form {onsubmit} class="flex flex-col gap-4">
	<div>
		<Label for="name" class="text-muted-foreground">Name of the product</Label>
		<Input
			id="name"
			disabled={loading}
			required
			placeholder="Product name"
			name="name"
			bind:value={name}
			class={removeRingClasses()}
		/>
	</div>
	<div>
		<Label for="category" class="text-muted-foreground">Category of the product</Label>
		<CategorySelect
			selectedCategory={selectedCategory as iCategory}
			{onCategorySelect}
			{categories}
		/>
	</div>
	<div>
		<Label for="stock" class="text-muted-foreground">Stock (How many units do you have?)</Label>
		<Input disabled={loading} placeholder="1" required name="stock" bind:value={stock} />
	</div>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<div>
			<Label for="price" class="text-muted-foreground">Price</Label>
			<Currency required name="price" bind:value={price} currency="naira" />
		</div>
		<div>
			<Label for="oldPrice" class="text-muted-foreground">Old Price</Label>
			<Currency required name="oldPrice" bind:value={oldPrice} currency="naira" />
		</div>
	</div>
	{#if selectedCategory}
		<div>
			<Label for="name" class="text-muted-foreground">Next product in the same category</Label>
			<div class="flex items-center gap-2">
				{#if next}
					<div class="size-32">
						{#key next}
							<ProductCardSmallNoTitle product={next as iProduct} />
						{/key}
					</div>
					<ProductDialog
						{onselect}
						products={allProducts.filter(
							(pr) => (pr.category as iCategory).name === (selectedCategory as iCategory).name
						)}
						class="interactive flex aspect-square size-32 h-auto items-center justify-center hover:bg-transparent"
					>
						<PackagePlusIcon class="!size-14" />
					</ProductDialog>
				{:else}
					<ProductDialog
						{onselect}
						products={nextProducts}
						class="interactive flex aspect-square size-32 h-auto items-center justify-center hover:bg-transparent"
					>
						<PackagePlusIcon class="!size-14" />
					</ProductDialog>
				{/if}
			</div>
		</div>
	{/if}
	<div class="flex flex-col gap-2">
		<Label for="sizes" class="text-muted-foreground">Size (s) of the product</Label>
		<Separator />
		<SizeSelect {categorySizes} {getsizes} initialSizes={sizes} />
	</div>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<OnOff
			name="featured"
			bind:checked={isFeatured}
			description="This product will appear on the homepage"
		>
			<MonitorUpIcon class="size-4" />
		</OnOff>
		<OnOff
			name="archived"
			bind:checked={isArchived}
			description="This product will not appear anywhere in the store"
		>
			<ArchiveXIcon class="size-4" />
		</OnOff>
	</div>
	<div class="flex flex-col gap-2">
		<Label for="sizes" class="text-muted-foreground">Color (s) of the product</Label>
		<Separator />
		<div class="flex items-center gap-2">
			<ColorPicker {getColor} />
			{#key colors.length}
				{#each colors as color, i}
					<Button
						size="icon"
						variant="ghost"
						style={`background-color: ${color}`}
						class="gap-0.5 rounded-full capitalize"
						onclick={() => removeColor(color)}
					>
						<XIcon class="size-3" />
					</Button>
				{/each}
			{/key}
		</div>
	</div>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<ImageWidget
			id={product?.xata_id || ''}
			endpoint="/api/upload/uppy"
			{oncomplete}
			images={images as iImage[]}
		/>
		<Tiptap content={product?.description} title="Product details" {getcontent} />
	</div>
	{#if loading}
		<Button size="icon" class="w-full self-center sm:w-28">
			<SpinLoader />
		</Button>
	{:else}
		<Button type="submit" class="w-full self-center sm:w-fit">{action}</Button>
	{/if}
</form>
