<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { getStyle } from '@toolsntuts/utils';

	const left = '/sneakers.webp?w=480;1024;1920&format=webp&as=srcset';
	const right = '/wristwatch.webp?w=480;1024;1920&format=webp&as=srcset';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();

	const leftStyle = getStyle(left);
	const rightStyle = getStyle(right);
</script>

<div class={cn('relative hidden grid-cols-2 overflow-hidden dark:bg-secondary md:grid', className)}>
	<Button
		aria-label="Sneakers banner"
		href="/catalog/?search=sneakers"
		variant="ghost"
		class="relative aspect-video h-auto w-full hover:bg-transparent"
	>
		<div
			class="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
			style={leftStyle}
		></div>
		<!-- <img
			srcset={left}
			fetchpriority="high"
			sizes="(max-width: 640px) 480px, (max-width: 1024px) 1024px, 1920px"
			alt="Deal Banner"
			loading="eager"
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
		/> -->
	</Button>
	<Button
		href="/catalog"
		aria-label="Watches banner"
		variant="ghost"
		class="relative aspect-video h-auto w-full hover:bg-transparent"
	>
		<div
			class="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
			style={rightStyle}
		></div>
		<!-- <img
			srcset={right}
			fetchpriority="high"
			sizes="(max-width: 640px) 480px, (max-width: 1024px) 1024px, 1920px"
			alt="Wristwatches"
			loading="eager"
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
		/> -->
	</Button>
</div>

<Button
	href="/catalog"
	variant="ghost"
	class={cn('relative aspect-video size-full h-auto hover:bg-transparent md:hidden', className)}
>
	<div
		class="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
		aria-label="Watches banner"
		style={rightStyle}
	></div>
	<!-- <img
		srcset={right}
		fetchpriority="high"
		sizes="(max-width: 640px) 480px, (max-width: 1024px) 1024px, 1920px"
		alt="Wristwatches"
		loading="eager"
		class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
	/> -->
</Button>
