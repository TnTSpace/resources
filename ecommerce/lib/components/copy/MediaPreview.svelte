<script lang="ts">
	import { mediaUrlFormat } from '@toolsntuts/utils';
	import { cn } from '../../utils.js';
	import { audioPreviewableFormats, iframePreviewableFormats, imagePreviewableFormats } from './components/utils/index.js';

	export let className: string = '';
	export let url: string = '';
	export let title: string = '';
	export let href: string = '#';

	const format = mediaUrlFormat(url);
</script>

{#if imagePreviewableFormats.includes(format.toLowerCase())}
	<a {href}>
		<img
			class={cn('aspect-auto w-full rounded-lg object-cover', className)}
			src={url}
			alt={title}
		/>
	</a>
{:else if iframePreviewableFormats.includes(format.toLowerCase())}
	<iframe
		class={cn('aspect-video w-full rounded-lg object-cover', className)}
		src={url}
		frameborder="0"
		{title}
	></iframe>
{:else if audioPreviewableFormats.includes(format.toLowerCase())}
	<audio controls preload="metadata" class={cn('w-full rounded-lg', className)}>
		<source src={url} type="audio/{format}" /> Your browser does not support the audio element.
	</audio>
{/if}
