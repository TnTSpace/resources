<script lang="ts">
	import { Trash2Icon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { removeRingClasses } from '@toolsntuts/utils';
	import type { iWidget } from '$lib/interface';

  interface Props {
    ondelete: (wid: string) => void,
    widget: iWidget;
  }

  let { ondelete, widget }: Props = $props()

</script>
<Card class="rounded-lg border-t-2 border-t-muted-foreground dark:bg-secondary space-y-2">
  <div class="grid grid-cols-[1fr_40px] gap-4 items-center border-b border-b-muted-foreground/20 py-1 px-2">
    <h2>Banner (#{widget.position})</h2>
    <Button onclick={() => ondelete(widget.xata_id)} size="icon" variant="outline" class="text-red-500 interactive">
      <Trash2Icon />
    </Button>
  </div>
  <div class="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
    <div class="flex flex-col gap-1">
      <Label for="title" class="text-sm text-muted-foreground">Title</Label>
      <Input id="title" required name="title" class={removeRingClasses()} />
    </div>
    <div class="flex flex-col gap-1">
      <Label for="url" class="text-sm text-muted-foreground">Landing Page URL</Label>
      <Input id="url" name="url" class={removeRingClasses()} />
    </div>
  </div>
</Card>
