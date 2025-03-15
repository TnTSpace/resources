<script lang="ts">
	import { createWhatsAppUrl } from "$lib/fxn";
	import WhatsApp from "../icons/WhatsApp.svelte";
  import { Button } from "../ui/button";

  const href = createWhatsAppUrl('Hello')

</script>

<Button aria-label="WhatsApp Button" variant="ghost" size="icon" {href} class="fixed bottom-16 lg:bottom-2 right-2 hover:bg-transparent !p-0">
  <WhatsApp class="!size-10" />
</Button>