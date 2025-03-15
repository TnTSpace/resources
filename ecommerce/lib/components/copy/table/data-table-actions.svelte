<script lang="ts">
  // @ts-ignore
  import { EllipsisIcon } from "lucide-svelte"
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js"

  interface Props {
    id: string;
    onview?: (id: string) => void;
    onedit?: (id: string) => void;
    ondelete?: (id: string) => void
  }

  let { id, onview, onedit, ondelete }: Props = $props()
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
        <span class="sr-only">Open Menu</span>
        <EllipsisIcon class="size-4" />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
      <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
        Copy ID
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item onclick={() => onview?.(id)}>View</DropdownMenu.Item>
    <DropdownMenu.Item onclick={() => onedit?.(id)}>Edit</DropdownMenu.Item>
    <DropdownMenu.Item onclick={() => ondelete?.(id)}>Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>