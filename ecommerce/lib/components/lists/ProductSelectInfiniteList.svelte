<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { iProduct } from '$lib/interface';
	import { ScrollArea } from '../ui/scroll-area';
	import ProductCardSmall from '../cards/ProductCardSmall.svelte';

	interface Props {
		list: iProduct[];
		maxScrollItems?: number;
		class?: string;
		onselect: (selected: iProduct) => void;
	}

	let { list, maxScrollItems = 12, class: className, onselect }: Props = $props();

	let listRef: HTMLElement;
	let observer: IntersectionObserver;

	let listStore: Writable<any[]> = writable([]);

	const loadMore = () => {
		const lastIdx = $listStore.length;
		const endIdx = lastIdx + maxScrollItems;
		return list.slice(lastIdx, endIdx);
	};

	const observation = (entries: IntersectionObserverEntry[]) => {
		const entry = entries[0];
		if (!entry.isIntersecting) return;

		$listStore = [...$listStore, ...loadMore()];
	};

	$effect(() => {
		$listStore = list.slice(0, maxScrollItems);
	});

	$effect(() => {
		observer && observer.observe(listRef);
	});

	const initObserver = () => {
		const options = { threshold: 0.8 };
		observer = new IntersectionObserver(observation, options);
		observer.observe(listRef);
	};

	onMount(() => {
		initObserver();
	});

	onDestroy(() => {
		observer && observer.unobserve(listRef);
	});
</script>

<ScrollArea class="h-96">
	<div class={className}>
		{#each $listStore as product, i}
			<ProductCardSmall {product} {onselect} />
		{/each}
		<div bind:this={listRef}></div>
	</div>
</ScrollArea>
