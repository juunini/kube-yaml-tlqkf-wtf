<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	import { githubUser } from '@/lib/store';
	import PatLoginButton from './PatLoginButton.svelte';
	import LogoutButton from './LogoutButton.svelte';
	import User from './User.svelte';

	function handleClickLogo() {
		location.replace('/');
	}
</script>

<AppBar class="mb-6">
	<svelte:fragment slot="lead">
		<button on:click={handleClickLogo} class="font-bold">Kube YAML tlqkf wtf</button>
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
