<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { v4 } from 'uuid';

	import { githubUser } from '@/lib/store';
	import '@/lib/components/posts/View.css';
	import CodeSection from '@/lib/components/posts/CodeSection.svelte';
	import Variables from '@/lib/components/posts/Variables.svelte';
	import UploadButton from '@/lib/components/posts/UploadButton.svelte';
	import Tags from '@/lib/components/posts/Tags.svelte';
	import Title from '@/lib/components/posts/Title.svelte';
	import Description from '@/lib/components/posts/Description.svelte';
	import type { FileContent, Variable } from '@/lib/components/posts/interfaces';

	onMount(() => {
		if ($githubUser === null) {
			alert('로그인을 먼저 해주셔야 합니다');
			window.location.href = '/';
		}
	});

	const storeValue = writable(0);
	const id = v4();
	const title = writable('');
	const tags = writable<string[]>([]);
	const description = writable('');
	const files = writable<FileContent[]>([
		{
			name: 'kustomization.yaml',
			content: 'resources:\n'
		}
	]);
	const variables = writable<Variable[]>([]);
</script>

<svelte:head>
	<title>Kube YAML tlqkf wtf | new post</title>
	<meta name="description" content="Kube YAML tlqkf wtf | new post" />
</svelte:head>

<div class="card mb-6 flex flex-row">
	<Title bind:title={$title} />
	<UploadButton
		{id}
		title={$title}
		description={$description}
		tags={$tags}
		author={{ id: $githubUser?.id || 1, name: $githubUser?.name || '' }}
		files={$files}
		variables={$variables}
	/>
</div>

<Tags bind:tags={$tags} editable />
<Variables {variables} editable />
<CodeSection {storeValue} {files} contents={$files[$storeValue].content} writeMode />
<Description bind:description={$description} editable />
