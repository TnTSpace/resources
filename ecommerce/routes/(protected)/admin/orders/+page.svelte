<script lang="ts">
	import type { PageData } from './$types';
	import type { iOrder } from '$lib/interface'; 

	let { data }: { data: PageData } = $props();

	const orders = data.orders;

	const filterKeys: (keyof iOrder)[] = ['products', 'phone','address', 'amount', 'isPaid'];
</script>

<div class="flex-col">
	<div class="flex-1 space-y-4 p-4 pt-2">
		
	</div>
</div>
