<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Component from './User.svelte';
</script>

<Meta title="Components/layouts/User" component={Component} />

<Template let:args>
	<Component {...args} />
</Template>

<Story
	name="User"
	args={{
		name: 'Juunini',
		avatarUrl: 'https://avatars.githubusercontent.com/u/41536271?v=4'
	}}
/>
