<script lang="ts">
	import type { iCategory, iImage } from '$lib/interface';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash2Icon } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { removeRingClasses, type iResult } from '@toolsntuts/utils';
	import { Label } from '$lib/components/ui/label';
	import { SpinLoader } from '@toolsntuts/svelte-components';
	import { toast } from 'svelte-sonner';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { deleteCategoryApi } from '$lib/api-utils';
	import ImageWidget from '../widgets/images/ImageWidget.svelte';

	interface Props {
		category?: iCategory;
	}

	let { category }: Props = $props();

	const title = $state(category ? 'Edit category' : 'Create category');
	const description = $state(category ? 'Edit a category' : 'Add a new category');
	const toastMessage = $state(category ? 'Category updated' : 'Category created');
	const action = $state(category ? 'Save changes' : 'Create');

	let name = $state(category?.name || '');
	let banner = $state(category?.banner);
	let thumbnail = $state(category?.thumbnail);

	let loading = $state(false);

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);

		const entries = Object.fromEntries(formData.entries());

		try {
			loading = true;
			let response: Response;

			const partialCategory: Partial<iCategory> = {
				name: entries.name as string,
			};

			if (banner) {
				partialCategory.banner = (banner as iImage).xata_id
			}

			if (category) {
				const options: RequestInit = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialCategory)
				};
				const url = `/api/categories/${category.xata_id}`;

				response = await fetch(url, options);
			} else {
				const options: RequestInit = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialCategory)
				};
				const url = `/api/categories`;
				response = await fetch(url, options);
			}

			const { message, status, data } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				location.reload()
				toast.success(toastMessage);
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};

	const onBannerComplete = (response: any) => {
		const ids = response.successful.map((item: any) => item.response.body.xata_id);
		console.log({ response, from: 'oncomplete' });

		const imgs = response.successful.map((item: any) => ({
			fileId: item.response.body.fileId,
			xata_id: item.response.body.xata_id,
			url: item.response.body.url
		}));

		banner = imgs[0];
	};
	const onThumbnailComplete = (record: any) => {
		console.log({ record, from: 'oncomplete' });
	};
</script>

<div class="flex items-center justify-between">
	<Heading class="text-start" {title} {description} />
	{#if category}
		<AlertDialog
			name={`${category.name} category`}
			onconfirm={() => deleteCategoryApi(category)}
			disabled={loading}
		>
			<Trash2Icon class="size-4" />
		</AlertDialog>
	{/if}
</div>
<Separator />
<form {onsubmit} class="w-full space-y-4">
	<div class="grid grid-cols-1 gap-4">
		<div>
			<Label for="name">Name</Label>
			<Input
				id="name"
				disabled={loading}
				required
				placeholder="Category name"
				name="name"
				bind:value={name}
				class={removeRingClasses()}
			/>
		</div>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="relative">
				<Label for="banner">Banner</Label>
				{#key banner}
					<ImageWidget
						id={category?.xata_id || ''}
						name="banner"
						endpoint="/api/upload/homepage"
						height={`100%`}
						oncomplete={onBannerComplete}
						images={banner ? [banner as iImage] : []}
						singleFile={true}
					/>
				{/key}
			</div>
		</div>
	</div>
	{#if loading}
		<Button size="icon">
			<SpinLoader class="!border-white dark:!border-primary" />
		</Button>
	{:else}
		<Button type="submit">{action}</Button>
	{/if}
</form>
