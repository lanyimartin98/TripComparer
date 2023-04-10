import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
		adapter: adapter({
			runtime: 'nodejs18.x'
		}),
		env: {
			dir: process.cwd(),
			publicPrefix: 'PUBLIC_'
		}
	}
};

export default config;
