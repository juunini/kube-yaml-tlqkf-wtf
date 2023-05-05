import type { GitHubUser } from './components/posts/interfaces';
import { BACKEND_URL } from './config';

export function gitHubUserInfo(): GitHubUser | null {
	const userInfo = localStorage.getItem('GitHubUserInfo');

	if (userInfo === null) {
		return null;
	}

	return JSON.parse(userInfo) as GitHubUser;
}

export async function gitHubLogin(code: string, state?: string): Promise<void> {
	const response = await fetch(`${BACKEND_URL}/api/auth/github/login`, {
		method: 'POST',
		body: JSON.stringify({ code })
	});
	const userInfo = await response.json();

	localStorage.setItem('GitHubUserInfo', JSON.stringify(userInfo));

	if (state !== undefined) {
		location.href = decodeURIComponent(state);
	}
}
