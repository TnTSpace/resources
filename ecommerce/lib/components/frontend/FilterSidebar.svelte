<script lang="ts">
	import { Card } from "../ui/card";
  import CategoryFilter from "./filters/CategoryFilter.svelte";
	import ColorFilter from "./filters/ColorFilter.svelte";
	import PriceFilter from "./filters/PriceFilter.svelte";
	import SizeFilter from "./filters/SizeFilter.svelte";
	import Sort from "./filters/Sort.svelte";

  interface Props {
    sizes: string[];
    colors: string[];
    categories: string[]
  }

  let { sizes, colors, categories }: Props = $props()

  const categoryFilters = categories.map(cat => ({ label: cat, value: cat.toLowerCase() }))

</script>

<Card class="w-full p-4 flex flex-col gap-4 dark:bg-background rounded-none border-y-0">
  <CategoryFilter {categoryFilters} />
  <PriceFilter />
  <!-- <ColorFilter {colors} /> -->
  <SizeFilter title="Size" list={sizes} />
  <Sort />
</Card>