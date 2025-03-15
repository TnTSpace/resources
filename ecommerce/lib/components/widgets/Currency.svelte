<script lang="ts">
	import { acronymMap, CurrencyAcronym, CurrencySymbol, symbolMap } from '$lib/constants';
	import type { CurrencyType } from '$lib/interface';
	import { cn } from '$lib/utils';
	import { removeRingClasses } from '@toolsntuts/utils';
	import { Input } from '../ui/input';

	interface Props {
		currency: 'naira' | 'dollar' | 'pound' | 'euro';
		name: string;
		value: string | number;
    required: boolean
	}

	let { currency = 'naira', value = $bindable(), name, required }: Props = $props();

</script>

<div class="space-y-2">
	<div class="relative">
		<Input id={name} {name} class={cn("peer pe-12 ps-6", removeRingClasses())} placeholder="0.00" bind:value type="number" required />
		<span
			class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
		>
			{symbolMap[currency]}
		</span>
		<span
			class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50"
		>
			{acronymMap[currency]}
		</span>
	</div>
</div>
