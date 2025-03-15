<script lang="ts">
	import { ScrollArea } from '../ui/scroll-area';
  import { Skeleton } from '../ui/skeleton';
	import ProductSkeleton from './ProductSkeleton.svelte';
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between px-4 py-2 bg-white dark:bg-secondary"> 
    <Skeleton class="h-7 w-40" />
    <Skeleton class="h-10 w-[100px]" /> 
	</div>
	<ScrollArea orientation="horizontal" class="pb-4">
		<div class="grid auto-cols-[280px] grid-flow-col gap-4 overflow-x-auto px-4">
			{#each [1,2,3,4,5,6,7,8,9,10] as num, i}
        <ProductSkeleton />
			{/each}
		</div>
	</ScrollArea>
</div>
