<script lang="ts">
	import type { iColor } from '$lib/interface';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash2Icon } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { removeRingClasses, type iResult } from '@toolsntuts/utils';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { deleteColorApi } from '$lib/api-utils';
	import { page } from '$app/state';
	import SpinLoader from '../widgets/SpinLoader.svelte';

	interface Props {
		color: iColor | null;
	}

	let { color }: Props = $props();

	const title = $state(color ? 'Edit color' : 'Create color');
	const description = $state(color ? 'Edit a color' : 'Add a new color');
	const toastMessage = $state(color ? 'Color updated' : 'Color created');
	const action = $state(color ? 'Save changes' : 'Create');

	let name = $state(color?.name || '');
	let value = $state(color?.value || '');

	let loading = $state(false);

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);

		const entries = Object.fromEntries(formData.entries());

		try {
			loading = true;
			let response: Response;

			const partialColor: Partial<iColor> = {
				name: entries.name as string,
				value: entries.value as string
			};

			if (color) {
				const options: RequestInit = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialColor)
				};
				const url = `/api/colors/${color.xata_id}`;

				response = await fetch(url, options);
			} else {
				const options: RequestInit = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialColor)
				};
				const url = `/api/colors`;
				response = await fetch(url, options);
			}

			const { message, status } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				const isThisColorsPage = page.url.pathname.includes('/colors');
				if (isThisColorsPage) {
					location.href = `/admin/colors`;
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
	{#if color}
		<AlertDialog
			name={`${color.name} color`}
			onconfirm={() => deleteColorApi(color)}
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
				placeholder="Color name"
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
				placeholder="Color value"
				type="color"
				name="value"
				bind:value
				class={removeRingClasses()}
			/>
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
