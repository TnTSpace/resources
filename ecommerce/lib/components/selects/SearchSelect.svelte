<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import * as Select from '$lib/components/ui/select';
	import type { iSelect } from '$lib/interface';
	import { cn } from '$lib/utils';
	import { CheckIcon } from 'lucide-svelte';

	interface Props {
		options: iSelect[];
		selected?: iSelect;
		onOptionSelect: (selected: iSelect) => void;
		name: string;
		class?: string;
	}

	let { options, onOptionSelect, selected, name, class: className }: Props = $props();

	let open = $state(false);

	const selectedItem = $derived(options.find((option) => option.value === selected?.value));

	function handleSelect(currentValue: iSelect) {
		selected = currentValue;
		onOptionSelect(currentValue);
		open = false;
	}
</script>

<Select.Root type="single" bind:open>
	<Select.Trigger class={cn("w-full", className)}>
		{#if selected && selectedItem}
		<span class="truncate">{selectedItem.label}</span>
		{:else}
			<span class="text-muted-foreground">Select {name}</span>
		{/if}
	</Select.Trigger>
	<Select.Content class="w-full min-w-[var(--bits-popover-anchor-width)] p-0" align="start">
		<Command.Root>
			<Command.Input placeholder="Search {name}..." />
			<Command.List>
				<Command.Empty>No {name} found.</Command.Empty>
				<Command.Group>
					{#each options as option (option.value)}
						<Command.Item
							value={option.value}
							onSelect={() => handleSelect(option)}
							class="flex items-center justify-between"
						>
							<div class="flex items-center justify-between gap-2">
								{option.label}
							</div>
							{#if selectedItem?.value === option.value}
								<CheckIcon class="color-4" />
							{/if}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Select.Content>
</Select.Root>
