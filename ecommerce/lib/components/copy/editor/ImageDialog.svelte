<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import CloudinaryApiFileUpload from '../CloudinaryApiFileUpload.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		onUpload: (media: any) => void;
		onDelete: () => void;
		title?: string;
	}

	let {
		children,
		onUpload,
		onDelete,
		title = 'Upload your file or paste url',
	}: Props = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger type="button" class={buttonVariants({ variant: 'ghost' })}>{@render children()}</Dialog.Trigger>
	<Dialog.Content class="w-[calc(100%-32px)] mx-auto p-4 rounded-lg">
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
		</Dialog.Header>
		<CloudinaryApiFileUpload {onUpload} {onDelete} folder="" />
	</Dialog.Content>
</Dialog.Root>
