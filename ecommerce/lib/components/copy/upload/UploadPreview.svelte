<script lang="ts">
	import XIcon from 'lucide-svelte/icons/x';
	import { writable } from 'svelte/store';
	import type { iUpload } from '../../../interface/index.js';
	import { useImageUpload } from '../../../hooks/use-image-upload.svelte.js';
	import SpinLoader from '../SpinLoader.svelte';
	import {
		audioPreviewableFormats,
		iframePreviewableFormats,
		imagePreviewableFormats
	} from '../../../components/utils/index.js';
	import { mediaUrlFormat } from '@toolsntuts/utils';

	interface Props {
		upload: iUpload;
		ondelete: () => void;
	}

	let { upload = $bindable(), ondelete }: Props = $props();

	console.log({ from: 'Preview' });

	let loading = $state(false);

	const uploadHandler = useImageUpload({ initialImage: upload.url });

	let urlStore = writable(uploadHandler.previewUrl as string);

	$effect(() => {
		$urlStore = uploadHandler.previewUrl as string;
	});

	const onRemove = async () => {
		loading = true;
		await ondelete();
		loading = false;
		uploadHandler.handleRemove();
	};

	const format = mediaUrlFormat(upload.url);

</script>

<div class="aspect-auto">
	{@render banner()}
</div>

{#snippet banner()}
	<div class="aspect-square w-full max-w-[300px]">
		<div
			class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-muted"
		>
			{#if uploadHandler.previewUrl}
				<img
					class="size-full object-cover"
					src={uploadHandler.previewUrl}
					alt={uploadHandler.fileName ? 'Preview of uploaded image' : 'Default profile background'}
				/>
				{#if imagePreviewableFormats.includes(format.toLowerCase())}
					<img
						class="size-full object-cover"
						src={uploadHandler.previewUrl}
						alt="preview of uploaded"
					/>
				{:else if iframePreviewableFormats.includes(format.toLowerCase())}
					<iframe
						class="aspect-video w-full rounded-lg object-cover"
						src={uploadHandler.previewUrl}
						frameborder="0"
						title="preview of uploaded file"
					></iframe>
				{:else if audioPreviewableFormats.includes(format.toLowerCase())}
					<audio controls preload="metadata" class="w-full rounded-lg">
						<source src={uploadHandler.previewUrl} type="audio/{format}" /> Your browser does not support
						the audio element.
					</audio>
				{/if}
			{/if}

			<div class="absolute inset-0 flex items-center justify-center gap-2">
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
			</div>
		</div>
	</div>
{/snippet}
