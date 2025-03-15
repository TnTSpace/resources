<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
	import type { iShipping } from "$lib/interface";
	import ShippingSelectList from "$lib/components/frontend/lists/ShippingSelectList.svelte";
  import { shippingOpenStore } from "$lib/stores";
	import { buttonVariants } from "$lib/components/ui/button";

  interface Props {
    onselect: (shipping: iShipping) => void
  }

  let { onselect }: Props = $props()
 </script>
  
 <Dialog.Root bind:open={$shippingOpenStore}>
  <Dialog.Trigger class={buttonVariants({ variant: "default" })}>Lagos Cities</Dialog.Trigger>
  <Dialog.Content>
   <Dialog.Header>
    <Dialog.Title>Locations</Dialog.Title>
    <Dialog.Description>
     Select the location your book should be shipped to
    </Dialog.Description>
   </Dialog.Header>
   <div>
    <ShippingSelectList {onselect} />
   </div>
  </Dialog.Content>
 </Dialog.Root>