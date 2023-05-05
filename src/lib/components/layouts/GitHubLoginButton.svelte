<script lang="ts">
	import { loginURL } from 'github-api-helper';

	import { GITHUB_APPS_CLIENT_ID } from '@/lib/config';
	import { onMount } from 'svelte';

	let githubLoginURL: URL;

	onMount(() => {
		githubLoginURL = loginURL({
			clientId: GITHUB_APPS_CLIENT_ID,
			state: location.href
		});
	});
</script>

<a href={githubLoginURL && githubLoginURL.toString()} class="btn variant-filled">
	<i class="fa-brands fa-github mr-2" />
	GitHub Login
</a>
