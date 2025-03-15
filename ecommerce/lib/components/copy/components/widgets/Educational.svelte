<script lang="ts">
	import { onMount } from "svelte";
	import type { iRoute } from "../../interface/index.js";
	import { Button } from "../ui/button/index.js";
	import { cn } from "../../utils.js";
	import XIcon from "lucide-svelte/icons/x"
	import MenuIcon from "lucide-svelte/icons/menu"
	import ChevronDownIcon from "lucide-svelte/icons/chevron-down"
	import ChevronRightIcon from "lucide-svelte/icons/chevron-right"

	interface Section {
		id: string;
		title: string;
		content: string;
	}

	interface Props {
		title: string;
		sections: Section[];
		groupTitle?: string;
		lastUpdated: string;
		pages: iRoute[];
		url: URL;
		offset?: number;
		top?: string;
	}

	let { title, sections, lastUpdated, pages, url, offset=104, top="top-[105.6px]", groupTitle="Table of Content" }: Props = $props();
	let location = url;

	let activeSection = $state("");
	let isMobileNavOpen = $state(false);
	let isSectionNavOpen = $state(false);

	const handleScroll = () => {
		const sectionElements = sections.map((section) =>
			document.getElementById(section.id),
		);

		const currentSection = sectionElements.find((element) => {
			if (!element) return false;
			const rect = element.getBoundingClientRect();
			return rect.top <= 100 && rect.bottom > 100;
		});

		if (currentSection) {
			activeSection = currentSection.id;
		}
	};

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);

		if (element) {
			const elementPosition =
				element.getBoundingClientRect().top + window.scrollY;
			window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });

			isSectionNavOpen = false;
		}
	};

	const handleSectionNav = () => {
		isSectionNavOpen = !isSectionNavOpen;
		isMobileNavOpen = false;
	};

	const handleMobileNav = () => {
		isMobileNavOpen = !isMobileNavOpen;
		isSectionNavOpen = false;
	};

	onMount(() => {
		handleScroll();
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	});
</script>

<div class="min-h-screen bg-background">
	<div
		class={cn("flex md:hidden justify-between border-y sticky top-16 left-0 z-[1] bg-background", top)}
	>
		<Button variant="ghost" onclick={handleMobileNav}>
			{#if isMobileNavOpen}
				<XIcon size={24} />
			{:else}
				<MenuIcon size={24} />
			{/if}
		</Button>
		<Button variant="ghost" class="items-end gap-1" onclick={handleSectionNav}>
			On this page
			{#if isSectionNavOpen}
				<ChevronDownIcon size={24} />
			{:else}
				<ChevronRightIcon size={24} />
			{/if}
		</Button>
	</div>

	<nav
		class={cn(
			"fixed left-0 z-40 h-full w-64 transform border-r bg-background p-6 transition-transform duration-200 ease-in-out",
			"md:transform-none",
			isMobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
		)}
	>
		<div class="space-y-6">
			<h2 class="text-xl font-bold">{groupTitle}</h2>
			<ul class="space-y-2">
				{#each pages as { href, name }, i}
					<li>
						<Button
							{href}
							variant="ghost"
							class={cn(
								"block rounded-md p-2 hover:bg-accent",
								location.pathname === href && "bg-accent",
							)}
						>
							{name}
						</Button>
					</li>
				{/each}
			</ul>
		</div>
	</nav>

	<main class="mx-auto max-w-3xl px-4 py-8 md:ml-64 md:mr-64">
		<article class="prose dark:prose-invert">
			<h1 class="mb-6 text-4xl font-bold">{title}</h1>
			<p class="mb-8 text-sm text-muted-foreground">
				Last updated: {lastUpdated}
			</p>
			{#each sections as section, i}
				<section id={section.id} class="mb-8">
					<h2 class="mb-4 text-2xl font-semibold">{section.title}</h2>
					{@html section.content}
				</section>
			{/each}
		</article>
	</main>

	<nav
		class={cn(
			"fixed right-0 top-[105.6px] h-full w-64 transform border-l bg-background p-6 transition-transform duration-200 ease-in-out",
			"md:transform-none",
			isSectionNavOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
		)}
	>
		<div class="sticky top-6">
			<h3 class="mb-4 text-lg font-semibold">On this page</h3>
			<ul class="space-y-2">
				{#each sections as section, i}
					<li>
						<button
							onclick={() => scrollToSection(section.id)}
							class={cn(
								"block w-full py-1 text-left text-sm transition-colors duration-200 hover:text-primary",
								activeSection === section.id
									? "font-medium text-primary"
									: "text-muted-foreground",
							)}
						>
							{section.title}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>
