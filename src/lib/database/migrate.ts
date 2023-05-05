import type { Database } from 'sql.js';

export function migrate(db: Database) {
	db.run(createPosts);
}

const createPosts = `
  CREATE TABLE IF NOT EXISTS posts (
    id CHARACTER(36) PRIMARY KEY,
    title TEXT NOT NULL,
    tags TEXT NOT NULL,
    authorId INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;
