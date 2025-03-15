<script lang="ts">
	import ShippingForm from '$lib/components/forms/ShippingForm.svelte';
	import type { iShipping } from '$lib/interface';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const shipping = data.shipping as iShipping;
</script>

<div class="flex-col">
	<div class="flex-1 space-y-4 p-4 pt-2">
		<ShippingForm {shipping} />
	</div>
</div>
