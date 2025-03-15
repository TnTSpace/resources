<script lang="ts">
	let { children } = $props();
</script>

<div class="center flex h-screen items-center justify-center">
	{@render children()}
</div>
