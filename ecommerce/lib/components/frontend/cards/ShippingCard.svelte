<script lang="ts">
	import type { iShipping } from '$lib/interface';
	import { onCopy } from '@toolsntuts/utils';
	import { PencilIcon, CopyIcon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card'; 

	interface Props {
		shipping: iShipping;
		onselect: (id: string) => void;
	}

	let { shipping, onselect }: Props = $props();
	const {
		xata_id,
		location,
		state: shippingState,
		country,
	} = shipping;
</script>

<Card class="flex flex-col gap-2 overflow-hidden dark:bg-secondary/20">
	<h2 class="line-clamp-1 border-b border-b-muted-foreground/10 px-4 py-2 text-lg font-semibold">
		{location}
	</h2>
	<!-- banner and thumbnail -->
	<div class="flex flex-col px-4">
		<span>City, Country</span>
		<span class="line-clamp-1 text-xs text-muted-foreground">{shippingState}, {country}</span>
	</div>
	<div class="flex items-center justify-end border-t border-t-muted-foreground/10 p-4">
		<Button onclick={() => onselect(xata_id)}>Select</Button>
	</div>
</Card>