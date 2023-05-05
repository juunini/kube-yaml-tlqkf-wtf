import { writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Database } from 'sql.js';

import type { GitHubUser } from './components/posts/interfaces';

export const githubUser = localStorageStore<GitHubUser | null>('GitHubUserInfo', null);
export const db = writable<Database | null>(null);
export const localStorageDatabase = localStorageStore<number[]>('database', []);
