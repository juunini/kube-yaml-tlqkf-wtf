<script lang="ts">
	import { onMount } from 'svelte';
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import { AppShell } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, storeHighlightJs } from '@skeletonlabs/skeleton';
	import 'highlight.js/styles/atom-one-dark.css';
	import hljs from 'highlight.js';

	import '../app.postcss';
	import '../app.css';
	import Header from '@/lib/components/layouts/Header.svelte';
	import { database } from '@/lib/database/sqlite';
	import { migrate } from '@/lib/database/migrate';
	import { db } from '@/lib/store';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	storeHighlightJs.set(hljs);

	onMount(async () => {
		if ($db === null) {
			db.set(await database());
		}
		migrate($db!);
	});
</script>

<AppShell class="container mx-auto p-6">
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<slot />
</AppShell>
