<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';

  interface Props {
    onselectcolor: () => void
  }

  let { onselectcolor }: Props = $props()

	let selectedColor = $state('black');

  const onchange = (evt: Event) => {
    console.log({ selectedColor, evt })
    onselectcolor()
  }
</script>

<fieldset class="space-y-4">
	<legend class="text-sm font-medium leading-none text-foreground">Choose a color</legend>
	<RadioGroup {onchange} class="grid grid-cols-6 gap-2" bind:value={selectedColor}>
		<RadioGroupItem
			value="blue"
			id="radio-07-blue"
			aria-label="Blue"
			class="size-6 border-blue-500 bg-blue-500 shadow-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
		/>
		<RadioGroupItem
			value="indigo"
			id="radio-07-indigo"
			aria-label="Indigo"
			class="size-6 border-indigo-500 bg-indigo-500 shadow-none data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500"
		/>
		<RadioGroupItem
			value="pink"
			id="radio-07-pink"
			aria-label="Pink"
			class="size-6 border-pink-500 bg-pink-500 shadow-none data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500"
		/>
		<RadioGroupItem
			value="red"
			id="radio-07-red"
			aria-label="Red"
			class="size-6 border-red-500 bg-red-500 shadow-none data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500"
		/>
		<RadioGroupItem
			value="orange"
			id="radio-07-orange"
			aria-label="Orange"
			class="size-6 border-orange-500 bg-orange-500 shadow-none data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
		/>
		<RadioGroupItem
			value="yellow"
			id="radio-07-yellow"
			aria-label="Yellow"
			class="size-6 border-yellow-500 bg-yellow-500 shadow-none data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500"
		/>
		<RadioGroupItem
			value="green"
			id="radio-07-green"
			aria-label="Green"
			class="size-6 border-green-500 bg-green-500 shadow-none data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500"
		/>
		<RadioGroupItem
			value="black"
			id="radio-07-black"
			aria-label="Black"
			class="size-6 border-black bg-black shadow-none data-[state=checked]:border-black data-[state=checked]:bg-black"
		/>
		<RadioGroupItem
			value="white"
			id="radio-07-white"
			aria-label="White"
			class="size-6 border-white bg-white shadow-none data-[state=checked]:border-white data-[state=checked]:bg-white"
		/>
		<RadioGroupItem
			value="gray"
			id="radio-07-gray"
			aria-label="Gray"
			class="size-6 border-gray-500 bg-gray-500 shadow-none data-[state=checked]:border-gray-500 data-[state=checked]:bg-gray-500"
		/>
		<RadioGroupItem
			value="brown"
			id="radio-07-brown"
			aria-label="Brown"
			class="size-6 border-[#964B00] bg-[#964B00] shadow-none data-[state=checked]:border-[#964B00] data-[state=checked]:bg-[#964B00]"
		/>
		<RadioGroupItem
			value="cream"
			id="radio-07-cream"
			aria-label="Cream"
			class="size-6 border-[#FFFDD0] bg-[#FFFDD0] shadow-none data-[state=checked]:border-[#FFFDD0] data-[state=checked]:bg-[#FFFDD0]"
		/>
	</RadioGroup>
</fieldset>