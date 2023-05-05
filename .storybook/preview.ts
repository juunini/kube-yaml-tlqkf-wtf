import type { Preview } from '@storybook/svelte';
import '@skeletonlabs/skeleton/themes/theme-rocket.css';
import '@skeletonlabs/skeleton/styles/all.css';

import '../src/app.postcss';
import '../src/app.css';
import Decorator from './decorator.svelte';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		}
	},
	decorators: [(_, story) => ({ Component: Decorator, props: { context: story.globals } })]
};

export default preview;
