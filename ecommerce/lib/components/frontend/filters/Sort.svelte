<script lang="ts">
	import { page } from '$app/state';
	import { Label } from '$lib/components/ui/label';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group/index.js';
	import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon } from 'lucide-svelte';

	let options = [
		{
			title: 'Price',
			direction: 'High to Low',
			description: 'Sorts the products by price from the most to least expensive',
			Icon: ArrowDownWideNarrowIcon,
			value: 'price_desc'
		},
		{
			title: 'Price',
			direction: 'Low to High',
			description: 'Sorts the products by price from the least to most expensive',
			Icon: ArrowDownNarrowWideIcon,
			value: 'price_asc'
		}
	];
  
	const sort = page.url.searchParams.get('sort');

	let value = $state(sort ? sort : '')

	const onValueChange = (value: any) => {
		page.url.searchParams.set('sort', value)
		location.href = page.url.href
	}
</script>

<div class="flex flex-col gap-1">
	<Label class="text-sm uppercase text-muted-foreground">Sort By:</Label>
	<RadioGroup class="gap-2" bind:value {onValueChange}>
		{#each options as item, i}
			<div
				class="relative flex w-full items-start gap-2 rounded-lg border-2 border-input p-2 shadow-sm shadow-black/[.04] has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:text-primary"
			>
				<RadioGroupItem
					value={item.value}
					id={item.value}
					aria-describedby={`${item.value}-description`}
					class="order-1 after:absolute after:inset-0"
				/>
				<div class="flex grow items-center gap-3">
					<item.Icon class="size-10" />
					<div class="grid grow gap-2">
						<Label for={item.value}>
							{item.title}
							<span class="text-xs font-normal leading-[inherit] text-muted-foreground">
								({item.direction})
							</span>
						</Label>
						<p id={`${item.value}-description`} class="text-xs text-muted-foreground">
							{item.description}
						</p>
					</div>
				</div>
			</div>
		{/each}
	</RadioGroup>
</div>
