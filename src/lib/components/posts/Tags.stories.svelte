<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Component from './Tags.svelte';
</script>

<Meta title="Components/posts/Tags" component={Component} />

<Template let:args>
	<Component {...args} />
</Template>

<Story
	name="Readonly"
	args={{
		tags: ['tag1', 'tag2', 'tag3']
	}}
/>

<Story
	name="Editable"
	args={{
		tags: ['tag1', 'tag2', 'tag3'],
		editable: true
	}}
/>
