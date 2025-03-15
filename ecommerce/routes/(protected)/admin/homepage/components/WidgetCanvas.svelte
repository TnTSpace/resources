<script lang="ts">
	import BannerForm from '$lib/components/forms/BannerForm.svelte';
	import ProductCarouselForm from '$lib/components/forms/ProductCarouselForm.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { draggable, droppable, type DragDropState } from '$lib/components/widgets/dragndrop';
	import Select from '$lib/components/widgets/Select.svelte';
	import { eWidgetType, widgetOptions } from '$lib/constants';
	import type { iUser, iWidget, iWidgetItem, WidgetType, iProduct } from '$lib/interface';
	import { removeRingClasses, type iResult } from '@toolsntuts/utils';
	import { Trash2Icon } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	interface Props {
		widgets: iWidget[];
		widgetItems: iWidgetItem[];
		products: iProduct[]
	}

	let { widgetItems, widgets, products }: Props = $props();

	console.log({ widgets, widgetItems });

	const me = getContext('me') as iUser;

	let item = $state<iWidget[]>(widgets);

	function handleItemsDrop(state: DragDropState<iWidget>) {
		const { draggedItem, sourceContainer, targetContainer } = state;
		if (!targetContainer || sourceContainer === targetContainer) return;

		const sourceIndex = item.findIndex((item) => item.xata_id === draggedItem.xata_id);
		const targetIndex = parseInt(targetContainer);

		const [movedItem] = item.splice(sourceIndex, 1);
		item.splice(targetIndex, 0, movedItem);
		item = [...item.map((item, i) => ({ ...item, position: i + 1 }))]; // Force reactivity
	}

	const onselected = async (selected: string) => {
		const type = selected as WidgetType;
		await onAddWidget(type);
	};

	const ondelete = async (id: string) => {
		console.log('deleting', id);

		try {
			const url = '/api/widget';
			const options: RequestInit = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id, me })
			};

			const response = await fetch(url, options);
			const { status, message } = (await response.json()) as iResult;

			console.log({ from: 'delete', status, message });
			if (status === 'error') {
				toast.error(message);
			} else {
				item = item.filter((item) => item?.xata_id !== id);
				item = item.map((item, i) => ({ ...item, position: i + 1 }));
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};
	const onAddWidget = async (type: WidgetType) => {
		let partialWidget: Partial<iWidget>;

		if (type === eWidgetType.BANNER) {
			const bannerPos = item.length + 1;
			partialWidget = {
				title: '',
				subline: '',
				url: '',
				position: bannerPos,
				type: eWidgetType.BANNER
			};
		} else {
			const carouselPos = item.length + 1;
			partialWidget = {
				title: '',
				subline: '',
				url: '',
				position: carouselPos,
				type: eWidgetType.PRODUCTCAROUSEL
			};
		}

		try {
			const url = '/api/widget';
			const options: RequestInit = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ partialWidget, me })
			};

			const response = await fetch(url, options);
			const { status, message, data } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				const widget = data as iWidget;
				item = [...item, { ...widget, id: widget.xata_id }];
				item = item.map((item, i) => ({ ...item, position: i + 1 }));
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	$effect(() => console.log({ item }));
</script>

<div class="space-y-4 p-4 pt-6">
	<Card
		class="mt-auto flex flex-col items-center justify-between gap-2 rounded-lg border-t-2 border-t-primary p-2 dark:bg-secondary md:flex-row"
	>
		<Select
			class="w-full md:max-w-sm"
			shouldResetOnSelection={true}
			{onselected}
			options={widgetOptions}
			name="type"
		/>
		<Button class="w-full md:w-fit">Save</Button>
	</Card>

	<div class="grid space-y-2 grid-cols-1">
		<div class="space-y-2">
			{#key item.length}
				{#each item as item, index (item.xata_id)}
					<div
						use:droppable={{
							container: index.toString(),
							callbacks: {
								onDrop: handleItemsDrop,
							}
						}}
						use:draggable={{
							container: index.toString(),
							dragData: item,
							interactive: ['.interactive']
						}}
						animate:flip={{ duration: 200 }}
						in:fade={{ duration: 150 }}
						out:fade={{ duration: 150 }}
						class="svelte-dnd-touch-feedback cursor-move transition-all duration-200"
					>
						{#if item.type === eWidgetType.BANNER}

						<BannerForm widget={item} {ondelete} />
						{/if}
						{#if item.type === eWidgetType.PRODUCTCAROUSEL}
						<ProductCarouselForm widget={item} {products} {ondelete} />
						{/if}
					</div>
				{/each}
			{/key}
		</div>
		<div class="md:hidden"></div>
	</div>
</div>
