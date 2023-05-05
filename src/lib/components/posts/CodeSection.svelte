<script lang="ts">
	import { AppRail, AppRailTile, CodeBlock } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import { onMount } from 'svelte';

	import './View.css';
	import type { FileContent } from './interfaces';
	import { knownExtensions } from './knownExtensions';

	export let storeValue: Writable<number>;
	export let contents: string;
	export let files: Writable<FileContent[]>;
	export let writeMode: boolean = false;

	const language = writable('yaml');

	function setLanguage(index: number) {
		language.set(
			knownExtensions.includes($files[index]?.name.split('.').pop() as string)
				? ($files[index]?.name.split('.').pop() as string)
				: 'yaml'
		);
	}

	storeValue.subscribe(setLanguage);

	onMount(() => {
		const interval = setInterval(() => {
			if ($files[0]?.name === undefined || $files[0]?.name === '') return;

			setLanguage(0);
			clearInterval(interval);
		}, 500);
	});

	const handleClickRailTile = (index: number) => storeValue.set(index);
	const handleClickRemove = (index: number) =>
		files.update((prev) => {
			storeValue.set(0);
			prev.splice(index, 1);
			return prev;
		});
	const handleClickAddFile = () =>
		files.update((prev) => [
			...prev,
			{
				name: 'new-file.yaml',
				content: '\n'
			}
		]);
</script>

{#if writeMode}
	<div class="card bg-surface-50-900-token grid grid-cols-[auto_1fr] w-full mb-6">
		<AppRail selected={storeValue}>
			{#each $files as file, index}
				<button
					type="button"
					class="app-rail-tile unstyled grid place-content-center place-items-center w-full aspect-square space-y-1.5 cursor-pointer bg-primary-hover-token bg-primary-active-token !flex !flex-row"
					on:click={() => handleClickRailTile(index)}
				>
					<input
						type="text"
						class="input !bg-transparent app-rail-tile-label font-bold text-xs text-center"
						bind:value={file.name}
					/>
					{#if index !== 0}
						<button
							type="button"
							class="btn-icon btn-icon-sm variant-ghost !mt-0 mr-2"
							on:click={() => handleClickRemove(index)}
						>
							<i class="fa-solid fa-minus" />
						</button>
					{/if}
				</button>
			{/each}

			<button type="button" class="btn variant-ringed w-full mt-4" on:click={handleClickAddFile}>
				<span><i class="fa-solid fa-plus" /></span>
				<span>Add File</span>
			</button>
		</AppRail>

		<div class="flex flex-row">
			<textarea
				class="textarea flex-1"
				rows="4"
				placeholder="Enter yaml here..."
				bind:value={$files[$storeValue].content}
			/>

			<CodeBlock class="flex-1" language={$language} code={$files[$storeValue].content} />
		</div>
	</div>
{:else}
	<div class="card bg-surface-50-900-token grid grid-cols-[auto_1fr] w-full mb-6">
		<AppRail selected={storeValue}>
			{#each $files as file, index}
				<AppRailTile label={file.name} value={index} />
			{/each}
		</AppRail>

		<CodeBlock language={$language} code={contents} />
	</div>
{/if}
