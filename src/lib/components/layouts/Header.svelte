<script lang="ts">
	import { writable } from 'svelte/store';
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	import { githubUser } from '@/lib/store';
	import PatLoginButton from './PatLoginButton.svelte';
	import LogoutButton from './LogoutButton.svelte';
	import User from './User.svelte';

	const searchText = writable('');

	function handleClickSearch() {
		location.href = `/?search=${$searchText}`;
	}

	function handlePressSearch(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleClickSearch();
		}
	}
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

	<svelte:fragment slot="headline">
		<label class="label">
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim"><i class="fa-solid fa-magnifying-glass" /></div>
				<input
					type="search"
					placeholder="Search..."
					bind:value={$searchText}
					on:keypress={handlePressSearch}
				/>
				<button class="variant-filled-secondary" on:click={handleClickSearch}>Submit</button>
			</div>
		</label>
	</svelte:fragment>
</AppBar>
