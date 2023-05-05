<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { popup } from '@skeletonlabs/skeleton';

	import type { ReplacementVariable, Variable } from './interfaces';

	export let variables: Writable<Variable[]> = writable([]);
	export let readonlyVariables: Variable[] = [];
	export let replacements: ReplacementVariable[] = [];
	export let editable: boolean = false;

	const handleClickVariableAdd = () =>
		variables.update((prev) => [
			...prev,
			{
				name: '',
				description: '',
				default: ''
			}
		]);
	const handleClickVariableRemove = (index: number) =>
		variables.update((prev) => {
			prev.splice(index, 1);
			return prev;
		});
</script>

{#if replacements.length !== 0}
	{#each readonlyVariables as variable, index}
		<div class="flex flex-row input-group input-group-divider">
			<div class="input-group-shim">
				{variable.name}
				<button
					type="button"
					class="btn-icon variant-filled-surface w-6 h-6 !p-0 ml-2"
					use:popup={{
						event: 'hover',
						target: `popup-${index}`,
						placement: 'right-end'
					}}
				>
					<i class="fa-solid fa-question flex-1" />
				</button>
			</div>
			{#if replacements[index]}
				<input
					type="text"
					class="input"
					placeholder="Value"
					bind:value={replacements[index].value}
				/>
			{/if}
		</div>

		<div class="card variant-filled-surface p-4" data-popup={`popup-${index}`}>
			{variable.description}
			<div class="arrow variant-filled-surface" />
		</div>
	{/each}
{/if}

{#if editable}
	<div class="card mb-6 p-6 flex flex-col gap-2">
		<h2 class="flex flex-row items-center gap-4">
			<span>Variables</span>

			<button type="button" class="btn variant-filled" on:click={handleClickVariableAdd}>
				<span><i class="fa-solid fa-plus" /></span>
				<span>Add</span>
			</button>
		</h2>

		{#each $variables as variable, index}
			<div class="grid grid-flow-col input-group input-group-divider">
				<div class="input-group-shim">Name</div>
				<input type="text" class="input" placeholder="Name" bind:value={variable.name} />
				<div class="input-group-shim">Description</div>
				<input
					type="text"
					class="input"
					placeholder="Description"
					bind:value={variable.description}
				/>
				<div class="input-group-shim">Default</div>
				<input type="text" class="input" placeholder="Default" bind:value={variable.default} />
				<button
					type="button"
					class="btn variant-filled"
					on:click={() => handleClickVariableRemove(index)}
				>
					<span><i class="fa-solid fa-minus" /></span>
					<span>Remove</span>
				</button>
			</div>
		{/each}
	</div>
{/if}
