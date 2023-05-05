<script lang="ts">
	export let name: string;
	export let avatarUrl: string = '';
</script>

<div class="flex flex-row items-center">
	<span class="font-bold mr-2">{name}</span>
	{#if avatarUrl}
		<img src={avatarUrl} alt="avatar" class="w-8 h-8 rounded-full" />
	{/if}
</div>
