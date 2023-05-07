import { writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Database } from 'sql.js';

import type { GitHubUser } from './components/posts/interfaces';

export const githubUser = localStorageStore<GitHubUser | null>('GitHubUserInfo', null);
export const db = writable<Database | null>(null);
export const sessionStorageDatabase = {
	set: (value: number[]) => sessionStorage.setItem('database', JSON.stringify(value))
};
