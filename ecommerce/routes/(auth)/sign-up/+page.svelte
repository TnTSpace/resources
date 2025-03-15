<script lang="ts">
	import { SignUp, ClerkLoading, ClerkLoaded } from 'svelte-clerk';
	import { mode } from 'mode-watcher';
	import { dark } from '@clerk/themes';
	import { SpinLoader } from '@toolsntuts/svelte-components'

	let baseTheme = $derived($mode === 'dark' ? [dark] : []);
	let variables = $state(
		$mode === 'dark'
			? {
					colorPrimary: '#6e81ec',
					colorBackground: '#121421',
					colorTextOnPrimaryBackground: '#fff'
				}
			: {}
	);
</script>

<div class="flex flex-col items-center justify-center">
	<ClerkLoading>
		<SpinLoader class="size-16" />
	</ClerkLoading>
	<ClerkLoaded>
		<SignUp
			appearance={{
				baseTheme,
				variables,
				layout: {
					logoImageUrl: '/logo.svg'
				}
			}}
		/>
	</ClerkLoaded>
</div>
