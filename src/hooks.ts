import type { HandleError } from '@sveltejs/kit';

export const handleError: HandleError = async ({ error, request }) => {
	console.error(error);
};
