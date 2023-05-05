<script lang="ts">
	function handleClickEdit() {
		location.href = `${location.href}/edit`;
	}
</script>

<button type="button" class="btn variant-filled" on:click={handleClickEdit}>
	<span><i class="fa-solid fa-pen-to-square" /></span>
	<span>Edit</span>
</button>
