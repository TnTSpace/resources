<script lang="ts">
	import { page } from '$app/state';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import type { iProduct, iUser } from '$lib/interface';
	import { modalStore } from '$lib/stores';
	import { cn } from '$lib/utils';
	import { onCopy } from '@toolsntuts/utils';
	import { MoreVerticalIcon } from 'lucide-svelte';
	import { getContext } from 'svelte';

	interface Props {
		product: iProduct;
		class?: string;
	}

	let { product, class: className }: Props = $props();

	const me = getContext('me') as iUser;
	const onView = () => {
		location.href = `/catalog/${product.xata_id}`;
	};

	const onCheckout = () => {
		$modalStore = { ...$modalStore, open: true, data: product, type: 'checkoutOrder' };
	};
	const href = `${page.url.origin}/catalog/${product.xata_id}`;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		aria-label="product dropdown menu"
		class={cn(
			buttonVariants({ variant: 'outline', size: 'icon' }),
			className,
			'rounded-r-none rounded-tl-none border-y-0 border-l-0'
		)}
	>
		<MoreVerticalIcon class="size-4" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item onclick={onView}>View</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => onCopy(href)}>Copy URL</DropdownMenu.Item>
			{#if me}
				<DropdownMenu.Item onclick={onCheckout}>Checkout</DropdownMenu.Item>
			{/if}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
