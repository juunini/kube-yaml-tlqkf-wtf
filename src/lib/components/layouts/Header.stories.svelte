<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Component from './Header.svelte';
</script>

<Meta title="Components/layouts/Header" component={Component} />

<Template let:args>
	<Component {...args} />
</Template>

<Story name="Header" />
