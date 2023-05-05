import { user } from 'github-api-helper';

interface Props {
	id: number;
	name: string;
	avatarUrl: string;
	login: string;
	pat: string;
}

export class Author implements Props {
	public id: number;
	public name: string;
	public avatarUrl: string;
	public login: string;
	public pat: string;

	constructor({ id, name, avatarUrl, login, pat }: Props) {
		this.id = id;
		this.name = name;
		this.avatarUrl = avatarUrl;
		this.login = login;
		this.pat = pat;
	}

	public static async getByAccessToken(accessToken: string): Promise<Author> {
		const data = await user({ accessToken });
		return new Author({
			id: data.id,
			name: data.name,
			avatarUrl: data.avatar_url,
			login: data.login,
			pat: accessToken
		});
	}
}
