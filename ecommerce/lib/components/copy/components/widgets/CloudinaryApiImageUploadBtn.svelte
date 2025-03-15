<script lang="ts">
	import { Button, buttonVariants } from '../ui/button/index.js';
	import type { iCloudinaryInfo, iMedia, iStatus, TUpload } from '../../interface/index.js';
	// @ts-ignore
	import { CloudUploadIcon, TrashIcon } from 'lucide-svelte';
	import SpinLoader from './SpinLoader.svelte';
	import { toast } from 'svelte-sonner';

	import MediaPreview from './MediaPreview.svelte';
	import { Card } from '../ui/card/index.js';
	import { cn } from '../../utils.js';
	import { UploadType } from '../../constants/index.js';

	interface Props {
		media?: iMedia;
		folder: string;
		class?: string;
		subline?: string
		cloudinaryApi?: string;
		spinnerClass?: string;
		onUpload: (media: iMedia) => void;
		onDelete: (media: iMedia) => void;
	}

	let button: HTMLButtonElement | undefined = $state();

	let {
		media,
		folder = '',
		onUpload,
		onDelete,
		subline,
		class: className,
		spinnerClass,
		cloudinaryApi
	}: Props = $props();
	let showWidget = $state(!media);
	let loading = $state(false);

	const onSubmit = async (evt: SubmitEvent, type: TUpload) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		formData.append('folder', folder);
		formData.append('type', type);

		try {
			loading = true;

			const options: RequestInit = { method: 'post', body: formData };

			const url = cloudinaryApi ? cloudinaryApi : `/api/cloudinary`;
			const response = await fetch(url, options);
			const { message, status, data } = (await response.json()) as iStatus;

			if (status === 'error') {
				toast.error(message);
				return;
			}

			const info = data as iCloudinaryInfo;
			media = {
				public_id: info.public_id,
				resource_type: info.resource_type,
				secure_url: info.secure_url,
				type: info.type
			};

			onUpload(media);

			showWidget = false;
			loading = false;
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};

	const removeMedia = async () => {
		try {
			loading = true;
			const options: RequestInit = {
				method: 'delete',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					public_id: (media as iMedia).public_id,
					type: (media as iMedia).type,
					resource_type: (media as iMedia).resource_type,
					secure_url: (media as iMedia).secure_url
				})
			};

			const url = cloudinaryApi ? cloudinaryApi : `/api/cloudinary`;
			const response = await fetch(url, options);
			const { status, message } = (await response.json()) as iStatus;

			status === 'error' && toast.error(message);

			onDelete(media as iMedia);
			showWidget = true;
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};

	const onChange = () => button?.click();
</script>

{#if showWidget}
	<Card
		class={cn(
			'bg-secondary/30 dark:bg-secondary relative flex aspect-video w-full items-center justify-center bg-white p-4',
			className
		)}
	>
		{#if loading}
			<SpinLoader class={cn('border-primary dark:border-white', spinnerClass)} />
		{:else}
			<div class="flex w-full flex-col items-center gap-2">
				<div class="w-full text-center">
					<div class="flex flex-col items-center gap-2">
						<form onsubmit={(evt) => onSubmit(evt, UploadType.UPLOAD)}>
							<input
								type="file"
								id="upload"
								onchange={onChange}
								name="file"
								accept="image/*"
								class="hidden"
							/>
							<label
								for="upload"
								class={cn(
									'flex cursor-pointer items-center gap-2',
									buttonVariants({ variant: 'outline' })
								)}
							>
								<CloudUploadIcon class="size-4" />
								<span>Upload image</span>
							</label>
							<button type="submit" bind:this={button} aria-label="Submit"></button>
						</form>
						<hr/>
						<!-- <form
							onsubmit={(evt) => onSubmit(evt, UploadType.URL)}
							class="grid grid-cols-[1fr_40px] items-center gap-1"
						>
							<Input name="url" placeholder="Paste URL" type="text" class=" focus-visible:ring-0 focus-visible:ring-offset-0 dark:focus-visible:ring-0" />
							<Button size="icon" type="submit" variant="outline">
								<ArrowRightIcon class="size-4" />
							</Button>
						</form> -->
					</div>
					<span class="text-muted-foreground mx-auto max-w-[300px] whitespace-pre-wrap text-sm"
						>{subline ? subline : 'Image must be less than 1.5MB in size'}</span
					>
				</div>
			</div>
		{/if}
	</Card>
{:else}
	<Card class="dark:bg-secondary relative w-full overflow-hidden rounded-lg bg-white">
		{#if loading}
			<Button
				size="icon"
				variant="outline"
				class="pointer-events-none absolute right-0 top-0 rounded-full"
			>
				<SpinLoader class={cn('border-red-500 dark:border-white', spinnerClass)} />
			</Button>
		{:else}
			<Button
				onclick={removeMedia}
				size="icon"
				variant="outline"
				class="absolute right-0 top-0 rounded-full "
			>
				<TrashIcon class="h-4 w-4 stroke-red-500" />
			</Button>
		{/if}
		<MediaPreview title={media?.public_id} url={media?.secure_url} class="aspect-video" />
	</Card>
{/if}
