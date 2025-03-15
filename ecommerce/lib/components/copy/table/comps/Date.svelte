<script lang="ts">
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { formatDate } from '@toolsntuts/utils'

	interface Props {
		updatedAt: string | number | Date
	}

	let { updatedAt }: Props = $props()

  const dateStr = formatDate(new Date(Number(updatedAt)), "ddd MMM DD, YYYY hh:mm a")

	let mounted = new Promise((resolve, reject) => {
		onMount(() => resolve(true));
	});
</script>

{#await mounted}
	<Skeleton class="h-[22px] w-[60px] rounded-full" />
{:then value}
	<span>{dateStr}</span>
{/await}
