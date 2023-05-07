import initSqlJs, { type Database } from 'sql.js';
import { commit, read, type ReadFileResponse } from 'github-api-helper';

import * as config from '@/lib/config';
import { sessionStorageDatabase } from '../store';

let SQL: initSqlJs.SqlJsStatic;

async function initSQL() {
	if (SQL === undefined) {
		SQL = await initSqlJs({ locateFile: (filename) => `/${filename}` });
	}
}

export async function database(): Promise<Database> {
	await initSQL();

	const data = sessionStorage.getItem('database');

	if (data !== null) {
		return new SQL.Database(Uint8Array.from(JSON.parse(data)));
	}

	return await databaseFromGitHub();
}

export async function databaseFromGitHub() {
	await initSQL();

	const response = (await read({
		owner: config.DATABASE_REPOSITORY_OWNER,
		repo: config.DATABASE_REPOSITORY_NAME,
		branch: config.DATABASE_REPOSITORY_BRANCH,
		path: config.DATABASE_REPOSITORY_PATH,
		accessToken: config.DATABASE_REPOSITORY_ACCESS_TOKEN
	})) as ReadFileResponse;

	const content = window.atob(response.content);
	sessionStorageDatabase.set(JSON.parse(content));
	return new SQL.Database(Uint8Array.from(JSON.parse(content)));
}

export async function saveDatabase(database: Database): Promise<void> {
	const data = JSON.stringify(Array.from(database.export()));

	sessionStorageDatabase.set(Array.from(database.export()));

	await commitDatabase(data);
}

async function commitDatabase(data: string, retry = 0) {
	try {
		await commit({
			owner: config.DATABASE_REPOSITORY_OWNER,
			repo: config.DATABASE_REPOSITORY_NAME,
			branch: config.DATABASE_REPOSITORY_BRANCH,
			accessToken: config.DATABASE_REPOSITORY_ACCESS_TOKEN,
			files: [
				{
					path: config.DATABASE_REPOSITORY_PATH,
					data
				}
			],
			committer: {
				name: config.DATABASE_REPOSITORY_COMMITTER_NAME,
				email: config.DATABASE_REPOSITORY_COMMITTER_EMAIL
			},
			message: config.DATABASE_REPOSITORY_COMMIT_MESSAGE
		});
	} catch {
		const _retry = retry + 1;
		console.log(`Failed to commit database, retrying... (${_retry})`);

		await new Promise((r) => setTimeout(r, 1000 * 60));

		if (_retry >= 3) {
			alert('Failed to commit database');
			return;
		}

		await commitDatabase(data, _retry);
	}
}
