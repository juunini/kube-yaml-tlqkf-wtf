<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	import { githubUser } from '@/lib/store';
	import '@/lib/components/posts/View.css';
	import CodeSection from '@/lib/components/posts/CodeSection.svelte';
	import Variables from '@/lib/components/posts/Variables.svelte';
	import UploadButton from '@/lib/components/posts/UploadButton.svelte';
	import Tags from '@/lib/components/posts/Tags.svelte';
	import Title from '@/lib/components/posts/Title.svelte';
	import Description from '@/lib/components/posts/Description.svelte';
	import { readDescription, readFiles, readMetadata } from '@/lib/utils';
	import type { FileContent, Metadata, Variable } from '@/lib/components/posts/interfaces';

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
	const variables = writable<Variable[]>([]);

	onMount(async () => {
		metadata.set(await readMetadata(id));
		description.set(await readDescription(id));
		files.set(await readFiles(id));

		if ($metadata.authorId !== $githubUser?.id) {
			alert('권한이 없습니다');
			window.location.href = `/posts/${id}`;
			return;
		}
		variables.set($metadata.variables);
	});
</script>

<svelte:head>
	<title>Kube YAML tlqkf wtf | {$metadata.title} edit</title>
	<meta name="description" content={`Kube YAML tlqkf wtf | ${$metadata.title} edit`} />
</svelte:head>

<div class="card mb-6 flex flex-row">
	<Title bind:title={$metadata.title} />
	<UploadButton
		update
		{id}
		title={$metadata.title}
		description={$description}
		tags={$metadata.tags}
		author={{ id: $githubUser?.id || 1, name: $githubUser?.name || '' }}
		files={$files}
		variables={$variables}
	/>
</div>

<Tags bind:tags={$metadata.tags} editable />
<Variables {variables} editable />
<CodeSection {storeValue} {files} contents={$files[$storeValue].content} writeMode />
<Description bind:description={$description} editable />
