<script lang="ts">
	import CategoryForm from '$lib/components/forms/CategoryForm.svelte';
	import type { iCategory } from '$lib/interface';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const category = data.category as iCategory;
</script>

<div class="flex-col">
	<div class="flex-1 space-y-4 p-4 pt-2">
		<CategoryForm {category} />
	</div>
</div>
