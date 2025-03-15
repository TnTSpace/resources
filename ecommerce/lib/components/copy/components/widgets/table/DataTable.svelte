<script lang="ts" generics="TData, TValue">
	import * as Table from '$lib/components/ui/table/index.js';
	import {
		type ColumnDef,
		type PaginationState,
		type SortingState,
		type ColumnFiltersState,
		getCoreRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		getFilteredRowModel
	} from '@tanstack/table-core';
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { writable, type Writable } from 'svelte/store';
	import { removeRingClasses } from '@toolsntuts/utils'
	// @ts-ignore
	import { PlusIcon } from "lucide-svelte"
	import { cn } from '../../../utils.js';

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		filterKeys: string[];
		onAdd: () => void;
		class?: string;
	};

	let { data, columns, filterKeys, onAdd, class: className }: DataTableProps<TData, TValue> = $props();
	let dataStore: Writable<TData[]> = writable(data);
	let searchTerm = $state('');

	let pagination = $state<PaginationState>({
		pageIndex: 0,
		pageSize: 4
	});

	let sorting = $state<SortingState>([]);

	let columnFilters = $state<ColumnFiltersState>([]);

	const table = createSvelteTable({
		get data() {
			return $dataStore;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			},

			get sorting() {
				return sorting;
			},

			get columnFilters() {
				return columnFilters;
			}
		},
		enableMultiRowSelection: true,
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	});

	const onkeyup = (evt: Event) => {
		const searchTerm = (evt.target as HTMLInputElement).value.toLowerCase();

		$dataStore = data.filter((child) => {
			// Loop through each filter key
			for (const key of filterKeys) {
				// Check if the key exists in the child object
				// @ts-ignore
				if (child.hasOwnProperty(key)) {
					// Convert the child's value to a string and lowercase for case-insensitive search
					// @ts-ignore
					const childValue = String(child[key]).toLowerCase();

					// Check if the search term exists within the child's value
					if (childValue.includes(searchTerm)) {
						// If a match is found, return true to keep the object
						return true;
					}
				}
			}

			// If no match is found in any filter key, return false
			return false;
		});
	};
</script>

<div class="grid grid-cols-[1fr_40px] gap-4 py-4 max-w-md">
	<Input placeholder="Filter..." bind:value={searchTerm} {onkeyup} class={removeRingClasses()} />
	<Button variant="outline" size="icon" onclick={onAdd}>
		<PlusIcon class="size-4" />
	</Button>
</div>
<div class={cn("rounded-md border w-full overflow-x-auto", className)}>
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row>
					{#each headerGroup.headers as header (header.id)}
						<Table.Head>
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				<Table.Row data-state={row.getIsSelected() && 'selected'}>
					{#each row.getVisibleCells() as cell (cell.id)}
						<Table.Cell>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</Table.Cell>
					{/each}
				</Table.Row>
			{:else}
				<Table.Row>
					<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
<div class="flex items-center justify-end space-x-2 py-4">
	<div class="text-muted-foreground flex-1 text-sm">
		{$dataStore.length} {$dataStore.length > 1 ? 'entries' : 'entry'}
	</div>
	<div class="flex items-center space-x-2">
		<Button
		variant="outline"
		size="sm"
		onclick={() => table.previousPage()}
		disabled={!table.getCanPreviousPage()}>Previous</Button
	>
	<Button
		variant="outline"
		size="sm"
		onclick={() => table.nextPage()}
		disabled={!table.getCanNextPage()}
	>
		Next
	</Button>
	</div>
</div>