<script lang="ts">
	import { Button } from '../ui/button';
	import { Skeleton } from '../ui/skeleton';
	import { ScrollArea } from '../ui/scroll-area';
</script>

<ScrollArea orientation="horizontal" class="px-4 md:px-0">
	<div class="flex gap-2 overflow-x-auto">
		{#each [1, 2, 3, 4, 5, 6] as _, i}
			<Skeleton class="h-10 w-24 rounded-full" />
		{/each}
	</div>
</ScrollArea>
