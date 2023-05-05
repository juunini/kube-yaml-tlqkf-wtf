<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { user as getUser } from 'github-api-helper';

	import { githubUser } from '@/lib/store';

	$: personalAccessToken = '';
	$: loading = false;

	async function handleClick() {
		loading = true;

		const data = await getUser({ accessToken: personalAccessToken });
		const _author = {
			id: data.id,
			name: data.name,
			avatar_url: data.avatar_url,
			login: data.login,
			pat: personalAccessToken,
			bio: data.bio,
			email: data.email
		};

		loading = false;

		githubUser.set(_author);
	}

	async function handlePressEnter(e: KeyboardEvent) {
		if (loading) {
			return;
		}

		if (e.key === 'Enter') {
			await handleClick();
		}
	}
</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-xs">
	<div class="input-group-shim">
		{#if loading}
			<ProgressRadial
				stroke={100}
				meter="stroke-primary-500"
				track="stroke-primary-500/30"
				width="w-6"
			/>
		{:else}
			<i class="fa-solid fa-right-to-bracket" />
		{/if}
	</div>
	<input
		type="text"
		placeholder="Insert GitHub PAT"
		bind:value={personalAccessToken}
		on:keydown={handlePressEnter}
	/>
	<button class="variant-filled-secondary" on:click={handleClick} disabled={loading}>
		Login
	</button>
</div>
