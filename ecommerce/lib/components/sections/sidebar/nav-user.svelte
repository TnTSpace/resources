<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import LogOut from 'lucide-svelte/icons/log-out';
	import type { iUser } from '$lib/interface';
	import {
		ClerkLoaded,
		ClerkLoading,
		SignedIn,
		SignedOut,
		SignOutButton,
		UserButton
	} from 'svelte-clerk';
	import ModeToggle from '$lib/components/widgets/ModeToggle.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Button } from '$lib/components/ui/button';
	import { UserIcon } from 'lucide-svelte';
	import User from '$lib/components/widgets/User.svelte';

	interface Props {
		user: iUser;
	}

	let { user }: Props = $props();
	const sidebar = useSidebar();
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem class="flex items-center gap-1">
		<div class="flex items-center gap-1">
			<User />
		</div>
		<div class="grid flex-1 text-left text-sm leading-tight">
			<span class="truncate font-semibold">{user.firstName}</span>
			<span class="truncate text-xs">{user.nameTag}</span>
		</div>
		<!-- <DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						{...props}
					>
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image src={user.image} alt={user.name} />
							<Avatar.Fallback class="rounded-lg"
								>{user.firstName[0]}{user.lastName ? user.lastName[0] : ''}</Avatar.Fallback
							>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
						<ChevronsUpDown class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image src={user.image} alt={user.name} />
							<Avatar.Fallback class="rounded-lg"
								>{user.firstName[0]}{user.lastName ? user.lastName[0] : ''}</Avatar.Fallback
							>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<SignOutButton>
						<div class="flex items-center w-full h-full outline-none">
							<LogOut />
							Log out
						</div>
					</SignOutButton>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root> -->
	</Sidebar.MenuItem>
</Sidebar.Menu>
