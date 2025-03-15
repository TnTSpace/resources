<script lang="ts">
	import '../app.css';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import { ClerkProvider } from 'svelte-clerk';
	import type { iMeta } from '$lib/interface';

	let { children } = $props();
	const meta: iMeta = {
		title: 'Beuzibah Stores',
		description: 'Style, Beauty, and Innovation Delivered!',
		ogimage: 'https://www.beuzibahstores.com/screenshot-wide.webp',
		link: 'https://www.beuzibahstores.com/',
		keywords: ['catalog', 'search', 'product', 'price', 'tag']
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

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	<div class="bg-primary-50 pb-14 dark:bg-background lg:pb-0">
		{@render children()}
	</div>
	<ModeWatcher />
	<Toaster richColors position="top-center" />
</ClerkProvider>
