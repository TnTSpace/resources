<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		getsizes: (sizes: string[]) => void;
		sizes: string[];
		items: string[];
		name: string;
	}

	let { getsizes, sizes = $bindable(), items, name = 'Select size(s)' }: Props = $props();

	$effect(() => getsizes(sizes));

	const isActive = (size: string) => sizes.includes(size);
</script>

<div class="flex flex-col gap-2">
	<fieldset class="space-y-2">
		<legend class="text-sm font-medium leading-none text-muted-foreground">{name}</legend>
		<div class="grid grid-cols-3 gap-4 lg:grid-cols-6">
			{#each items as item (item)}
				<label
					class={cn(
						'transition-sizes relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-input p-4 text-center shadow-sm shadow-black/[.04] ring-offset-background has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground has-[[data-disabled]]:opacity-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/70 has-[:focus-visible]:ring-offset-2',
						isActive(item) && 'ring-2 ring-primary ring-offset-2 dark:ring-white'
					)}
				>
					<input
						value={item}
						bind:group={sizes}
						name="sizes"
						type="checkbox"
						class="sr-only after:absolute after:inset-0"
					/>
					<span aria-hidden="true" class="text-sm font-medium">
						{item}
					</span>
					<span class="sr-only">{item}</span>
				</label>
			{/each}
		</div>
	</fieldset>
</div>
