<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { iProduct } from '$lib/interface';
	import ProductCard from '../cards/ProductCard.svelte';
	import ProductCardSkeleton from '../cards/ProductCardSkeleton.svelte';

	interface Props {
		list: iProduct[];
		maxScrollItems?: number;
		class?: string;
	}

	let { list, maxScrollItems = 12, class: className }: Props = $props();

	let listRef: HTMLElement;
	let observer: IntersectionObserver;

	let mounted = $state(false);

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
		mounted = true;
	});

	onDestroy(() => {
		observer && observer.unobserve(listRef);
	});
</script>

<div class={className}>
	{#if mounted}
		{#each $listStore as item, i}
			<ProductCard product={item} />
		{/each}
	{:else}
		{#each [1,2,3,4,5,6] as _, i}
			<ProductCardSkeleton />
		{/each}
	{/if}
	<div bind:this={listRef}></div>
</div>
