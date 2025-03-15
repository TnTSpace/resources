<script lang="ts">
	import type { iCategory, iSize } from '$lib/interface';
	import { formatDate, onCopy } from '@toolsntuts/utils';
	import { Trash2Icon, PencilIcon, CopyIcon } from 'lucide-svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import AlertDialog from '../widgets/AlertDialog.svelte';
	import { cn } from '$lib/utils';
	import { deleteSizeApi } from '$lib/api-utils';
	import { getTailwindColorClass } from '$lib/fxn';
	import { Badge } from '../ui/badge';

	interface Props {
		size: iSize;
		onedit: (id: string) => void;
		onview: (id: string) => void;
	}

	let { size, onedit }: Props = $props();
	const { xata_id, name, value, xata_updatedat, category } = size;

	const color = getTailwindColorClass((category as iCategory).name);
</script>

<Card class="flex flex-col gap-2 overflow-hidden dark:bg-secondary/20">
	<h2 class="line-clamp-1 border-b border-b-muted-foreground/10 px-4 py-2 text-lg font-semibold">
		{name}
	</h2>
	<div class="flex flex-col gap-1 px-4">
		<p class="text-4xl font-bold">{value}</p>
		<span class="line-clamp-1 text-xs text-muted-foreground"
			>Last update: {formatDate(new Date(xata_updatedat), 'MMM DD, YYYY hh:mm a')}</span
		>
		<Badge class={cn('w-fit', color)}>{(category as iCategory).name}</Badge>
	</div>
	<div class="flex items-center justify-end border-t border-t-muted-foreground/10">
		<Button
			onclick={() => onCopy(xata_id)}
			class="rounded-none border-y-0 border-l-0 text-green-500"
			variant="outline"
			size="icon"
		>
			<CopyIcon class="size-4" />
		</Button>
		<Button
			onclick={() => onedit(xata_id)}
			class="rounded-none border-y-0 border-l-0 text-blue-500"
			variant="outline"
			size="icon"
		>
			<PencilIcon class="size-4" />
		</Button>
		<AlertDialog
			class={cn(
				buttonVariants({ variant: 'outline' }),
				'rounded-none border-y-0 border-l-0 text-red-500'
			)}
			name={`${size.name} size`}
			onconfirm={() => deleteSizeApi(size)}
			disabled={false}
		>
			<Trash2Icon class="size-4" />
		</AlertDialog>
	</div>
</Card>
