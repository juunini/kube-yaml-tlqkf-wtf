<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Component from './Variables.svelte';
	import { writable } from 'svelte/store';
</script>

<Meta title="Components/posts/Variables" component={Component} />

<Template let:args>
	<Component {...args} />
</Template>

<Story
	name="Readonly"
	args={{
		readonlyVariables: [{ name: 'sample', description: '샘플입니다.' }],
		replacements: [{ origin: '', value: '' }]
	}}
/>

<Story
	name="Editable"
	args={{
		variables: writable([{ name: '', description: '' }]),
		editable: true
	}}
/>
