<script lang="ts">
	import { InputChip } from '@skeletonlabs/skeleton';

	export let tags: string[] = [];
	export let editable: boolean = false;
</script>

{#if editable}
	<div class="card mb-6 flex flex-row">
		<InputChip bind:value={tags} name="chips" placeholder="Enter tags here and press enter..." />
	</div>
{:else}
	<div class="flex flex-row gap-2 mb-6">
		{#each tags as tag}
			<a href={`/?search=${tag}`} class="card chip variant-filled !no-underline">{tag}</a>
		{/each}
	</div>
{/if}
