import type { GitHubUser } from './components/posts/interfaces';

export function gitHubUserInfo(): GitHubUser | null {
	const userInfo = localStorage.getItem('GitHubUserInfo');

	if (userInfo === null) {
		return null;
	}

	return JSON.parse(userInfo) as GitHubUser;
}
