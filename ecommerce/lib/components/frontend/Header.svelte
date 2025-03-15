<script lang="ts">
	import { ShoppingCart } from 'lucide-svelte'; 
	import { Button } from '$lib/components/ui/button';
	import ModeToggle from '$lib/components/widgets/ModeToggle.svelte';
	import { page } from '$app/state'; 
	import { cartStore } from '$lib/stores';
	import User from '$lib/components/widgets/User.svelte';
	import SearchBar from '$lib/components/frontend/SearchBar.svelte';
	import Navigation from '$lib/components/frontend/Navigation.svelte';
	import Brand from '$lib/components/sections/Brand.svelte';
	import { cn } from '$lib/utils';

	const pathname = page.url.pathname;

	const isActiveRoute = (path: string) => pathname === path;

	let items = $derived($cartStore.reduce((acc, cur) => acc + Number(cur.quantityOrdered), 0));
</script>

<header class="sticky top-0 z-50 bg-white px-4 py-3 shadow-sm dark:bg-secondary">
	<div class="flex items-center justify-between md:container">
		<div class="flex items-center gap-4">
			<Brand />
			<SearchBar showBtn={true} class={cn("hidden p-0 md:flex rounded-full overflow-hidden", isActiveRoute('/') && "!hidden")} />
		</div>
		<div class="flex items-center gap-2">
			<Navigation class="hidden items-center justify-center gap-2 md:flex" />
			<div class="flex items-center gap-1">
				<ModeToggle />
				<User class="size-9" />
				<Button href="/cart" variant="outline" class="relative size-10 rounded-full p-0">
					<ShoppingCart class="size-8" />
					<span
						class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-white"
					>
						{items}
					</span>
				</Button>
			</div>
		</div>
	</div>
</header>
