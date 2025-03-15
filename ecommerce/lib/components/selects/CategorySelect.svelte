<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import * as Select from '$lib/components/ui/select';
	import type { iCategory } from '$lib/interface';
	import { CheckIcon, PlusIcon } from 'lucide-svelte';
	import { modalStore } from '$lib/stores';

	interface Props {
		categories: iCategory[];
		selectedCategory?: iCategory;
		onCategorySelect: (category: iCategory) => void;
	}

	let { categories, onCategorySelect, selectedCategory }: Props = $props();

	let items = categories;

	let open = $state(false);
	let value = $state<iCategory | undefined>(selectedCategory);

	const item =
		items && items.length ? items.find((item) => item.xata_id === value?.xata_id) : undefined;

	function handleSelect(currentValue: iCategory) {
		value = currentValue;
		onCategorySelect(currentValue);
		open = false;
	}

	const openModal = () => {
		$modalStore = { ...$modalStore, open: true, type: "createCategory" }
	}
</script>

<Select.Root type="single" bind:open>
	<Select.Trigger>
		{#if value}
			<span class="truncate">{value.name}</span>
		{:else}
			<span class="text-muted-foreground">Select category</span>
		{/if}
	</Select.Trigger>
	<Select.Content class="w-full min-w-[var(--bits-popover-anchor-width)] p-0" align="start">
		<Command.Root>
			<Command.Input placeholder="Search categories..." />
			<Command.List>
				<Command.Empty>No category found.</Command.Empty>
				<Command.Group>
					{#each items as item (item.xata_id)}
						<Command.Item
							value={item.name}
							onSelect={() => handleSelect(item)}
							class="flex items-center justify-between"
						>
							<div class="flex items-center justify-between gap-2">
								{item.name}
							</div>
							{#if value?.xata_id === item.xata_id}
								<CheckIcon class="size-4" />
							{/if}
						</Command.Item>
					{/each}

					<Command.Item class="flex items-center" onclick={openModal}>
						<PlusIcon class="size-4" />
						Create Category
					</Command.Item>
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Select.Content>
</Select.Root>
