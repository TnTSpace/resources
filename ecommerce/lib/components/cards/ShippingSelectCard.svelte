<script lang="ts">
	import type { iShipping } from '$lib/interface';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
  import { shippingOpenStore } from "$lib/stores";

	interface Props {
		shipping: iShipping;
		onselect: (location: iShipping) => void;
	}

	let { shipping, onselect }: Props = $props();
	const { location, state: shippingState, country } = shipping;

	const handleSelect = () => {
		$shippingOpenStore = false
		onselect(shipping)
	}
</script>

<Card class="flex flex-col gap-2 overflow-hidden dark:bg-secondary/20">
	<h2 class="line-clamp-1 border-b border-b-muted-foreground/10 px-4 py-2 text-lg font-semibold">
		{location}
	</h2>
	<!-- banner and thumbnail -->
	<div class="flex flex-col px-4">
		<span class="line-clamp-1 text-xs text-muted-foreground">City, Country</span>
		<span class="line-clamp-1">{shippingState}, {country}</span>
	</div>
	<div class="flex flex-col items-center border-t border-t-muted-foreground/10 p-2">
		<Button onclick={handleSelect} class="w-full">Select</Button>
	</div>
</Card>
