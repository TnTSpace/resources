<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group/index.js';
	import type { iShipping, iShippingType } from '$lib/interface';
	import { Label } from '$lib/components/ui/label';
	import { getAmount } from '$lib/fxn';

	interface Props {
		shipping: Partial<iShipping>;
		onselect: (type: iShippingType) => void;
	}

	let { shipping, onselect }: Props = $props();
	const { express, expressNote, standard, standardNote, miscellaneous } = shipping;

	let type = $state<iShippingType>({
		amount: Number(standard) + Number(miscellaneous),
		type: 'standard'
	});

	const onValueChange = (value: any) => {
		console.log({ value });

		switch (value) {
			case 'express':
				type = { amount: getAmount(express, miscellaneous), type: 'express' }
				break;
			case 'standard':
				type = { amount: getAmount(standard, miscellaneous), type: 'standard' }
		}

		console.log({ amount: type.amount, from: "ShippingTypeSelect" })
		onselect(type);
	};

	const items = [
		{ id: 'standard', label: 'Standard Shipping', price: `₦${getAmount(standard, miscellaneous).toLocaleString()}`, value: 'standard', note: standardNote },
		{ id: 'express', label: 'Express Shipping', price: `₦${getAmount(express, miscellaneous).toLocaleString()}`, value: 'express', note: expressNote },
	];

	let selectedValue = $state('standard');
</script>

<fieldset class="space-y-4">
	<legend class="text-sm font-medium leading-none text-foreground capitalize">Select {shipping.location} shipping type</legend>
	<RadioGroup
		class="gap-0 -space-y-px rounded-lg shadow-sm shadow-black/[.04]"
		bind:value={selectedValue} {onValueChange}
	>
		{#each items as item (item.id)}
			<div
				class="relative flex flex-col gap-4 border border-input/50 p-4 first:rounded-t-lg last:rounded-b-lg has-[[data-state=checked]]:z-10 has-[[data-state=checked]]:border-ring/50 has-[[data-state=checked]]:bg-accent"
			>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<RadioGroupItem
							id={item.id}
							value={item.value}
							class="after:absolute after:inset-0"
							aria-describedby={`${item.id}-price`}
						/>
						<Label
							class="flex items-baseline leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
							for={item.id}
						>
							{item.label}
							<span
								class="-mt-1 ml-2 inline-flex items-center rounded-full border border-primary-500/30 bg-primary-300/15 dark:border-white/30 dark:bg-white/15 px-1 py-0.5 text-[10px] font-medium uppercase text-primary-600 dark:text-white"
							>
								{item.note}
							</span>
						</Label>
					</div>
					<div id={`${item.id}-price`} class="text-xs leading-[inherit] text-muted-foreground">
						{item.price}
					</div>
				</div>
			</div>
		{/each}
	</RadioGroup>
</fieldset>