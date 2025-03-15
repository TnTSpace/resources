<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import type { LayoutServerData } from './$types';
	import type { iUser } from '$lib/interface';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/sections/AppSidebar.svelte';
	import DashboardHeader from '$lib/components/sections/DashboardHeader.svelte';
	import Dialog from '$lib/components/widgets/Dialog.svelte';

	let { data, children }: { data: LayoutServerData; children: Snippet } = $props();


	let me = data.me as iUser;

	setContext('me', me);
	setContext('sizes', data.sizes)
	setContext('categories', data.categories)
	setContext('shippings', data.shippings)
	setContext('products', data.products)
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset class="bg-[#f5f5f5] dark:bg-background">
		<DashboardHeader />
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
<Dialog />
