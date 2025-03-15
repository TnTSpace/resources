<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { StoreIcon } from 'lucide-svelte';
	import { modalStore } from '$lib/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import Check from 'lucide-svelte/icons/check';
	import { ChevronsUpDownIcon, CirclePlusIcon } from 'lucide-svelte';
	import type { iCategory } from '$lib/interface';

	interface Props {
		onselect: (store: any) => void
	}

	let { onselect }: Props = $props()

	let open = $state(false);

	let value = $state('originui');

	let stores = $state<iCategory[]>([])

	let activeStore = $state(stores[0]);

	const isActive = (store: iCategory) => store.xata_id === activeStore.xata_id;

	const handleSelect = (store: any) => {
		activeStore = store;
		onselect(store);
	};

	const handleCreateStore = () => {
		$modalStore = { ...$modalStore, open: true, type: 'createStore' };
	};
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<div class="space-y-2">
			<Popover.Root bind:open>
				<Popover.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuButton
							{...props}
							size="lg"
							class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							>
								<StoreIcon class="size-4" />
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-semibold">
									{activeStore.name}
								</span>
								<span class="truncate text-xs">Store</span>
							</div>
							<ChevronsUpDownIcon class="ml-auto" />
						</Sidebar.MenuButton>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-full min-w-[var(--bits-popover-anchor-width)] p-0" align="start">
					<Command.Root>
						<Command.Input placeholder="Find store" />
						<Command.List>
							<Command.Empty>No store found.</Command.Empty>
							<Command.Group>
								{#each stores as store (store.name)}
									<Command.Item
										class="!bg-transparent"
										value={store.name}
										onSelect={() => handleSelect(store)}
									>
										<StoreIcon class="size-4" />
										{store.name}
										<Check class={cn('ml-auto', isActive(store) ? 'opacity-100' : 'opacity-0')} />
									</Command.Item>
								{:else}
									<p class="p-4 text-muted-foreground text-sm">No stores!!</p>
								{/each}
							</Command.Group>
							<Command.Separator />
							<Command.Group>
								<Button
									variant="ghost"
									class="w-full justify-start font-normal"
									onclick={handleCreateStore}
								>
									<CirclePlusIcon
										size={16}
										stroke-width={2}
										class="-ms-2 opacity-60"
										aria-hidden="true"
									/>
									Create Store
								</Button>
							</Command.Group>
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
		</div>
	</Sidebar.MenuItem>
</Sidebar.Menu>
