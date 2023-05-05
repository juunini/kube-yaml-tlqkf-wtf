<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Component from './Title.svelte';
</script>

<Meta title="Components/posts/Title" component={Component} />

<Template let:args>
	<Component {...args} />
</Template>

<Story name="Title" args={{ title: 'title' }} />
