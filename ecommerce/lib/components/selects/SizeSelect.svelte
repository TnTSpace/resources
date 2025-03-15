<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Card } from '$lib/components/ui/card';
	import type { Writable } from 'svelte/store';
	import type { iSize } from '$lib/interface';
	import { Button } from '$lib/components/ui/button';
	import { ChevronsRightIcon } from 'lucide-svelte';
	import { ScrollArea } from '../ui/scroll-area';

	interface Props {
		categorySizes: Writable<iSize[]>;
		getsizes: (sizes: string[]) => void;
		initialSizes: string[];
	}

	let { categorySizes, initialSizes, getsizes }: Props = $props();

	let addedSizes = $state(initialSizes);
	let firstSize = $derived(addedSizes[0])

	const addSize = (size: iSize) => {
		$categorySizes.forEach((sz) => {
			if (sz.xata_id === size.xata_id) {
				sz.dirty = true;
			}
		});
		if (!addedSizes.includes(size.value)) {
			addedSizes.push(size.value);

			getsizes([...addedSizes]);
		}
	};

	const removeSize = (size: iSize) => {
		$categorySizes.forEach((sz) => {
			if (sz.xata_id === size.xata_id) {
				sz.dirty = false;
			}
		});
		if (addedSizes.includes(size.value)) {
			addedSizes = addedSizes.filter((sz) => sz !== size.value);
			getsizes(addedSizes);
		}
	};

	$effect(() => {
		const exists = $categorySizes.find(sz => sz.value === firstSize)
		if (!exists) {
			addedSizes = []
		}
	})

</script>

<div class="grid grid-cols-[1fr_16px_1fr] items-stretch gap-4">
	<div class="flex flex-col gap-2">
		<Label for="sizes" class="text-muted-foreground">Add size</Label>
		<ScrollArea class="h-64 border-2 dark:border-muted-foreground/50 rounded-lg">
			<Card class="flex flex-col bg-background rounded-none">
				{#key addedSizes.length}
					{#each $categorySizes as size, i}
						{#if !size.dirty}
							<Button
								class="border-x-0 border-t-0 rounded-none first:rounded-t-lg"
								size="sm"
								variant="outline"
								onclick={() => addSize(size)}>{size.name}</Button
							>
						{/if}
					{/each}
				{/key}
			</Card>
		</ScrollArea>
	</div>
	<ChevronsRightIcon class="size-4 place-self-center" />
	<div class="flex flex-col gap-2">
		<Label for="sizes" class="text-muted-foreground">Remove size</Label>
		<ScrollArea class="h-64 border-2 dark:border-muted-foreground/50 rounded-lg">
			<Card class="flex flex-col bg-background h-full">
				{#key addedSizes.length}
					{#each $categorySizes as size, i}
						{#if size.dirty}
							<Button
								class="border-x-0 border-t-0 rounded-none first:rounded-t-lg"
								variant="outline"
								size="sm"
								onclick={() => removeSize(size)}>{size.name}</Button
							>
						{/if}
					{/each}
				{/key}
			</Card>
		</ScrollArea>
	</div>
</div>
