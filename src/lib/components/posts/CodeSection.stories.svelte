<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Component from './CodeSection.svelte';
	import { writable } from 'svelte/store';
</script>

<Meta title="Components/posts/CodeSection" component={Component} />

<Template let:args>
	<Component {...args} />
</Template>

<Story
	name="View mode"
	args={{
		storeValue: writable(0),
		contents: 'contents',
		files: writable([{ name: 'file', content: 'content' }])
	}}
/>

<Story
	name="Write mode"
	args={{
		storeValue: writable(0),
		contents: 'contents',
		files: writable([{ name: 'file', content: 'content' }]),
		writeMode: true
	}}
/>
