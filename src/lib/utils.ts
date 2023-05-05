import { read, type ReadDirectoryResponse, type ReadFileResponse } from 'github-api-helper';

import * as config from './config';

export function readPath(path: string) {
	return read({
		owner: config.DATABASE_REPOSITORY_OWNER,
		repo: config.DATABASE_REPOSITORY_NAME,
		path,
		branch: config.DATABASE_REPOSITORY_BRANCH,
		accessToken: config.DATABASE_REPOSITORY_ACCESS_TOKEN
	});
}

export async function readMetadata(id: string) {
	const metadataResponse = (await readPath(`posts/${id}/metadata.json`)) as ReadFileResponse;
	return JSON.parse(decodeURIComponent(escape(window.atob(metadataResponse.content))));
}

export async function readDescription(id: string) {
	const descriptionResponse = (await readPath(`posts/${id}/description.txt`)) as ReadFileResponse;
	return decodeURIComponent(escape(window.atob(descriptionResponse.content)));
}

export async function readFiles(id: string) {
	const fileList = (await readPath(`posts/${id}/contents`)) as ReadDirectoryResponse[];
	const data = await Promise.all(fileList.map((item) => readPath(item.path)));

	return data.map((item) => ({
		name: (item as ReadFileResponse).name,
		content: decodeURIComponent(escape(window.atob((item as ReadFileResponse).content)))
	}));
}

export function currentTheme() {
	return document.querySelector('html')?.classList.contains('dark') ? 'dark' : 'light';
}
