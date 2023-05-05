<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Component from './Description.svelte';
</script>

<Meta title="Components/posts/Description" component={Component} />

<Template let:args>
	<Component {...args} />
</Template>

<Story name="Editable" args={{ editable: true, description: 'description' }} />
<Story name="Readonly" args={{ description: 'description' }} />
