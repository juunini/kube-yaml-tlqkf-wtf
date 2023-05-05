<script lang="ts">
	import { commit, user } from 'github-api-helper';
	import { writable } from 'svelte/store';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	import { databaseFromGitHub } from '@/lib/database/sqlite';
	import * as config from '@/lib/config';
	import { migrate } from '@/lib/database/migrate';
	import { localStorageDatabase, githubUser } from '@/lib/store';
	import type { FileContent, Variable } from './interfaces';
	import { Post } from '@/lib/database/post.entity';

	export let id: string;
	export let title: string;
	export let description: string;
	export let tags: string[];
	export let author: { id: number; name: string };
	export let files: FileContent[];
	export let variables: Variable[];
	export let update: boolean = false;

	const loading = writable(false);

	async function handleClickUpload() {
		loading.set(true);

		const userFromGitHub = await user({ accessToken: $githubUser?.pat });

		if (userFromGitHub.id !== author.id) {
			alert('Unauthorized');
			return;
		}

		const database = await databaseFromGitHub();
		migrate(database);

		if (update) {
			database.run(`
      UPDATE posts
      SET title = '${title}', tags = '${tags.join('|')}', updated = ${Date.now()}
      WHERE id = '${id}'
		`);
		} else {
			database.run(`
				INSERT INTO posts (id, title, tags, authorId)
				VALUES ('${id}', '${title}', '${tags.join('|')}', ${author!.id})
			`);
		}

		const post = Post.getById(database, id);

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
				...files.map((file) => ({
					path: `posts/${id}/contents/${file.name}`,
					data: file.content
				})),
				{
					path: `posts/${id}/description.txt`,
					data: description
				},
				{
					path: `posts/${id}/metadata.json`,
					data: JSON.stringify({
						title: title,
						tags: tags,
						authorId: author.id,
						variables: variables,
						created: post?.created.getTime() || Date.now(),
						updated: Date.now()
					})
				},
				{
					path: config.DATABASE_REPOSITORY_PATH,
					data
				}
			],
			message: config.DATABASE_REPOSITORY_COMMIT_MESSAGE
		})
			.then(() => {
				alert('업로드 완료');
				window.location.href = `/posts/${id}`;
			})
			.catch((error) => {
				alert(`${error.message}\n잠시 후 다시 시도해주세요`);
			})
			.finally(() => loading.set(false));
	}
</script>

<button type="button" class="btn variant-filled-primary" on:click={handleClickUpload}>
	{#if $loading}
		<ProgressRadial stroke={100} meter="stroke-error-500" track="stroke-error-500/30" width="w-6" />
	{/if}
	Upload
</button>
