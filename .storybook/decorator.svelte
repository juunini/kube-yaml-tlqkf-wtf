<script lang="ts">
	import { AppShell, storeHighlightJs } from '@skeletonlabs/skeleton';
	import 'highlight.js/styles/atom-one-dark.css';
	import hljs from 'highlight.js';

	document.body.setAttribute('data-theme', 'roocket');
	document.body.setAttribute('data-sveltekit-preload-data', 'hover');
	document.getElementById('storybook-root')!.style.height = '100%';

	storeHighlightJs.set(hljs);
</script>

<AppShell>
	<div
		class="previewer-viewport p-4 md:p-10 space-y-4 bg-gradient-to-br from-primary-500 to-secondary-500 text-on-primary-token min-h-full h-full"
		style="background-image: linear-gradient(to bottom right,var(--tw-gradient-from), var(--tw-gradient-to));"
	>
		<div class="card p-4 w-full text-token space-y-4 min-h-full h-full">
			<slot />
		</div>
	</div>
</AppShell>

<style>
	.from-primary-500 {
		--tw-gradient-from: rgb(var(--color-primary-500) / 1) var(--tw-gradient-from-position);
		--tw-gradient-from-position: ;
		--tw-gradient-to: rgb(var(--color-primary-500) / 0) var(--tw-gradient-from-position);
		--tw-gradient-to-position: ;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
</style>
