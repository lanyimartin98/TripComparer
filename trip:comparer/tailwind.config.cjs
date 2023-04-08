const plugin = require('tailwindcss/plugin');

module.exports = {
	mode: 'jit',
	// you dont need `purge: enabled: production` because you are using jit
	purge: [
		'./src/**/*.svelte',
		// may also want to include HTML files
		'./src/**/*.html'
	],
	darkMode: 'class',
	theme: {
		extend: {
			forrest: "url('../public/images/hero.jpg')"
		}
	},
	variants: {},
	plugins: [require('@tailwindcss/line-clamp')]
};
