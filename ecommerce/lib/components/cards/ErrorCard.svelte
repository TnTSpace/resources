<script lang="ts">
	import { AlertCircle } from "lucide-svelte";
	import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
	import { Button } from "../ui/button";
	import { cn } from "$lib/utils";

  interface Props {
    error: string;
    class?: string
  }

  let { error, class: className }: Props = $props()

  const reloadPage = () => location.reload()
  
</script>
<Alert variant="destructive" class={cn("w-full", className)}>
  <AlertCircle class="size-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong: {error}</AlertDescription>
  <Button onclick={reloadPage} variant="destructive">Reload</Button>
</Alert>