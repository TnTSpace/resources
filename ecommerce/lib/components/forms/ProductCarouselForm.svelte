<script lang="ts">
	import { Trash2Icon, PackagePlusIcon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { removeRingClasses } from '@toolsntuts/utils';
	import type { iProduct, iWidget } from '$lib/interface';
	import { ScrollArea } from '$lib/components/ui/scroll-area'; 
	import ProductCardSmall from '$lib/components/cards/ProductCardSmall.svelte';
	import ProductDialog from '../widgets/ProductDialog.svelte';

  interface Props {
    ondelete: (wid: string) => void,
    widget: iWidget;
    products: iProduct[]
  }

  let { ondelete, products, widget }: Props = $props()

  let carouselProducts: iProduct[] = $state([])

  const onselect = (product: iProduct) => {
    carouselProducts = [...carouselProducts, product]

    console.log({ product: product.name, carouselProducts: carouselProducts.length })
  }

  const onsubmit = async (evt: SubmitEvent) => {
    evt.preventDefault()
    const form = evt.target as HTMLFormElement
    const formData = new FormData(form)
    const entries = Object.fromEntries(formData.entries())

    console.log({ entries })
    try {
      
    } catch (error: any) {
      
    }
  }
</script>

<Card class="rounded-lg border-t-2 border-t-muted-foreground dark:bg-secondary space-y-2">
  <div class="grid grid-cols-[1fr_40px] gap-4 items-center border-b border-b-muted-foreground/20 py-1 px-2">
    <h2>Product Floor (#{widget.position})</h2>
    <Button size="icon" variant="outline" class="text-red-500 interactive" onclick={() => ondelete(widget.xata_id)}>
      <Trash2Icon />
    </Button>
  </div>
  <form {onsubmit} class="p-2 grid grid-cols-1 gap-2">
    <div class="flex flex-col gap-1">
      <Label for="title" class="text-sm text-muted-foreground">Title</Label>
      <Input id="title" required name="title" class={removeRingClasses()} />
    </div>
    <div class="flex flex-col gap-1">
      <Label for="url" class="text-sm text-muted-foreground">Landing Page URL</Label>
      <Input id="url" name="url" class={removeRingClasses()} />
    </div>
    <ScrollArea orientation="horizontal">
      <div class="flex items-center space-x-2">
        {#each carouselProducts as product, i} 
          <ProductCardSmall {product} class="w-32" />
        {/each}
      </div>
    </ScrollArea>
    <ProductDialog {onselect} {products} class="hover:bg-transparent h-auto aspect-square size-32 flex items-center justify-center interactive">
      <PackagePlusIcon class="!size-14" />
    </ProductDialog>
    <Button type="submit" class="interactive w-fit">Submit</Button>
  </form>
</Card>
