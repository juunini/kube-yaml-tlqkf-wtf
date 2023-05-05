<script lang="ts">
	export let label: string = '';
	export let placeholder: string = '';
	export let value: string;
	export let rounded: boolean = false;
</script>

{#if label}
	<label class="label">
		<span>{@html label}</span>
		<input
			class={`input${rounded ? '' : ' variant-form-material'}`}
			type="text"
			placeholder={placeholder || label}
			bind:value
		/>
	</label>
{:else}
	<input
		class={`input${rounded ? '' : ' variant-form-material'}`}
		type="text"
		placeholder={placeholder || label}
		bind:value
	/>
{/if}
