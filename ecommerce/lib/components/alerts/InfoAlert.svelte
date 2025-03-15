<script lang="ts">
	import { InfoIcon } from 'lucide-svelte';
	import { Alert, AlertTitle, AlertDescription } from '$lib/components/ui/alert/index.js';
	import { Button } from '../ui/button';

	interface Props {
		title: string;
		message: string;
    href: string;
    linkText: string
	}

	let { message, title, href, linkText }: Props = $props();
</script>

<Alert variant="default" class="flex flex-col gap-2">
	<InfoIcon class="size-4" />
	<AlertTitle>{title}</AlertTitle>
	<AlertDescription class="flex flex-col gap-2">
    {message}
    <Button {href} class="md:w-fit">{linkText}</Button>
  </AlertDescription>
</Alert>