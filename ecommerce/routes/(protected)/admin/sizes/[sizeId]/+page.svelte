<script lang="ts">
	import SizeForm from '$lib/components/forms/SizeForm.svelte';
	import type { iSize } from '$lib/interface';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const size = data.size as iSize;
</script>

<div class="flex-col">
	<div class="flex-1 space-y-4 p-4 pt-2">
		<SizeForm {size} />
	</div>
</div>
