<script lang="ts">
	import { useImageUpload } from '$lib/hooks/use-image-upload.svelte';
	import { SpinLoader } from '@toolsntuts/svelte-components';
	import { ImagePlusIcon, XIcon } from 'lucide-svelte';
	import { writable } from 'svelte/store';

	interface Props {
		initialImage?: string;
		getFiles: (files: FileList) => void;
		onImageDelete: () => void;
	}

	let { initialImage, getFiles, onImageDelete }: Props = $props();

	let loading = $state(false);

	const bannerImageHandler = useImageUpload({ initialImage });

	let urlStore = writable(bannerImageHandler.previewUrl as string);

	$effect(() => {
		$urlStore = bannerImageHandler.previewUrl as string;
		getFiles(bannerImageHandler.files as FileList);
	});

	const onchange = (evt: Event) => {
		const target = evt.target as HTMLInputElement;
		getFiles(target.files as FileList);
	};

	const onRemove = async () => {
		loading = true;
		await onImageDelete();
		loading = false;
		bannerImageHandler.handleRemove();
	};
</script>

<div class="aspect-auto">
	{@render banner()}
</div>

{#snippet banner()}
	<div class="w-full aspect-video md:h-[315px] max-w-[560px]">
		<div
			class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-muted"
		>
			{#if bannerImageHandler.previewUrl}
				<img
					class="h-full w-full object-cover"
					src={bannerImageHandler.previewUrl}
					alt={bannerImageHandler.fileName
						? 'Preview of uploaded image'
						: 'Default profile background'}
					width={512}
					height={96}
				/>
			{/if}

			<div class="absolute inset-0 flex items-center justify-center gap-2">
				<button
					type="button"
					class="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
					onclick={bannerImageHandler.handleThumbnailClick}
					aria-label={bannerImageHandler ? 'Change image' : 'Upload image'}
				>
					<ImagePlusIcon size={16} stroke-width={2} aria-hidden="true" />
				</button>
				{#if bannerImageHandler.previewUrl}
					{#if loading}
						<button
							type="button"
							class="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
							aria-label="Remove image"
						>
              <SpinLoader />
						</button>
					{:else}
						<button
							type="button"
							class="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
							onclick={onRemove}
							aria-label="Remove image"
						>
							<XIcon size={16} stroke-width={2} aria-hidden="true" />
						</button>
					{/if}
				{/if}
			</div>
		</div>
		<input
			bind:this={bannerImageHandler.fileInput}
			bind:files={bannerImageHandler.files}
			{onchange}
			type="file"
			class="hidden"
			accept="image/*"
			aria-label="Upload image file"
		/>
	</div>
{/snippet}
