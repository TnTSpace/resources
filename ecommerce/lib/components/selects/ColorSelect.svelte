<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import * as Select from '$lib/components/ui/select';
	import type { iColor } from '$lib/interface';
	import { modalStore } from '$lib/stores';
	import { getStyle } from '@toolsntuts/utils';
	import { CheckIcon, PlusIcon } from 'lucide-svelte';
	import { getContext } from 'svelte';

	interface Props {
		colors: iColor[];
		selectedColor?: iColor;
		onColorSelect: (color: iColor) => void;
	}

	let { colors, onColorSelect, selectedColor }: Props = $props();

	let items = colors;

	let open = $state(false);
	let value = $state<iColor | undefined>(selectedColor);

	const selectedItem = $derived(items.find((item) => item.xata_id === value?.xata_id));

	function handleSelect(currentValue: iColor) {
		value = currentValue;
		onColorSelect(currentValue);
		open = false;
	}

	const onCreateColor = () => {
		$modalStore = { ...$modalStore, open: true, type: 'createColor' };
	};
</script>

<Select.Root type="single" bind:open>
	<Select.Trigger>
		{#if value && selectedItem}
			<div class="flex items-center gap-2">
				<span style={`background-color: ${selectedItem.value}`} class="size-6 rounded-full"></span>
				<span class="truncate">{selectedItem.name}</span>
			</div>
		{:else}
			<span class="text-muted-foreground">Select color</span>
		{/if}
	</Select.Trigger>
	<Select.Content class="w-full min-w-[var(--bits-popover-anchor-width)] p-0" align="start">
		<Command.Root>
			<Command.Input placeholder="Search colors..." />
			<Command.List>
				<Command.Empty>No color found.</Command.Empty>
				<Command.Group>
					{#each items as item (item.xata_id)}
						{@const style = getStyle(item.value)}
						<Command.Item
							value={item.name}
							onSelect={() => handleSelect(item)}
							class="flex items-center justify-between"
						>
							<div class="flex items-center justify-between gap-2">
								<span style={`background-color: ${item.value}`} class="size-10 rounded-full"></span>
								{item.name}
							</div>
							{#if selectedItem?.xata_id === item.xata_id}
								<CheckIcon class="color-4" />
							{/if}
						</Command.Item>
					{/each}
					<Command.Item onclick={onCreateColor}>
						<PlusIcon class="size-4" />
						Add Color
					</Command.Item>
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Select.Content>
</Select.Root>
