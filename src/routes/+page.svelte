<script lang="ts">
	import { onMount } from 'svelte';

	import { Post } from '@/lib/database/post.entity';
	import { db } from '@/lib/store';
	import { database } from '@/lib/database/sqlite';
	import { writable } from 'svelte/store';
	import { user } from 'github-api-helper';

	interface PostMetadata {
		id: string;
		title: string;
		tags: string[];
		author: {
			name: string;
			avatarUrl: string;
		};
		created: Date;
		updated: Date;
	}

	const posts = writable<PostMetadata[]>([]);

	onMount(async () => {
		if ($db === null) {
			db.set(await database());
		}

		const recentPosts = Post.getRecent($db!);
		const search = new URLSearchParams(location.search).get('search');

		if (search !== '' && search !== null) {
			const searchResults = $db!.exec(`
				SELECT *
				FROM posts
				WHERE tags LIKE '%${search}%'
				AND active = true
			`)[0];

			if (searchResults === undefined) {
				return;
			}

			const data = await Promise.all(
				searchResults.values.map((post) =>
					user({ id: post[3] as number }).then((author) => ({
						id: post[0] as string,
						title: post[1] as string,
						tags: (post[2] as string).split('|'),
						author: {
							name: author.name,
							avatarUrl: author.avatar_url
						},
						created: new Date(post[4] as number),
						updated: new Date(post[5] as number)
					}))
				)
			);

			posts.set(data);
			return;
		}

		const data = await Promise.all(
			recentPosts.map((post) =>
				user({ id: post.authorId }).then((author) => ({
					id: post.id,
					title: post.title,
					tags: post.tags,
					author: {
						name: author.name,
						avatarUrl: author.avatar_url
					},
					created: post.created,
					updated: post.updated
				}))
			)
		);
		posts.set(data);
	});
</script>

<svelte:head>
	<title>Kube YAML tlqkf wtf</title>
	<meta name="description" content="Kube YAML tlqkf wtf" />
</svelte:head>

<a
	class="flex flex-row card card-hover p-4 gap-2 items-center justify-center mb-6"
	href="/posts/new"
>
	<span><i class="fa-solid fa-plus" /></span>
	<span>new</span>
</a>

{#each $posts as post}
	<a class="flex flex-col card card-hover p-4 gap-6" href={`/posts/${post.id}`}>
		<div class="flex flex-row items-center">
			<h1 class="flex-1">{post.title}</h1>
			<span>{post.updated.toLocaleString()}</span>
		</div>

		<div class="flex flex-row gap-2">
			{#each post.tags as tag}
				<span class="chip variant-filled">{tag}</span>
			{/each}
		</div>

		<div class="flex flex-row items-center">
			<span class="font-bold mr-2">{post.author.name}</span>
			<img src={post.author.avatarUrl} alt="avatar" class="w-8 h-8 rounded-full" />
		</div>
	</a>
{/each}
