<script lang="ts">
	import Logo from '$lib/components/icons/Logo.svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<Button
	href="/"
	variant="ghost"
	class="grid h-auto grid-cols-[32px_1fr] items-center p-0 hover:bg-transparent"
>
	<Logo class="!size-8" />
	<div class="-mt-3 leading-[.2]">
		<p class="text-lg font-semibold text-primary dark:text-white">Beuzibah</p>
		<span class="text-muted-foreground">Stores</span>
	</div>
</Button>
