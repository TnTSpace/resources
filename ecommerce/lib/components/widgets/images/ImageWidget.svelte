<script lang="ts">
	import type { iImage } from '$lib/interface';
	import { toast } from 'svelte-sonner';
	import ImagePreview from './ImagePreview.svelte';
	import UppyUploader from './UppyUploader.svelte';
	import type { iResult } from '@toolsntuts/utils';

	interface Props {
		images: iImage[];
		oncomplete: (record: any) => void;
		endpoint: string;
		id: string;
		singleFile?: boolean;
		width?: string;
		height?: string;
		name?: string;
	}

	let { images = $bindable(), oncomplete, endpoint, id, singleFile, width, height, name }: Props = $props();

	const ondelete = async (image: iImage) => {
		const formData = new FormData();
		formData.set('fileId', image.fileId);
		formData.set('url', image.url);
		formData.set('xata_id', image.xata_id);
		try {
			const options: RequestInit = {
				method: 'DELETE',
				body: formData
			};
			const response = await fetch(endpoint, options);
			const result = (await response.json()) as iResult;

			if (result.status === 'error') {
				toast.error(result.message);
			} else {
				images = images.filter((img) => img.xata_id !== image.xata_id);
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};
</script>

<div class="flex flex-col gap-4">
	<UppyUploader {name} {width} {height} {singleFile} {id} {oncomplete} {endpoint} />
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
		{#key images.length}
			{#each images as image, i}
				<ImagePreview {image} ondelete={() => ondelete(image)} />
			{/each}
		{/key}
	</div>
</div>
