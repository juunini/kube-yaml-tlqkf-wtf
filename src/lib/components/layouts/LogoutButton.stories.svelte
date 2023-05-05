<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Component from './LogoutButton.svelte';
</script>

<Meta title="Components/layouts/LogoutButton" component={Component} />

<Template let:args>
	<Component {...args} />
</Template>

<Story name="LogoutButton" />
