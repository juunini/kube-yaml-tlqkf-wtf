<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	// @ts-expect-error
	import Giscus from '@giscus/svelte';

	import * as config from '@/lib/config';
	import { githubUser } from '@/lib/store';
	import '@/lib/components/posts/View.css';
	import CodeSection from '@/lib/components/posts/CodeSection.svelte';
	import DeleteButton from '@/lib/components/posts/DeleteButton.svelte';
	import EditButton from '@/lib/components/posts/EditButton.svelte';
	import CommitButton from '@/lib/components/posts/CommitButton.svelte';
	import DownloadButton from '@/lib/components/posts/DownloadButton.svelte';
	import Tags from '@/lib/components/posts/Tags.svelte';
	import Variables from '@/lib/components/posts/Variables.svelte';
	import Description from '@/lib/components/posts/Description.svelte';
	import { currentTheme, readDescription, readFiles, readMetadata } from '@/lib/utils';
	import type {
		FileContent,
		Metadata,
		ReplacementVariable
	} from '@/lib/components/posts/interfaces';
	import { type UserResponse, user } from 'github-api-helper';
	import Author from '@/lib/components/posts/Author.svelte';

	const id = $page.params.id;
	const metadata = writable<Metadata>({
		title: '',
		tags: [],
		authorId: 0,
		variables: [],
		created: 0,
		updated: 0
	});
	const description = writable('');
	const files = writable<FileContent[]>([
		{
			name: '',
			content: ''
		}
	]);
	const storeValue = writable(0);
	const repository = writable('');
	const branch = writable('');
	const theme = writable('');
	const variables = writable<ReplacementVariable[]>([]);
	const contents = writable('');
	// @ts-expect-error
	const author = writable<UserResponse>({});
	const updated = writable('');

	function setContents() {
		contents.set(
			$variables.reduce((acc, variable) => {
				return acc.replaceAll(variable.origin, variable.value);
			}, $files[$storeValue].content)
		);
	}

	variables.subscribe(setContents);
	storeValue.subscribe(setContents);

	onMount(async () => {
		metadata.set(await readMetadata(id));
		description.set(await readDescription(id));
		files.set(await readFiles(id));
		theme.set(currentTheme());
		variables.set($metadata.variables?.map((variable) => ({ origin: variable.name, value: '' })));
		author.set(await user({ id: $metadata.authorId }));
		updated.set(
			$metadata.created === $metadata.updated
				? new Date($metadata.updated).toLocaleString()
				: `${new Date($metadata.updated).toLocaleString()} (수정됨)`
		);
	});
</script>

<svelte:head>
	<title>Kube YAML tlqkf wtf | {$metadata.title}</title>
	<meta name="description" content={`Kube YAML tlqkf wtf | ${$metadata.title}`} />
</svelte:head>

<div class="card p-4 mb-6 flex flex-row gap-2">
	<CommitButton {repository} {branch} user={$githubUser} files={$files} />

	<div class="flex-1" />

	<DownloadButton files={$files} title={$metadata.title} />

	{#if $metadata.authorId === $githubUser?.id}
		<EditButton />
		<DeleteButton {id} />
	{/if}
</div>

<section class="card p-4 pt-8 mb-6">
	<h1>{$metadata.title}</h1>
	<div class="mb-6">{$updated}</div>
	<Author avatarUrl={$author.avatar_url} name={$author.name} />
	<Tags tags={$metadata.tags} />
	<Description description={$description} />
	<Variables bind:readonlyVariables={$metadata.variables} bind:replacements={$variables} />
</section>

<CodeSection {storeValue} {files} contents={$contents} />

{#if config.GISCUS_REPO}
	<Giscus
		repo={config.GISCUS_REPO}
		repoId={config.GISCUS_REPO_ID}
		lang="ko"
		theme={$theme}
		category={config.GISCUS_CATEGORY}
		categoryId={config.GISCUS_CATEGORY_ID}
	/>
{/if}
