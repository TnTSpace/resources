<script lang="ts">
	import InfoAlert from '$lib/components/alerts/InfoAlert.svelte';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { formattedOrderDate } from '$lib/fxn';
	import type { iMeta, iOrder } from '$lib/interface';
	import type { PageServerData } from './$types';
	import Wrap from "$lib/components/widgets/Wrap.svelte"

	let { data }: { data: PageServerData } = $props();

	const orders = data.orders as iOrder[];

	const meta: iMeta = {
		title: 'Orders | The House of Tyrannus',
		description: 'Inspiring Faith, Knowledge, and Spiritual Growth!',
		ogimage: 'https://www.houseoftyrannus.com/screenshot-wide.webp',
		link: 'https://www.houseoftyrannus.com/',
		keywords: ['orders', 'search', 'product', 'price', 'tag']
	};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{meta.title}</title>
	<meta name="title" content={meta.title} />
	<meta name="description" content={meta.description} />
	<meta name="keywords" content={meta.keywords.join(', ')} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={meta.link} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.ogimage} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={meta.link} />
	<meta property="twitter:title" content={meta.title} />
	<meta property="twitter:description" content={meta.description} />
	<meta property="twitter:image" content={meta.ogimage} />
</svelte:head>

<Wrap>
	<div class="flex flex-col gap-4 p-4 md:px-0">
		<Heading title="Orders" description="Track your recent purchases." />
		<Separator />
		<div class="flex flex-col gap-4 p-4 md:px-0">
			{#each orders as order, i}
				{@const orderItem = order?.order_itemorder?.records[0]}
				{@const records = order?.order_itemorder?.records ? order?.order_itemorder?.records : []}
				<Card class="flex flex-col p-2 dark:bg-secondary md:flex-row">
					<div class="grid size-full grid-cols-[128px_1fr] gap-4">
						<div class="grid size-32 grid-cols-2 grid-rows-2">
							{#each records.slice(0, 4) as orderItem, i}
								<img src={orderItem.image} alt={orderItem.name} class="aspect-square size-full" />
							{/each}
						</div>
						<div class="flex h-full flex-col justify-between">
							<div class="flex flex-col">
								<h2>
									{records.length}
									{records.length > 1 ? 'items' : 'item'}
								</h2>
								<p class="text-xs text-muted-foreground">
									Order <a href={`/orders/${order.xata_id}`} class="underline">{order.reference}</a>
								</p>
							</div>
							<div class="flex flex-col gap-1">
								<Badge class="w-fit">Purchased</Badge>
								{#if orderItem}
									<p class="text-xs text-muted-foreground">
										{formattedOrderDate(new Date(orderItem.xata_createdat))}
									</p>
								{/if}
							</div>
						</div>
					</div>
					<Button class="self-end" href={`/orders/${order.xata_id}`}>See Details</Button>
				</Card>
			{:else}
				<InfoAlert
					linkText="Shop Now"
					href="/catalog"
					title="No Orders Yet"
					message="Your orders will appear here once placed. Stay ahead—explore our collection and place your first order today! 🚀"
				/>
			{/each}
		</div>
	</div>
</Wrap>