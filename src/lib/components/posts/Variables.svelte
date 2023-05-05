<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
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
				description: ''
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
			<div class="input-group-shim">{variable.name}</div>
			<div class="input-group-shim">{variable.description}</div>
			{#if replacements[index]}
				<input
					type="text"
					class="input"
					placeholder="Value"
					bind:value={replacements[index].value}
				/>
			{/if}
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
			<div class="flex flex-row input-group input-group-divider">
				<div class="input-group-shim">Name</div>
				<input type="text" class="input" placeholder="Name" bind:value={variable.name} />
				<div class="input-group-shim">Description</div>
				<input
					type="text"
					class="input"
					placeholder="Description"
					bind:value={variable.description}
				/>
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
