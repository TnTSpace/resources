<script lang="ts">
	import type { iImage } from '$lib/interface';
	import { getStyle } from '@toolsntuts/utils';
	import { Button } from '../ui/button';
	import { cn } from '$lib/utils';
	import { ScrollArea } from '../ui/scroll-area';

	interface Props {
		images: iImage[];
    class?: string;
	}


	let { images, class: className }: Props = $props();

  let selectedImage = $state<iImage>(images[0])

  const onSelectImage = (image: iImage) => {
    selectedImage = image
  }

  const isSelectedImage = (image: iImage) => image.xata_id === selectedImage.xata_id
</script>

<div class={cn("flex flex-col gap-2", className)}>
  <div class="w-full aspect-square relative">
    {#each images as image, i}
      {@const style = getStyle(image.url)}
      <div class={cn("aspect-square w-full hover:bg-transparent opacity-0 transition-opacity duration-200 ease-linear rounded-lg absolute", isSelectedImage(image) && "opacity-100")} {style}></div>
    {/each}
  </div>
  <ScrollArea orientation="horizontal">
    <div class="grid grid-flow-col auto-cols-[80px] gap-2">
      {#each images as image, i}
        {@const style = getStyle(image.url)}
        <Button onclick={() => onSelectImage(image)} variant="ghost" class="aspect-square w-full hover:bg-transparent h-auto" {style}></Button>
      {/each}
    </div>
  </ScrollArea>
</div>

