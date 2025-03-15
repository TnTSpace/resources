<script lang="ts">
	import { onMount, setContext, type Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Footer from '$lib/components/sections/Footer.svelte';
	import Header from '$lib/components/frontend/Header.svelte';
	import BottomNav from '$lib/components/frontend/BottomNav.svelte';
	import type { iMeta, iUser } from '$lib/interface';
	import Dialog from '$lib/components/frontend/Dialog.svelte';
	import WhatsAppBtn from '$lib/components/frontend/WhatsAppBtn.svelte';
	import CookieConsentBtn from '$lib/components/frontend/CookieConsentBtn.svelte';
	import { cartStore } from '$lib/stores';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let me = data.me as iUser;

	setContext('me', me);
	setContext('shippings', data.shippings)


	onMount(() => {
		if (me) {
			$cartStore = []
			$cartStore = data.cart;
		}
	});
</script>

<div class="min-h-screen bg-paper-50 dark:bg-background">
	<Header />
	<main>
		{@render children()}
	</main>
	<Footer />
	<BottomNav />
	<Dialog />
	<WhatsAppBtn />
	<CookieConsentBtn />
</div>
