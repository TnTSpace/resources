<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";


interface Props {
  children: Snippet;
  class?: string
}

let { children, class: className }: Props = $props()
</script>

<div class={cn("mx-auto max-w-7xl px-4", className)}>
  {@render children()}
</div>