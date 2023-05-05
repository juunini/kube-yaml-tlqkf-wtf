import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			include: ['src/**/*.ts'],
			exclude: [
				'src/**/*.test.ts',
				'src/**/__mocks__',
				'src/lib/config.ts',
				'src/lib/database/sqlite.ts'
			],
			statements: 100,
			branches: 100,
			functions: 100,
			lines: 100
		}
	},
	resolve: {
		alias: {
			'@': resolve('src/')
		}
	}
});
