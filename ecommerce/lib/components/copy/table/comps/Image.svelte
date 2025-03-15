<script lang="ts">
	import { AvatarImage, Avatar, AvatarFallback } from "$lib/components/ui/avatar/index.js"
	import { cn } from "$lib/utils.js";

	interface Props {
		src: string;
		initials?: string;
		class?: string
	}

	let { src = '', initials, class: className }: Props = $props();
</script>


<Avatar class={cn("size-12", className)}>
	<AvatarImage {src} />
	<AvatarFallback>{initials}</AvatarFallback>
</Avatar>