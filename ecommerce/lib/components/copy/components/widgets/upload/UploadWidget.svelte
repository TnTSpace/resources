<script lang="ts">
	import type { iUpload } from '../../../interface/index.js';
	import { toast } from 'svelte-sonner';
	import UploadPreview from './UploadPreview.svelte';
	import UppyUploader from './UppyUploader.svelte';
	import type { iResult } from '@toolsntuts/utils';

	interface Props {
		uploads: iUpload[];
		oncomplete: (record: any) => void;
		endpoint: string;
		id: string;
		singleFile?: boolean;
		width?: string;
		height?: string;
		name?: string;
	}

	let {
		uploads = $bindable(),
		oncomplete,
		endpoint,
		id,
		singleFile,
		width,
		height,
		name
	}: Props = $props();

	const ondelete = async (upload: iUpload) => {
		const formData = new FormData();
		formData.set('fileId', upload.fileId);
		formData.set('url', upload.url);
		formData.set('xata_id', upload.id);
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
				uploads = uploads.filter((up) => up.id !== upload.id);
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};
</script>

<div class="flex flex-col gap-4">
	<UppyUploader {name} {width} {height} {singleFile} {id} {oncomplete} {endpoint} />
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
		{#key uploads.length}
			{#each uploads as upload, i}
				<UploadPreview {upload} ondelete={() => ondelete(upload)} />
			{/each}
		{/key}
	</div>
</div>
