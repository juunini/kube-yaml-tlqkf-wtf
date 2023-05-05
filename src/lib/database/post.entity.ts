import type { Database } from 'sql.js';

interface Props {
	id: string;
	title: string;
	tags: string[];
	authorId: number;
	created: Date;
	updated: Date;
}

export class Post implements Props {
	public id: string;
	public title: string;
	public tags: string[];
	public authorId: number;
	public created: Date;
	public updated: Date;

	constructor({ id, title, tags, created, updated, authorId }: Props) {
		this.id = id;
		this.title = title;
		this.tags = tags;
		this.authorId = authorId;
		this.created = created;
		this.updated = updated;
	}

	public save(db: Database): void {
		db.run(
			`INSERT INTO posts VALUES ('${this.id}', '${this.title}', '${this.tags.join('|')}', ${
				this.authorId
			}, ${this.created.getTime()}, ${this.updated.getTime()})`
		);
	}

	public static getById(db: Database, id: string): Post | null {
		const data = db.exec(`SELECT * FROM posts WHERE id = '${id}' AND active = true`);

		if (data.length === 0) {
			return null;
		}

		const { values } = data[0];

		return new Post({
			id: values[0][0] as string,
			title: values[0][1] as string,
			tags: (values[0][2] as string).split('|'),
			authorId: values[0][3] as number,
			created: new Date(values[0][4] as string),
			updated: new Date(values[0][5] as string)
		});
	}

	public static getRecent(db: Database, limit = 10): Post[] {
		const data = db.exec(`
			SELECT *
			FROM posts
			WHERE active = true
			ORDER BY created DESC
			LIMIT ${limit}
		`);

		if (data.length === 0) {
			return [];
		}

		const { values } = data[0];

		const posts = values.map((value) => {
			return new Post({
				id: value[0] as string,
				title: value[1] as string,
				tags: (value[2] as string).split('|'),
				authorId: value[3] as number,
				created: new Date(value[4] as string),
				updated: new Date(value[5] as string)
			});
		});

		return posts;
	}
}
