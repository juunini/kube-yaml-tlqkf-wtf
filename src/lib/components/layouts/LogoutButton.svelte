<script lang="ts">
	import { githubUser } from '@/lib/store';

	function handleClick() {
		githubUser.set(null);
	}
</script>

<button type="button" class="btn variant-filled" on:click={handleClick}>
	<i class="fa-solid fa-right-from-bracket" />
</button>
