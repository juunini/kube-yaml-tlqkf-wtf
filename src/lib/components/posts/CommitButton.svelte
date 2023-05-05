<script lang="ts">
	import { commit } from 'github-api-helper';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';

	import * as config from '@/lib/config';
	import type { FileContent, GitHubUser } from './interfaces';

	export let repository: Writable<string>;
	export let branch: Writable<string>;
	export let user: GitHubUser | null;
	export let files: FileContent[];

	const loading = writable(false);

	async function handleClickCommit() {
		if ($repository === '' || $branch === '') {
			alert('Please fill in the repository and branch fields.');
			return;
		}

		if (user === null) {
			alert('Please log in.');
			return;
		}

		loading.set(true);

		commit({
			accessToken: user.pat,
			owner: user.login,
			repo: $repository,
			branch: $branch,
			committer: {
				name: config.DATABASE_REPOSITORY_COMMITTER_NAME,
				email: config.DATABASE_REPOSITORY_COMMITTER_EMAIL
			},
			message: config.DATABASE_REPOSITORY_COMMIT_MESSAGE,
			files: files!.map((file) => ({
				path: file.name,
				data: file.content
			}))
		})
			.then(() => alert('Commit successful.'))
			.catch((error: Error) => alert(error))
			.finally(() => loading.set(false));
	}

	async function handlePressCommit(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			await handleClickCommit();
		}
	}
</script>

<div class="input-group input-group-divider flex flex-row" style="max-width: 400px;">
	<div class="input-group-shim"><i class="fa-solid fa-code-commit" /></div>
	<input
		type="text"
		style="max-width: 150px !important; min-width: 0 !important;"
		placeholder="Repo name*"
		bind:value={$repository}
		on:keypress={handlePressCommit}
	/>
	<input
		type="text"
		style="max-width: 150px !important; min-width: 0 !important;"
		placeholder="Branch*"
		bind:value={$branch}
		on:keypress={handlePressCommit}
	/>
	<button class="btn variant-filled flex-1" on:click={handleClickCommit}>
		{#if $loading}
			<ProgressRadial
				stroke={100}
				meter="stroke-primary-500"
				track="stroke-primary-500/30"
				width="w-6"
			/>
		{/if}
		Commit
	</button>
</div>
