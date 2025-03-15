<script lang="ts">
	import { cn } from '$lib/utils.js';


import { Input } from '../ui/input/index.js';
  interface Props {
    class?: string
  }

  let { class: className }: Props = $props()

</script>
<div class={cn("size-4 rounded-full animate-spin border-t-2 border-b-2 border-primary dark:border-white", className)}></div>