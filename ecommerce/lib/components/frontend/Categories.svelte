<script lang="ts">
	import { Button } from '../ui/button';
	import type { iCategory } from '$lib/interface';
	import { ScrollArea } from '../ui/scroll-area';

	interface Props {
		categories: iCategory[]
	}

	let { categories }: Props = $props()

</script>


<ScrollArea orientation="horizontal" class="px-4 md:px-0">
	<div class="flex gap-2 overflow-x-auto">
		{#each categories as category, i}
			<Button href={`/catalog/?category=${category.name.toLowerCase()}`} class="dark:bg-secondary rounded-full" variant="outline">
				<span class="text-sm">{category.name}</span>
			</Button>
		{/each}
	</div>
</ScrollArea>
