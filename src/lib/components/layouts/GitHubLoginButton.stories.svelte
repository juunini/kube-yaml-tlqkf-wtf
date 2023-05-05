<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Component from './GitHubLoginButton.svelte';
</script>

<Meta title="Components/layouts/GitHubLoginButton" component={Component} />

<Template let:args>
	<Component {...args} />
</Template>

<Story name="GitHubLoginButton" />
