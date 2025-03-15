<script lang="ts">
	import type { iMeta } from "$lib/interface";

  interface Props {
    head: iMeta
  }

  let { head }: Props = $props()
  const { title, description, ogimage, link } = head
</script>

<svelte:head>
  	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content="{title}" />
	<meta name="description" content="{description}" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{link}" />
	<meta property="og:title" content="{title}" />
	<meta property="og:description" content="{description}" />
	<meta property="og:image" content="{ogimage}" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="{link}" />
	<meta property="twitter:title" content="{title}" />
	<meta property="twitter:description" content="{description}" />
	<meta property="twitter:image" content="{ogimage}" />
</svelte:head>