<script lang="ts">
	// import BannerForm from '$lib/components/forms/BannerForm.svelte';
	// import ProductCarouselForm from '$lib/components/forms/ProductCarouselForm.svelte';
	// import { Button } from '$lib/components/ui/button';
	// import { Card } from '$lib/components/ui/card';
	// import Select from '$lib/components/widgets/Select.svelte';
	// import { eWidgetType, widgetOptions } from '$lib/constants';
	// import type { iUser, iWidget, WidgetType } from '$lib/interface';
	// import type { PageData } from './$types';
	// import { type iResult } from '@toolsntuts/utils';
	// import { getContext } from 'svelte';
	// import { toast } from 'svelte-sonner';
	// import { draggable, droppable, type DragDropState } from '$lib/components/widgets/dragndrop';
	// import "$lib/components/widgets/dragndrop/styles/index.css"

	// let { data }: { data: PageData } = $props();

	// const products = data.products;

	// const me = getContext('me') as iUser;

	// let items = $state<iWidget[]>([]);

	// // **** Svelte DND Action ****

	// const onAddWidget = async (type: WidgetType) => {
	// 	let partialWidget: Partial<iWidget>;

	// 	if (type === eWidgetType.BANNER) {
	// 		const bannerPos = items.length + 1;
	// 		partialWidget = {
	// 			title: '',
	// 			subline: '',
	// 			url: '',
	// 			position: bannerPos,
	// 			type: eWidgetType.BANNER
	// 		};
	// 	} else {
	// 		const carouselPos = items.length + 1;
	// 		partialWidget = {
	// 			title: '',
	// 			subline: '',
	// 			url: '',
	// 			position: carouselPos,
	// 			type: eWidgetType.PRODUCTCAROUSEL
	// 		};
	// 	}

	// 	try {
	// 		const url = '/api/widget';
	// 		const options: RequestInit = {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({ partialWidget, me })
	// 		};

	// 		const response = await fetch(url, options);
	// 		const { status, message, data } = (await response.json()) as iResult;

	// 		if (status === 'error') {
	// 			toast.error(message);
	// 		} else {
	// 			const widget = data as iWidget;
	// 			items = [...items, { ...widget, id: widget.xata_id }];
	// 		}
	// 	} catch (error: any) {
	// 		toast.error(error.message);
	// 	}
	// };

	// const ondelete = async (id: string) => {
	// 	console.log('deleting', id);

	// 	try {
	// 		const url = '/api/widget';
	// 		const options: RequestInit = {
	// 			method: 'DELETE',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({ id, me })
	// 		};

	// 		const response = await fetch(url, options);
	// 		const { status, message } = (await response.json()) as iResult;

	// 		console.log({ from: 'delete', status, message });
	// 		if (status === 'error') {
	// 			toast.error(message);
	// 		} else {
	// 			items = items.filter((item) => item?.xata_id !== id);
	// 		}
	// 	} catch (error: any) {
	// 		toast.error(error.message);
	// 	}
	// };

	// const onselected = (selected: string) => {
	// 	const type = selected as WidgetType;
	// 	onAddWidget(type);
	// };

	// const handleDrop = (state: DragDropState<iWidget>) => {
	// 	console.log("drop")
	// 	const { draggedItem, sourceContainer, targetContainer } = state;

	// 	if (!targetContainer || sourceContainer === targetContainer) return;

	// 	const sourceIndex = items.findIndex((item) => item.xata_id === draggedItem.xata_id);
	// 	const targetIndex = parseInt(targetContainer);

	// 	const [movedItem] = items.splice(sourceIndex, 1);
	// 	items.splice(targetIndex, 0, movedItem);
	// 	items = [...items];
	// 	console.log({ items, from: "handle drop" })
	// };

	// $effect(() => console.log({ items: { ...items } }));
	import SimpleList from './components/SimpleList.svelte';
	import InteractiveElements from './components/InteractiveElements.svelte';
	import WidgetCanvas from './components/WidgetCanvas.svelte';
	import type { PageServerData } from './$types';


	let { data }: { data: PageServerData } = $props();
	const widgets = data.widgets
	const widgetItems = data.widgetItems
	const products = data.products
</script>

<!-- <div class="flex flex-col space-y-4 p-4 pt-6">
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
	<div class="grid grid-cols-[1fr_80px] gap-4">
		<section class="space-y-2">
			{#key items.length}
				{#each items as item, index (item.xata_id)}
					<div
						use:droppable={{
							container: index.toString(),
							callbacks: {
								onDrop: handleDrop
							}
						}}
						use:draggable={{
							container: index.toString(),
							dragData: item,
							interactive: ['.interactive']
						}}>
						{#if item!.type === eWidgetType.BANNER}
							<BannerForm widget={item} {ondelete} />
						{/if}

						{#if item!.type === eWidgetType.PRODUCTCAROUSEL}
							<ProductCarouselForm widget={item} {products} {ondelete} />
						{/if}
					</div>
				{/each}
			{/key}
		</section>
		<div></div>
	</div>
</div> -->

<!-- <SimpleList /> -->
<!-- <InteractiveElements /> -->
<WidgetCanvas {widgets} {widgetItems} {products} />
