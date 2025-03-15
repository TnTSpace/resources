<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';
	import { Input } from '$lib/components/ui/input';
	import { cn } from '$lib/utils';
	import { removeRingClasses } from '@toolsntuts/utils';
	import { Currency, symbolMap } from '$lib/constants';
	import { page } from '$app/state';

	const min = 100;
	const max = 100000;

	const price = page.url.searchParams.get('price');

	const strToNumList = (str: string) => str.split('-').map((str) => Number(str));

	let value = $state(price ? strToNumList(price) : [min, max]);

	const onsubmit = (evt: SubmitEvent) => {
		evt.preventDefault();
		if (value[0] === min && value[1] === max) {
			page.url.searchParams.delete('price');
		} else {
			page.url.searchParams.set('price', value.join('-'));
		}
		location.href = page.url.href;
	};
</script>

<div class="flex flex-col gap-1">
	<Label class="text-sm uppercase text-muted-foreground">Price</Label>
	<form {onsubmit} class="flex flex-col gap-1 space-y-3">
		<div class="flex items-center justify-between gap-2">
			<div class="relative">
				<Input
					class={cn('pl-8', removeRingClasses())}
					placeholder="0.00"
					bind:value={value[0]}
					type="number"
				/>
				<span
					class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
				>
					{symbolMap['naira']}
				</span>
			</div>
			<span>-</span>

			<div class="relative">
				<Input
					class={cn('pl-8', removeRingClasses())}
					placeholder="0.00"
					bind:value={value[1]}
					type="number"
				/>
				<span
					class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
				>
					{symbolMap['naira']}
				</span>
			</div>
		</div>
		<div class="flex items-center gap-4">
			<Slider type="multiple" bind:value {max} {min} step={100} aria-label="Price range slider" />
		</div>
		<Button type="submit">Apply</Button>
	</form>
</div>
