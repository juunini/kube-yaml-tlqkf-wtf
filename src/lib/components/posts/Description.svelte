<script lang="ts">
	export let editable: boolean = false;
	export let description: string;
</script>

{#if editable}
	<div class="grid grid-cols-2">
		<textarea class="textarea" placeholder="Insert Description here..." bind:value={description} />
		<div class="card p-2">{@html marked.parse(description, { breaks: true })}</div>
	</div>
{:else}
	<div class="mb-6">{@html marked.parse(description, { breaks: true })}</div>
{/if}
