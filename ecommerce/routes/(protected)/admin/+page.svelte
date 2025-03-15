<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { PlusIcon } from 'lucide-svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4">
	<div class="flex flex-col leading-[1] text-center">
		<h2 class="text-2xl font-semibold">Ready to Create Your Product?</h2>
		<p class="text-muted-foreground">Click the button below to create one</p>
	</div>
	<Button href="/admin/products/create">
		Create Product
		<PlusIcon class="size-4" />
	</Button>
</div>
