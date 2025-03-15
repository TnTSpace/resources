<script lang="ts">
	import SearchBar from '$lib/components/frontend/SearchBar.svelte';

	let features = [
		{ title: 'Categories', description: "Men's Wears, Women's Wears, Wigs, Appliances and More" },
		{
			title: 'Sizes',
			description: "From Small to Extra Large, we've got you covered"
		}
	];
</script>

<div
	class="flex h-screen min-h-[642px] max-h-[720px] items-center justify-center bg-gradient-to-b from-white to-gray-50/50 dark:from-background dark:to-secondary/50 md:h-[calc(100vh-64px)]"
>
	<!-- background pattern -->
	<div
		class="absolute inset-0 rounded-3xl bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#282828_1px,transparent_1px),linear-gradient(to_bottom,#282828_1px,transparent_1px)]"
	></div>

	<section
		class="z-1 absolute mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center space-y-10 px-4 py-8 text-center sm:px-6 lg:px-8"
	>
		<header class="flex flex-col items-center space-y-6">
			<h1
				class="text-primary-500 text-3xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-primary dark:text-white sm:text-7xl"
			>
				Style, Beauty, and Innovation Delivered!
			</h1>z

			<p class="max-w-[600px] text-lg md:text-xl/relaxed xl:text-2xl/relaxed">
				Explore style, beauty, and everyday essentials all in one place at The Market House! 🌟🛍️
			</p>
		</header>
		<SearchBar showBtn={true} class="max-w-lg" />
		<div class="mx-auto grid max-w-3xl grid-cols-1 gap-8 pt-8 md:grid-cols-2 md:gap-16">
			{#each features as { title, description }, i}
				<div class="text-center">
					<div class="text-2xl font-semibold">{title}</div>
					<div class="mt-1 text-sm">{description}</div>
				</div>
			{/each}
		</div>
	</section>
</div>
