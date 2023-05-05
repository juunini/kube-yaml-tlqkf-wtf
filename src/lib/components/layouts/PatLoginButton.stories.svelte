<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Component from './PatLoginButton.svelte';
</script>

<Meta title="Components/layouts/PatLoginButton" component={Component} />

<Template let:args>
	<Component {...args} />
</Template>

<Story name="PatLoginButton" />
