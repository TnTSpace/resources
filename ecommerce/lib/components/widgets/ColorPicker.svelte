<script lang="ts">
	import { toast } from "svelte-sonner";
	import EyeDropperIcon from "../icons/EyeDropperIcon.svelte";
	import { Button } from "../ui/button";


	interface Props {
		getColor: (color: string) => void
	}

	let { getColor }: Props = $props()

	const rgbaToHex = (rgba: string) => {
		const match = rgba.match(
			/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
		);

		if (match && match.length === 4) {
			let r = `${match[1]}`.toString();
			let g = `${match[2]}`.toString();
			let b = `${match[3]}`.toString();

			if (r.length == 1) r = '0' + r;
			if (g.length == 1) g = '0' + g;
			if (b.length == 1) b = '0' + b;

			return `#${r}${g}${b}`;
		} else return rgba;
	};


	const pickColor = async () => {
		console.log("picking color")
		if ('EyeDropper' in window) {
			// @ts-ignore
			let eyeDrop = new EyeDropper();
			try {
				// Enter eyedropper mode
				const { sRGBHex } = await eyeDrop.open();

				const color = rgbaToHex(sRGBHex)
				getColor(color)
			} catch (error: any) {
				console.log(error);
				toast.error(error.message)
			}
		}
	};
</script>

<Button
 onclick={pickColor}
	variant="ghost"
	class="hover:bg-inherit flex size-10 items-center justify-center bg-gradient-to-br from-primary to-primary/50 dark:to-primary/10 rounded-full cursor-pointer text-[1rem] p-4 shadow-md"
>
  <EyeDropperIcon class="size-4 text-white" />
</Button>