import preprocess from 'svelte-preprocess';
import path from 'path';
import node from '@sveltejs/adapter-node';

const sha = process.env.VITE_GIT_COMMIT_SHA ?? null;
if (sha != null) {
	if (typeof sha == 'string') {
		console.log(`Running fable:${sha}`);
		console.log(`SHA has a length of ${sha.length}`);
	} else {
		console.log(`SHA of unexpected type: ${typeof sha}`);
		console.log(sha);
	}
} else {
	console.log(`No release SHA available`);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: node({}),
		vite: {
			resolve: {
				alias: {
					$data: path.resolve('.', 'src', 'data'),
				},
			},
			optimizeDeps: {
				exclude: ['@urql/svelte'],
			},
		},
	},
};

export default config;
