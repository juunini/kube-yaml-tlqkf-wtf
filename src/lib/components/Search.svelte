<script lang="ts">
	import { writable } from 'svelte/store';
	import { InputChip } from '@skeletonlabs/skeleton';

	const searchTags = writable<string[]>([]);

	function handleClickSearch() {
		location.href = `/?search=${$searchTags.join(',')}`;
	}
</script>

<div class="card p-6 mb-6 flex flex-row gap-2">
	<InputChip
		bind:value={$searchTags}
		name="chips"
		placeholder="Enter tags here and press enter..."
	/>
	<button type="button" class="btn variant-filled-surface" on:click={handleClickSearch}>
		Search
	</button>
</div>
