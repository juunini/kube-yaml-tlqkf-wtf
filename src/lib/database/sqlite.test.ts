/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeAll } from 'vitest';
import * as helper from 'github-api-helper';

import { database, saveDatabase } from '@/lib/database/sqlite';

vi.mock('@/lib/config');
vi.mock('github-api-helper', () => ({
	read: vi.fn(() => ({
		content: 'W10='
	})),
	commit: vi.fn(() => ({}))
}));
vi.mock('sql.js', () => ({
	__esModule: true,
	default: () => ({
		Database: vi.fn()
	})
}));

const context = describe;
const localStorageMock = (function () {
	let store: Record<string, string> = {};

	return {
		getItem: function (key: string) {
			return store[key] ?? null;
		},
		setItem: function (key: string, value: string) {
			store[key] = value;
		},
		clear: function () {
			store = {};
		}
	};
})();

beforeAll(() => {
	// @ts-expect-error
	global.localStorage = localStorageMock;
	// @ts-expect-error
	global.window = { atob };
});

describe('sqlite.database', () => {
	context('when the database is not in localStorage', () => {
		it('should return the database from the GitHub repository', async () => {
			const GitHubReadSpy = vi.spyOn(helper, 'read');

			expect(GitHubReadSpy).not.toBeCalled();

			await database();

			expect(GitHubReadSpy).toBeCalled();
		});
	});

	context('when the database is in localStorage', () => {
		const localStorageMock = (function () {
			let store: Record<string, string> = {
				database: '[]'
			};

			return {
				getItem: function (key: string) {
					return store[key] ?? null;
				},
				setItem: function (key: string, value: string) {
					store[key] = value;
				},
				clear: function () {
					store = {};
				}
			};
		})();

		it('should return the database from localStorage', async () => {
			// @ts-expect-error
			global.localStorage = localStorageMock;

			const getItemSpy = vi.spyOn(global.localStorage, 'getItem');

			expect(getItemSpy).not.toBeCalled();

			await database();

			expect(getItemSpy).toBeCalled();
		});
	});
});

describe('sqlite.saveDatabase', () => {
	const db = {
		export: vi.fn(() => [1, 2, 3])
	};

	it('should save the database to the repository', async () => {
		const GitHubCommitSpy = vi.spyOn(helper, 'commit');

		expect(GitHubCommitSpy).not.toBeCalled();

		await saveDatabase(db as any);

		expect(GitHubCommitSpy).toBeCalled();
	});
});
