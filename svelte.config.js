// use adapter-auto for zero config deployment to Vercel, adapter-static for Github Pages
import adapter from '@sveltejs/adapter-auto';
// import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},
  vitePlugin: {
		experimental: {
			inspector: true,
		},
	},
};

export default config;
