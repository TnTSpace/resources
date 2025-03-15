<script lang="ts">
	import { cn } from '$lib/utils';
	import { XIcon } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { Label } from '../ui/label';
	import { ScrollArea } from '../ui/scroll-area';

	interface Props {
		getcolors: (colors: string[]) => void;
		initialColors: string[];
	}

	let { getcolors, initialColors }: Props = $props();

	let colors = $state<string[]>(initialColors);

	const items = [
		{ label: 'Blue', color: 'blue', font: 'white' },
		{ label: 'Indigo', color: 'indigo', font: 'white' },
		{ label: 'Pink', color: 'pink', font: 'black' },
		{ label: 'Red', color: 'red', font: 'white' },
		{ label: 'Orange', color: 'orange', font: 'white' },
		{ label: 'Yellow', color: 'yellow', font: 'black' },
		{ label: 'Green', color: 'green', font: 'white' },
		{ label: 'Black', color: 'black', font: 'white' },
		{ label: 'White', color: 'white', font: 'black' },
		{ label: 'Gray', color: 'gray', font: 'white' },
		{ label: 'Brown', color: '#964B00', font: 'white' },
		{ label: 'Cream', color: '#FFFDD0', font: 'black' }
	];

	$effect(() => getcolors(colors));
	const isActive = (color: string) => colors.includes(color);

	const removeColor = (color: string) => (colors = colors.filter((cl) => cl !== color));
</script>

<div class="flex w-full flex-col gap-2">
	<ScrollArea orientation="horizontal">
		<div class="flex items-center gap-1">
			<div class="h-10 flex items-center justify-start">
				Selected Colors:
			</div>
			{#each colors as color, i}
				<Button
					size="sm"
					class="gap-0.5 rounded-full capitalize"
					onclick={() => removeColor(color)}
				>
					{color}
					<XIcon class="size-3" />
				</Button>
			{/each}
		</div>
	</ScrollArea>
	<fieldset class="space-y-2">
		<legend class="text-sm font-medium leading-none text-muted-foreground">Select color(s)</legend>
		<div class="grid grid-cols-[36px_36px_36px_36px] gap-4">
			{#each items as item (item.color)}
				<label
					style={`background-color: ${item.color}`}
					class={cn(
						'relative flex size-9 cursor-pointer flex-col items-center justify-center gap-3 rounded-full border border-input text-center shadow-sm shadow-black/[.04] ring-offset-background transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground has-[[data-disabled]]:opacity-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/70 has-[:focus-visible]:ring-offset-2',
						isActive(item.color) && 'ring-2 ring-primary ring-offset-2 dark:ring-white'
					)}
				>
					<input
						value={item.color}
						bind:group={colors}
						name="colors"
						type="checkbox"
						class="sr-only after:absolute after:inset-0"
					/>
					<span aria-hidden="true" class="text-sm font-medium" style={`color: ${item.font}`}>
						{item.label[0]}
					</span>
					<span class="sr-only">{item.label}</span>
				</label>
			{/each}
		</div>
	</fieldset>
</div>
