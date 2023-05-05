<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Component from './Input.svelte';
</script>

<Meta title="Components/Input" component={Component} />

<Template let:args>
	<Component {...args} />
</Template>

<Story
	name="Input"
	args={{
		label: 'Label',
		placeholder: 'Placeholder',
		value: '',
		rounded: true
	}}
/>
