<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Component from './DownloadButton.svelte';
</script>

<Meta title="Components/posts/DownloadButton" component={Component} />

<Template let:args>
	<Component {...args} />
</Template>

<Story
	name="DownloadButton"
	args={{
		files: [
			{ name: 'file1', content: 'content1' },
			{ name: 'file2', content: 'content2' }
		],
		title: 'title'
	}}
/>
