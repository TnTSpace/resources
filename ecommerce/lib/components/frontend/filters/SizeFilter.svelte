<script lang="ts">
	import { page } from '$app/state';
	import { Label } from '$lib/components/ui/label';

	interface Props {
		title: string;
		list: string[];
	}

	let { title, list }: Props = $props();

	const urlSizes = page.url.searchParams.get('size');

	let searchTerm = $state('');

	let selected: string[] = $state(urlSizes ? urlSizes.split('--') : []);
	let oldSelection: string[] = $state(list);

	let rendered: string[] = $state([]);

	export const restore = () => {
		selected = [];
		oldSelection = [];
	};

	const cancelSearch = () => {
		searchTerm = '';
		rendered = list;
		selected = [...oldSelection];
	};

	$effect(() => {
		rendered = list.filter((item) => item.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
	});

	const hidden = $derived(searchTerm.length === 0);

	const onOptionSelect = () => {
		if (selected.length) {
			page.url.searchParams.set('size', selected.join('--'));
		} else {
			page.url.searchParams.delete('size');
		}
		location.href = page.url.href;
	};

	const isSelected = (size: string) => selected.includes(size);
</script>

<div class="flex flex-col gap-1">
	<Label class="text-sm uppercase text-muted-foreground">{title}</Label>
	<div>
		<div class="form-control relative my-1 flex h-9 items-center justify-center rounded-full">
			<div
				class="fill-dmpaperx2 absolute left-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center dark:fill-white"
			>
				<svg viewBox="0 0 24 24" class="h-6 w-6">
					<path
						d="M20.773 18.51l-4.322-4.464c-.31-.32-.697-.449-.865-.285-.168.163-.556.035-.866-.286l-.061-.064A6.488 6.488 0 0 0 4.9 4.901a6.491 6.491 0 0 0 8.641 9.661l.027.029c.31.32.425.711.256.874-.168.163-.054.555.256.875l4.32 4.466c.31.32.82.33 1.141.02l1.213-1.174c.32-.31.328-.82.018-1.141zm-8.117-5.855a4.48 4.48 0 0 1-6.328 0 4.48 4.48 0 0 1 0-6.328 4.479 4.479 0 0 1 6.327 0 4.48 4.48 0 0 1 0 6.328z"
					/>
				</svg>
			</div>
			<button
				aria-label="search"
				class:hidden
				onclick={() => cancelSearch()}
				class="fill-dmpaperx2 absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center dark:fill-white"
			>
				<svg viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
					<path
						fill-rule="evenodd"
						d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>

			<input
				type="text"
				bind:value={searchTerm}
				class="dark:bg-dmpaper border-jumia-border-color focus-visible:!border-jumia-border-color h-full w-full rounded-full border px-10 focus-visible:outline-none"
			/>
		</div>
		<div class="h-[168px] overflow-y-auto">
			{#each rendered as value, idx (idx)}
				<label class="flex cursor-pointer items-center justify-start gap-2">
					<input
						bind:group={selected}
						{value}
						checked={isSelected(value)}
						onchange={onOptionSelect}
						type="checkbox"
						class="checkbox checkbox-primary h-[20px] w-[20px]"
					/>
					<span>Size: {value}</span>
				</label>
			{:else}
				{#if searchTerm.length > 0}
					<p class="first-letter:capitalize">no results for {searchTerm}</p>
				{:else}
					<p class="first-letter:capitalize">loading list...</p>
				{/if}
			{/each}
		</div>
	</div>
</div>
