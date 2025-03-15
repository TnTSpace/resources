<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { ScrollArea, Scrollbar } from '$lib/components/ui/scroll-area';
	import { sizeMap } from '$lib/constants';
	import type { SizeType } from '$lib/interface';
	import SizeWidget from './SizeWidget.svelte';
	import { Label } from '../ui/label';
	import { Button } from '../ui/button';
	import { XIcon } from 'lucide-svelte';

	interface Props {
		getsizes: (sizes: string[]) => void;
		sizes: string[];
	}

	let { getsizes, sizes = $bindable() }: Props = $props();

	const mapped = Object.keys(sizeMap).map((key) => ({ data: sizeMap[key as SizeType], key }));

  const removeSize = (size: string) => sizes = sizes.filter(sz => sz !== size)
</script>

<div class="flex flex-col gap-2">
	<ScrollArea orientation="horizontal">
		<div class="flex items-center gap-1">
			<div class="h-10 flex items-center justify-start">
				Selected Sizes:
			</div>
			{#each sizes as size, i}
				<Button size="sm" class="rounded-full gap-0.5" onclick={() => removeSize(size)}>
					{size}
					<XIcon class="size-3" />
				</Button>
			{/each}
		</div>
	</ScrollArea>
	<Tabs value={mapped[0].key}>
		<ScrollArea>
			<TabsList
				class="mb-3 h-auto gap-2 rounded-none border-b border-border bg-transparent px-0 py-1 text-foreground"
			>
				{#each mapped as map, i}
					<TabsTrigger
						value={map.key}
						class="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
					>
						<map.data.icon
							class="-ms-0.5 me-1.5 opacity-60"
							size={16}
							stroke-width={2}
							aria-hidden="true"
						/>
						{map.key}
					</TabsTrigger>
				{/each}
			</TabsList>
			<Scrollbar orientation="horizontal" />
		</ScrollArea>
		{#each mapped as map, i}
			<TabsContent value={map.key} class="border-0 bg-white outline-none dark:bg-background">
				<SizeWidget items={map.data.items} {getsizes} name={map.data.label} {sizes} />
			</TabsContent>
		{/each}
	</Tabs>
</div>
