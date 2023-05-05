<script lang="ts">
	export let editable: boolean = false;
	export let description: string;
</script>

{#if editable}
	<textarea class="textarea" placeholder="Insert Description here..." bind:value={description} />
{:else}
	<pre class="mb-6">{description}</pre>
{/if}
