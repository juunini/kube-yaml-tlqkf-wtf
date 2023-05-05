export interface Variable {
	name: string;
	description: string;
}

export interface Metadata {
	title: string;
	tags: string[];
	authorId: number;
	variables: Variable[];
	created: number;
	updated: number;
}

export interface ReplacementVariable {
	origin: string;
	value: string;
}

export interface FileContent {
	name: string;
	content: string;
}

export interface Author {
	id: number;
	name: string;
	avatarUrl: string;
	login: string;
}

export interface GitHubUser {
	login: string;
	id: number;
	avatar_url: string;
	name: string;
	bio: string;
	email: string;
	pat: string;
}
