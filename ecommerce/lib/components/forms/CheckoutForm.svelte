<script lang="ts">
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { removeRingClasses, type iResult } from '@toolsntuts/utils';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import { getContext } from 'svelte';
	import type {
		iPaystackParams,
		iPaystackRes,
		iOrderItem,
		iUser,
		iXataCart,
		iProduct,
		iShipping,
		iShippingType,

		iImage,

		iPhone


	} from '$lib/interface';
	import { Textarea } from '$lib/components/ui/textarea';
	import { cn } from '$lib/utils';
	import { cartStore, modalStore } from '$lib/stores';
	import { page } from '$app/state';
	import type { Writable } from 'svelte/store';
	import { getAmount } from '$lib/fxn';
	import SpinLoader from '$lib/components/widgets/SpinLoader.svelte';
	import TelInput from '$lib/components/widgets/TelInput.svelte';
	import ShippingDialog from '$lib/components/frontend/ShippingDialog.svelte';
	import ShippingTypeSelect from '$lib/components/selects/ShippingTypeSelect.svelte';
	import { Card } from '$lib/components/ui/card';

	interface Props {
		disableHeading?: boolean;
		shippingLocation: Writable<Partial<iShipping>>;
		shippingType: Writable<iShippingType>;
	}

	let { disableHeading = false, shippingLocation, shippingType }: Props = $props();

	const title = 'Checkout Order';
	const description = 'Fill in your details below';

	const me = getContext('me') as iUser;

	let amount = $derived(
		$cartStore.reduce(
			(acc, cur) => (acc += (cur.product as iProduct).price * (cur.quantityOrdered as number)),
			0
		) + getAmount($shippingLocation[$shippingType.type], $shippingLocation.miscellaneous)
	);

	const getCartDetails = () => {
		let orderItems: Partial<iOrderItem>[] = [];

		const modalCartItems = $modalStore.data as iXataCart[];

		const cartItems = modalCartItems ? modalCartItems : $cartStore;

		cartItems.forEach((cartItem) => {
			const order: Partial<iOrderItem> = {
				name: (cartItem.product as iProduct).name,
				quantity: Number(cartItem.quantityOrdered),
				size: cartItem.sizeOrdered as string,
				color: cartItem.colorOrdered as string,
				image: ((cartItem.product as iProduct).thumbnail as iImage).url,
				price: Number((cartItem.product as iProduct).price),
				product: (cartItem.product as iProduct).xata_id,
				user: me.xata_id
			};
			orderItems = [...orderItems, order];
		});
		return { orderItems };
	};

	const initialName = me ? `${me.firstName}${me.lastName ? ' ' + me.lastName : ''}` : undefined;
	let name = $state(initialName);
	let email = $state(me ? me.email : undefined);
	let phone = $state('');

	let loading = $state(false);

	const pathname = page.url.pathname;

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);

		const entries = Object.fromEntries(formData.entries());

		try {
			loading = true;

			const { orderItems } = getCartDetails();
			const params: iPaystackParams = {
				amount: amount * 100,
				reference: Date.now().toString(),
				name: entries.name as string,
				email: entries.email as string,
				metadata: {
					details: {
						...entries,
						user: me.xata_id,
						shippingType: $shippingType ? $shippingType.type : 'standard',
						shippingLocation: $shippingLocation ? $shippingLocation.location : 'Outside Lagos',
						shippingAmount: $shippingType ? $shippingType.amount : 0,
						products: orderItems.map((orderItem) => orderItem.product as string)
					},
					orderItems
				}
			};
			const options: RequestInit = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(params)
			};
			console.log({ params })
			const url = '/api/paystack';
			const response = await fetch(url, options);
			const { message, status, data } = (await response.json()) as iResult;
			if (status === 'error') {
				console.trace(message);
				toast.error(message);
			} else {
				const paystackRes = data as iPaystackRes;
				toast.success(paystackRes.message);
				location.href = paystackRes.data.authorization_url;
			}
		} catch (error: any) {
			console.trace(error.message);
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};

	const getvalue = (iphone: iPhone) => {
		phone = iphone.value;
	};
	
	const onShippingLocationSelect = (location: iShipping) => {
		$shippingLocation = location;
	};

	const onShippingFeeSelect = (type: iShippingType) => ($shippingType = type);

	const outsideLagos = () => {
		$shippingType = {
			amount: 0,
			type: 'standard'
		};

		$shippingLocation = {
			country: 'N/A',
			state: 'N/A',
			location: 'N/A',
			standardNote: 'N/A',
			standard: 0,
			expressNote: 'N/A',
			express: 0,
			miscellaneous: 0
		};
	};
</script>

<div class="space-y-2">
	{#if !disableHeading}
		<Heading class="text-start" {title} {description} />
		<Separator />
	{/if}
	{#if $cartStore.length}
		<fieldset class="space-y-1">
			<legend class="text-sm text-muted-foreground">Select Shipping Location</legend>
			<div class="grid grid-cols-2 gap-2">
				<ShippingDialog onselect={onShippingLocationSelect} />
				<Button onclick={outsideLagos}>Outside Lagos</Button>
			</div>
		</fieldset>
		{#if $shippingLocation.location !== 'N/A'}
			<ShippingTypeSelect shipping={$shippingLocation} onselect={onShippingFeeSelect} />
		{:else}
			<Card class="p-4 text-sm text-muted-foreground dark:bg-secondary"
				>For deliveries outside Lagos, Nigeria, please contact us on WhatsApp after placing your order to confirm your shipping fee.</Card
			>
		{/if}
		<form {onsubmit} class="flex w-full flex-col gap-4">
			<div>
				<Label for="name">Name</Label>
				<Input
					id="name"
					disabled={loading}
					required
					placeholder="Name"
					name="name"
					bind:value={name}
					class={removeRingClasses()}
				/>
			</div>
			<div>
				<Label for="email">Email</Label>
				<Input
					id="email"
					disabled={loading}
					required
					placeholder="Email"
					type="email"
					name="email"
					bind:value={email}
					class={removeRingClasses()}
				/>
			</div>
			<div>
				<Label for="address">Address</Label>
				<Textarea
					id="address"
					disabled={loading}
					required
					placeholder="Enter your shipping address..."
					name="address"
					class={cn('resize-none', removeRingClasses())}
				/>
			</div>
			<div>
				<input type="text" class="hidden" name="phone" bind:value={phone} />
				<TelInput {getvalue} />
			</div>
			{#if me}
				{#if loading}
					<Button>
						<SpinLoader />
					</Button>
				{:else}
					<Button type="submit">Checkout</Button>
				{/if}
			{:else}
				<Button href={`/sign-in/?redirect=${pathname}`}>Checkout</Button>
			{/if}
		</form>
	{/if}
</div>
