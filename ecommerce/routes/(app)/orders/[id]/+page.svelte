<script lang="ts">
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Card } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { formattedOrderDate } from '$lib/fxn';
	import type { iOrder } from '$lib/interface';
	import type { PageServerData } from './$types';
	import Wrap from "$lib/components/widgets/Wrap.svelte"

	let { data }: { data: PageServerData } = $props();

	const order = data.order as iOrder;
</script>

<Wrap>
	<div class="p-4 md:px-0">
		<Heading title={`Order #${order.reference}`} description="Information about your order" />
		<Separator />
		<div class="flex flex-col gap-4">
			<div class="pt-2">
				<p class="text-sm text-muted-foreground">{order.order_itemorder.records.length} items</p>
				<p class="text-sm text-muted-foreground">
					Placed on {formattedOrderDate(new Date(order.xata_createdat))}
				</p>
				<p class="text-sm text-muted-foreground">Total: ₦ {order.amount.toLocaleString()}</p>
			</div>
			<div class="flex flex-col gap-4">
				{#each order.order_itemorder.records as orderItem, i}
					<Card class="grid grid-cols-[96px_1fr] gap-4 p-2 dark:bg-secondary">
						<img src={orderItem.image} alt={orderItem.name} class="aspect-square w-24" />
						<div class="flex flex-col">
							<h2>{orderItem.name}</h2>
							<p class="text-sm text-muted-foreground">
								Price: ₦{Number(orderItem.price).toLocaleString()}
							</p>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</div>
</Wrap>
