<script lang="ts">
	import { page } from '$app/state';
	import SearchSelect from '$lib/components/selects/SearchSelect.svelte';
	import { Label } from '$lib/components/ui/label';
	import type { iSelect } from '$lib/interface';

	interface Props {
		categoryFilters: iSelect[];
	}

	const category = page.url.searchParams.get('category');
	const selected = category ? { label: category, value: category } : undefined;
	let { categoryFilters }: Props = $props();


  const onOptionSelect = (selected: iSelect) => {
    page.url.searchParams.set('category', selected.value)
    location.href = page.url.href
  }
</script>

<div class="flex flex-col gap-1 w-full">
	<Label class="text-muted-foreground uppercase text-sm">Category</Label>
	<SearchSelect {onOptionSelect} {selected} options={categoryFilters} name="category" />
</div>
