<script lang="ts">
	import { commit } from 'github-api-helper';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';

	import { migrate } from '@/lib/database/migrate';
	import { databaseFromGitHub } from '@/lib/database/sqlite';
	import { localStorageDatabase } from '@/lib/store';
	import * as config from '@/lib/config';

	export let id: string;

	const loading = writable(false);

	async function handleClickDelete() {
		if (confirm('삭제 하시겠습니까?')) {
			loading.set(true);

			const database = await databaseFromGitHub();
			migrate(database);
			database.run(`UPDATE posts SET active = false WHERE id = '${id}'`);

			const data = JSON.stringify(Array.from(database.export()));
			localStorageDatabase.set(Array.from(database.export()));

			await commit({
				accessToken: config.DATABASE_REPOSITORY_ACCESS_TOKEN,
				owner: config.DATABASE_REPOSITORY_OWNER,
				repo: config.DATABASE_REPOSITORY_NAME,
				branch: config.DATABASE_REPOSITORY_BRANCH,
				committer: {
					name: config.DATABASE_REPOSITORY_COMMITTER_NAME,
					email: config.DATABASE_REPOSITORY_COMMITTER_EMAIL
				},
				files: [
					{
						path: config.DATABASE_REPOSITORY_PATH,
						data
					}
				],
				message: config.DATABASE_REPOSITORY_COMMIT_MESSAGE
			})
				.then(() => {
					alert('삭제 완료');
					window.location.href = `/`;
				})
				.catch((error) => {
					alert(`${error.message}\n잠시 후 다시 시도해주세요`);
				})
				.then(() => loading.set(false));
		}
	}
</script>

<button type="button" class="btn variant-filled" on:click={handleClickDelete}>
	<span>
		{#if $loading}
			<ProgressRadial
				stroke={100}
				meter="stroke-primary-500"
				track="stroke-primary-500/30"
				width="w-6"
			/>
		{:else}
			<i class="fa-solid fa-trash" />
		{/if}
	</span>
	<span>Delete</span>
</button>
