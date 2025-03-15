<script lang="ts">
	import { useImageUpload } from '$lib/hooks/use-image-upload.svelte';
	import type { iImage } from '$lib/interface';
	import { SpinLoader } from '@toolsntuts/svelte-components';
	import { XIcon } from 'lucide-svelte';
	import { writable } from 'svelte/store';

	interface Props {
		image: iImage;
		ondelete: () => void;
	}

	let { image, ondelete }: Props = $props();

	let loading = $state(false);

	const bannerImageHandler = useImageUpload({ initialImage: image.url });

	let urlStore = writable(bannerImageHandler.previewUrl as string);

	$effect(() => {
		$urlStore = bannerImageHandler.previewUrl as string;
	});

	const onRemove = async () => {
		loading = true;
		await ondelete();
		loading = false;
		bannerImageHandler.handleRemove();
	};
</script>

<div class="aspect-auto">
	{@render banner()}
</div>

{#snippet banner()}
	<div class="w-full aspect-square max-w-[300px]">
		<div
			class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-muted"
		>
			{#if bannerImageHandler.previewUrl}
				<img
					class="size-full object-cover"
					src={bannerImageHandler.previewUrl}
					alt={bannerImageHandler.fileName
						? 'Preview of uploaded image'
						: 'Default profile background'}
				/>
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
