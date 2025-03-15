<script lang="ts">
	import { Skeleton } from '../ui/skeleton';
</script>

<div class="flex flex-col overflow-hidden rounded-lg dark:bg-background">
	<Skeleton class="aspect-square w-full rounded-t-lg" />
	<div class="p-2">
		<div class="space-y-1">
			<Skeleton class="h-6 w-full" />
			<Skeleton class="h-6 w-3/4" />
		</div>
		<div class="mt-1 flex items-center gap-2">
      <Skeleton class="h-6 w-16" />
      <Skeleton class="h-6 w-14" />
		</div>
		<div class="flex items-center justify-between">
			<div class="mt-1 flex items-baseline gap-1">
				<div class="flex items-center gap-1 text-sm">
          <Skeleton class="w-10 h-4" />
          <Skeleton class="size-4" />
				</div>
        <Skeleton class="w-16 h-4" />
			</div>
      <Skeleton class="w-16 h-4" />
		</div>
	</div>
	<div class="mt-auto flex items-center justify-between">
		<div class="flex items-center justify-center border-t border-t-muted-foreground/10">
      <Skeleton class="size-10" />
      <Skeleton class="size-10" />
      <Skeleton class="size-10" />
		</div>
    
    <Skeleton class="h-10 w-24" />
	</div>
</div>
