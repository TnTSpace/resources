<script lang="ts">
	import type { iCategory } from '$lib/interface';
	import { formatDate, onCopy } from '@toolsntuts/utils';
	import { Trash2Icon, PencilIcon, CopyIcon } from 'lucide-svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import AlertDialog from '../widgets/AlertDialog.svelte';
	import { cn } from '$lib/utils';
	import { deleteCategoryApi } from '$lib/api-utils';

	interface Props {
		category: iCategory;
		onedit: (id: string) => void;
		onview: (id: string) => void;
	}

	let { category, onedit }: Props = $props();
	const { xata_id, name, xata_updatedat } = category;

</script>

<Card class="flex flex-col gap-2 overflow-hidden dark:bg-secondary/20">
	<h2 class="line-clamp-1 border-b border-b-muted-foreground/10 px-4 py-2 text-lg font-semibold">
		{name}
	</h2>
	<!-- banner and thumbnail -->
	<div class="flex flex-col px-4">
		<span>Last update</span>
		<span class="line-clamp-1 text-xs text-muted-foreground"
			>{formatDate(new Date(xata_updatedat), 'MMM DD, YYYY hh:mm a')}</span
		>
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
			name={`${category.name} category`}
			onconfirm={() => deleteCategoryApi(category)}
			disabled={false}
		>
			<Trash2Icon class="size-4" />
		</AlertDialog>
	</div>
</Card>
