<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	import { githubUser } from '@/lib/store';
	import PatLoginButton from './PatLoginButton.svelte';
	import LogoutButton from './LogoutButton.svelte';
	import User from './User.svelte';
</script>

<AppBar class="mb-6">
	<svelte:fragment slot="lead">
		<a href="/" class="font-bold">Kube YAML tlqkf wtf</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		{#if $githubUser}
			<User name={$githubUser.name} avatarUrl={$githubUser.avatar_url} />
			<LogoutButton />
		{:else}
			<PatLoginButton />
		{/if}
		<LightSwitch />
	</svelte:fragment>

	<!-- <svelte:fragment slot="headline">
	</svelte:fragment> -->
</AppBar>
