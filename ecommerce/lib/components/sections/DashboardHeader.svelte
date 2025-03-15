<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import BreadcrumbComponent from '$lib/components/widgets/BreadcrumbComponent.svelte';
	import ModeToggle from '$lib/components/widgets/ModeToggle.svelte';
	import User from '$lib/components/widgets/User.svelte';
</script>

<header
	class="sticky left-0 top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 pr-4"
>
	<div class="flex items-center gap-2 px-4">
		<Sidebar.Trigger class="-ml-1" />
		<Separator orientation="vertical" class="mr-2 h-4" />
		<BreadcrumbComponent />
	</div>
	<div class="grid grid-cols-[40px_40px] gap-2">
		<ModeToggle class="mr-4" />
		<User class="size-10" />
	</div>
</header>
