<script lang="ts">
	import { page } from '$app/state';
	import { useOrigin } from '$lib/hooks/use-origin.svelte';
	import ApiAlert from '$lib/components/widgets/APIAlert.svelte';

	interface Props {
		entityName: string;
		entityIdName: string;
	}

	let { entityIdName, entityName }: Props = $props();

	const { origin } = useOrigin();

	const baseUrl = `${origin}/api`;
</script>

<ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`} />

<ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />

<ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`} />

<ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />

<ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
