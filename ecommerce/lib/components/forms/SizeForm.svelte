<script lang="ts">
	import type { iCategory, iSize } from '$lib/interface';
	import { getContext } from 'svelte';
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
	import { deleteSizeApi } from '$lib/api-utils'; 
	import { page } from '$app/state';
	import Select from '../widgets/Select.svelte';

	const categories = getContext("categories") as iCategory[]

	interface Props {
		size: iSize | null;
	}

	let { size }: Props = $props();

	const options = categories.map(category => ({ label: category.name, value: category.xata_id }))

	const title = $state(size ? 'Edit size' : 'Create size');
	const description = $state(size ? 'Edit a size' : 'Add a new size');
	const toastMessage = $state(size ? 'Size updated' : 'Size created');
	const action = $state(size ? 'Save changes' : 'Create');

	let name = $state(size?.name || '');
	let value = $state(size?.value || '');
	let category = $state((size?.category as iCategory).xata_id || '')

	let loading = $state(false);

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);

		const entries = Object.fromEntries(formData.entries());

		if (!entries.category) {
			return toast.error("Category is required")
		}

		try {
			loading = true;
			let response: Response;

			const partialsize: Partial<iSize> = {
				name: entries.name as string,
				value: entries.value as string,
				category: entries.category as string
			};

			if (size) {
				const options: RequestInit = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialsize)
				};
				const url = `/api/sizes/${size.xata_id}`;

				response = await fetch(url, options);
			} else {
				const options: RequestInit = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialsize)
				};
				const url = `/api/sizes`;
				response = await fetch(url, options);
			}

			const { message, status } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				const isThisSizePage = page.url.pathname.includes('/sizes');
				if (isThisSizePage) {
					location.href = `/admin/sizes`;
				} else {
					location.reload();
				}
				toast.success(toastMessage);
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};
</script>

<div class="flex items-center justify-between">
	<Heading class="text-start" {title} {description} />
	{#if size}
		<AlertDialog
			name={`${size.name} size`}
			onconfirm={() => deleteSizeApi(size)}
			disabled={loading}
		>
			<Trash2Icon class="size-4" />
		</AlertDialog>
	{/if}
</div>
<Separator />
<form {onsubmit} class="w-full space-y-4">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		<div>
			<Label for="name">Name</Label>
			<Input
				id="name"
				disabled={loading}
				required
				placeholder="E.g. Size 32, Small"
				name="name"
				bind:value={name}
				class={removeRingClasses()}
			/>
		</div>
		<div>
			<Label for="name">Value</Label>
			<Input
				id="value"
				disabled={loading}
				required
				placeholder="E.g. 32, S"
				name="value"
				bind:value
				class={removeRingClasses()}
			/>
		</div>
		<div>
			<Label for="name">Category</Label>
			<Select initialValue={category} {options} type="single" name="category" />
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
