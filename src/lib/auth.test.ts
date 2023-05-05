import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';

import { gitHubLogin, gitHubUserInfo } from '@/lib/auth';

const context = describe;

const localStorage: Record<string, string> = {};
// @ts-expect-error
global.localStorage = {
	getItem: (key) => localStorage[key] || null,
	setItem: (key, value) => (localStorage[key] = value),
	removeItem: (key) => delete localStorage[key]
};
// @ts-expect-error
global.location = {
	href: ''
};

describe('gitHubUserInfo', () => {
	context('when GitHubUserInfo is not in localStorage', () => {
		it('returns null', () => {
			expect(gitHubUserInfo()).toBeNull();
		});
	});

	context('when GitHubUserInfo is in localStorage', () => {
		const userInfo = {
			login: 'test',
			id: 1,
			avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
			name: 'test',
			bio: 'test',
			email: 'test@example.com'
		};

		beforeEach(() => global.localStorage.setItem('GitHubUserInfo', JSON.stringify(userInfo)));
		afterEach(() => global.localStorage.removeItem('GitHubUserInfo'));

		it('returns GitHubUserInfo', () => {
			expect(gitHubUserInfo()).toEqual(userInfo);
		});
	});
});

describe('gitHubLogin', () => {
	const response = {
		login: 'juunini',
		id: 111,
		node_id: 'aaa',
		avatar_url: 'https://avatars.githubusercontent.com/u/41536271?v=4',
		gravatar_id: '',
		url: 'https://api.github.com/users/juunini',
		html_url: 'https://github.com/juunini',
		followers_url: 'https://api.github.com/users/juunini/followers',
		following_url: 'https://api.github.com/users/juunini/following{/other_user}',
		gists_url: 'https://api.github.com/users/juunini/gists{/gist_id}',
		starred_url: 'https://api.github.com/users/juunini/starred{/owner}{/repo}',
		subscriptions_url: 'https://api.github.com/users/juunini/subscriptions',
		organizations_url: 'https://api.github.com/users/juunini/orgs',
		repos_url: 'https://api.github.com/users/juunini/repos',
		events_url: 'https://api.github.com/users/juunini/events{/privacy}',
		received_events_url: 'https://api.github.com/users/juunini/received_events',
		type: 'User',
		site_admin: false,
		name: 'Juunini',
		company: '@cloudmatelabs',
		blog: 'https://velog.io/@juunini',
		location: 'Seongnam-si Gyeonggi-do, Republic of Korea',
		email: 'juuni.ni.i@gmail.com',
		hireable: true,
		bio: '지상 최강의 개발자 (The Powerfulest Developer on the Earth)',
		twitter_username: 'juunini1',
		public_repos: 103,
		public_gists: 15,
		followers: 163,
		following: 27,
		created_at: '2018-07-22T08:54:26Z',
		updated_at: '2023-04-25T12:52:41Z'
	};

	it('saves GitHubUserInfo to localStorage', async () => {
		global.fetch = vi.fn().mockResolvedValue({
			json: () => response
		});

		await gitHubLogin('test');

		expect(global.localStorage.getItem('GitHubUserInfo')).toEqual(JSON.stringify(response));
	});

	context('with state', () => {
		const stateURL = 'https://example.com';

		it('redirects to state', async () => {
			global.fetch = vi.fn().mockResolvedValue({
				json: () => response
			});

			await gitHubLogin('test', encodeURIComponent(stateURL));

			expect(location.href).toEqual(stateURL);
		});
	});
});
