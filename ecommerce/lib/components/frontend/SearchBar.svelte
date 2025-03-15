<script lang="ts">
	import { cn } from '$lib/utils';
	import Search from '$lib/components/widgets/Search.svelte';

  interface Props {
    class?: string;
    showBtn?: boolean;
  }

  let { class: className, showBtn }: Props = $props()

	const onkeyup = () => {};
</script>

<Search {showBtn} class={cn("px-4", className)} inputValue="" {onkeyup} />