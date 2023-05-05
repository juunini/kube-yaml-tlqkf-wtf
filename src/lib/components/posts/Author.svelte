<script lang="ts">
	export let avatarUrl: string;
	export let name: string;
</script>

<div class="flex flex-row gap-4 items-center mb-4">
	{#if avatarUrl && name}
		<img src={avatarUrl} alt={name} class="w-12 h-12 rounded-full" />
		<span>{name}</span>
	{:else}
		<div class="placeholder-circle w-16" />
	{/if}
</div>
