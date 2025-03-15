<script lang="ts">
	import { page } from '$app/state';
	import { buttonVariants } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';

	interface Props {
		colors: string[];
	}

	const urlColors = page.url.searchParams.get('color');

	let selected = $state<string[]>(urlColors ? urlColors.split('--') : []);
	let { colors }: Props = $props();

	const isSelectedColor = (color: string) => selected.includes(color);

	const onOptionSelect = () => {
		if (selected.length) {
			page.url.searchParams.set('color', selected.join('--'));
		} else {
			page.url.searchParams.delete('color');
		}
		location.href = page.url.href;
	};
</script>

<div class="flex flex-col gap-1">
	<Label class="text-sm uppercase text-muted-foreground">Color</Label>
	<div class="grid grid-cols-4 gap-2">
		{#each colors as color, i}
			<label
				class={cn(
					buttonVariants({ size: 'icon', variant: 'ghost' }),
					'mx-2 inline-block size-6 cursor-pointer rounded-full capitalize',
					isSelectedColor(color) && 'ring-2 ring-primary ring-offset-2 dark:ring-white'
				)}
				for={`cb-${i}`}
				style={`background-color: ${color}`}
			>
				<input
					id={`cb-${i}`}
					hidden
					type="checkbox"
					bind:group={selected}
					onchange={onOptionSelect}
					value={color}
				/>
			</label>
		{/each}
	</div>
</div>
