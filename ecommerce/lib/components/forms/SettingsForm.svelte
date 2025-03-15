<script lang="ts"> 
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import ApiAlert from '$lib/components/widgets/APIAlert.svelte';
	import { page } from '$app/state';


</script>

<div class="flex items-center justify-between">
	<Heading class="text-start" title="Settings" description="Manage store preferences" />
</div>
<Separator />
<ApiAlert title="PUBLIC_API_URL" description={`${page.url.origin}/api`} variant="public" />
