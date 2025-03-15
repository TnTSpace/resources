<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Label } from '../ui/label';
	import { Switch } from '../ui/switch';

	interface Props {
		name: string;
		description: string;
		checked: boolean;
		children: Snippet;
	}

	let { name, checked = $bindable(), children, description }: Props = $props();
</script>

<div
	class="grid grid-cols-[auto_1fr] items-stretch gap-4 relative w-full gap-4 rounded-lg border border-input bg-white p-4 shadow-sm has-[[data-state=checked]]:border-ring dark:bg-background"
>
	<div class="flex flex-col items-center justify-between">
		{@render children()}
		<Switch
			id={name}
			{name}
			bind:checked
			class="h-4 w-6 after:absolute after:inset-0 data-[state=checked]:dark:bg-white [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
			aria-describedby={name}
		/>
	</div>
	<div class="grid grow gap-2">
		<Label for={name} class="capitalize">
			{name}
		</Label>
		<p class="text-xs text-muted-foreground">
			{description}
		</p>
	</div>
</div>
