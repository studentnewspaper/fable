import { createClient as _createClient } from '@urql/svelte';

export type Fetcher = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export const createClient = (fetcher: Fetcher = fetch) =>
	_createClient({
		url: 'https://gateway.fabric.studentnewspaper.org',
		fetch: fetcher,
	});
