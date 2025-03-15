<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { eProductCardType } from '$lib/constants';
	import { viewStore } from '$lib/stores';
</script>

{#if $viewStore === eProductCardType.LIST}
	<Card
		class="relative flex h-[49vw] max-h-[196px] w-full items-center overflow-hidden rounded-lg bg-background"
	>
		<Skeleton class="h-full w-full max-w-[196px] rounded-none" />
		<div
			aria-label="details"
			class="relative flex h-full w-full flex-col items-center justify-center"
		>
			<div class="flex w-full flex-col gap-2 p-2 md:mb-4">
				<div class="grid grid-cols-[1fr_40px] items-center gap-2">
					<div class="flex flex-col gap-1">
						<Skeleton class="h-5 w-full" />
						<Skeleton class="h-5 w-3/4" />
					</div>
					<Skeleton class="size-10" />
				</div>
				<div aria-label="prices" class="flex items-baseline justify-start gap-2 leading-[1]">
					<Skeleton class="h-6 w-16" />
					<Skeleton class="h-5 w-16" />
				</div>
				<div class="mt-1 flex items-center gap-1">
					<Skeleton class="size-4" />
					<Skeleton class="size-4" />
				</div>
			</div>

			<div
				class="mt-auto flex w-full items-center justify-end border-t border-t-muted-foreground/10"
			>
				<Skeleton class="size-10 rounded-none" />
				<Skeleton class="size-10 rounded-none" />
				<Skeleton class="size-10 rounded-none" />
			</div>
		</div>
	</Card>
{/if}

{#if $viewStore === eProductCardType.GRID}
	<Card class="flex flex-col overflow-hidden rounded-lg dark:bg-background">
		<Skeleton class="aspect-square w-full rounded-t-lg" />
		<div class="flex flex-col space-y-2 p-2">
			<div class="flex flex-col items-start space-y-1">
				<Skeleton class="h-6 w-full" />
				<Skeleton class="h-4 w-[40%]"/> 
			</div>
			<div class="mt-auto">
				<div class="flex items-center gap-1">
					<Skeleton class="h-5 w-[30%]" />
					<Skeleton class="h-5 w-[30%]" />
				</div>
				<div class="flex items-center justify-between">
					<div class="space-y-1">
						<div class="mt-1 flex items-baseline gap-1">
							<div class="flex items-center gap-1 text-sm">
								<Skeleton class="h-4 w-5" />
								<Skeleton class="h-4 w-10" />
							</div>
							<Skeleton class="h-4 w-5" />
						</div>
						<Skeleton class="h-4 w-[30%]" />
					</div>
					<Skeleton class="size-10" />
				</div>
			</div>
		</div>
		<div class="mt-auto flex items-center justify-between">
			<div class="flex items-center justify-center border-t border-t-muted-foreground/10 gap-1">
				<Skeleton class="size-10" />
				<Skeleton class="size-10" />
				<Skeleton class="size-10" />
			</div>
			<div>
				<Skeleton class="h-10 w-[30%]" />
			</div>
		</div>
	</Card>
{/if}
