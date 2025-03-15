<script lang="ts">
	import { StarIcon } from "lucide-svelte";
  interface Props {
    filled: number;
  }

  let { filled }: Props = $props()

</script>

<span class="inline-flex items-center text-amber-500" aria-hidden="true">
  {#each Array.from({ length: filled }) as _}
    <span class="size-4" aria-hidden="true">★</span>
  {/each}
  {#each Array.from({ length: 5 - filled }) as _}
  <span class="size-4 opacity-30" aria-hidden="true">★</span>
  {/each}
</span>