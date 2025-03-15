<script lang="ts">
	import type { iShipping, iImage } from '$lib/interface';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash2Icon } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { removeRingClasses, type iResult } from '@toolsntuts/utils';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import AlertDialog from '$lib/components/widgets/AlertDialog.svelte';
	import { deleteShippingApi } from '$lib/api-utils';
	import { Textarea } from '$lib/components/ui/textarea';
	import { cn } from '$lib/utils';
	import SpinLoader from '$lib/components/widgets/SpinLoader.svelte';

	interface Props {
		shipping?: iShipping;
	}

	let { shipping }: Props = $props();

	const title = $state(shipping ? 'Edit shipping' : 'Create shipping');
	const description = $state(shipping ? 'Edit a shipping' : 'Add a new shipping');
	const toastMessage = $state(shipping ? 'Shipping updated' : 'Shipping created');
	const action = $state(shipping ? 'Save changes' : 'Create');

	let shippingLocation = $state(shipping?.location || '');
	let standard = $state(shipping?.standard || 0);
	let standardNote = $state(shipping?.standardNote || '');
	let country = $state(shipping?.country || '');
	let shippingState = $state(shipping?.state || '');
	let express = $state(shipping?.express || 0);
	let expressNote = $state(shipping?.expressNote || '');
	let miscellaneous = $state(shipping?.miscellaneous || 0);

	let loading = $state(false);

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);

		const entries = Object.fromEntries(formData.entries());

		try {
			loading = true;
			let response: Response;

			const partialShipping: Partial<iShipping> = {
				country: entries.country as string,
				state: entries.state as string,
				location: entries.location as string,
				express: Number(entries.express),
				expressNote: entries.expressNote as string,
				standard: Number(entries.standard),
				standardNote: entries.standardNote as string,
				miscellaneous: Number(entries.miscellaneous)
			};

			if (shipping) {
				const options: RequestInit = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialShipping)
				};
				const url = `/api/shippings/${shipping.xata_id}`;

				response = await fetch(url, options);
			} else {
				const options: RequestInit = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialShipping)
				};
				const url = `/api/shippings`;
				response = await fetch(url, options);
			}

			const { message, status } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				location.href = `/admin/shippings`;
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
	{#if shipping}
		<AlertDialog
			name={`${shipping.location} shipping`}
			onconfirm={() => deleteShippingApi(shipping)}
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
			<Label for="country">Country</Label>
			<Input
				id="country"
				disabled={loading}
				required
				placeholder="Shipping country"
				name="country"
				bind:value={country}
				class={removeRingClasses()}
			/>
		</div>
		<div>
			<Label for="state">State</Label>
			<Input
				id="state"
				disabled={loading}
				required
				placeholder="Shipping state"
				name="state"
				bind:value={shippingState}
				class={removeRingClasses()}
			/>
		</div>
		<div>
			<Label for="location">Location(s)</Label>
			<Input
				id="location"
				disabled={loading}
				required
				placeholder="Shipping location(s)"
				name="location"
				bind:value={shippingLocation}
				class={removeRingClasses()}
			/>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-1">
				<Label for="standardNote">Standard</Label>
				<Textarea
					class={cn('resize-none', removeRingClasses())}
					name="standardNote"
					bind:value={standardNote}
					placeholder="How long does it take for standard shipping?"
				></Textarea>
				<Input
					id="standard"
					disabled={loading}
					required
					type="number"
					placeholder="Standard shipping price"
					name="standard"
					bind:value={standard}
					class={removeRingClasses()}
				/>
			</div>
			<div class="space-y-1">
				<Label for="expressNote">Express</Label>
				<Textarea
					class={cn('resize-none', removeRingClasses())}
					name="expressNote"
					bind:value={expressNote}
					placeholder="How long does it take for express shipping?"
				></Textarea>
				<Input
					id="express"
					disabled={loading}
					required
					type="number"
					placeholder="Express shipping price"
					name="express"
					bind:value={express}
					class={removeRingClasses()}
				/>
			</div>
		</div>
		<div>
			<Label for="miscellaneous">Miscellaneous</Label>
			<Input
				id="miscellaneous"
				disabled={loading}
				required
				type="number"
				placeholder="Miscellaneous shipping price"
				name="miscellaneous"
				bind:value={miscellaneous}
				class={removeRingClasses()}
			/>
		</div>
	</div>
	{#if loading}
		<Button size="icon">
			<SpinLoader />
		</Button>
	{:else}
		<Button type="submit">{action}</Button>
	{/if}
</form>
