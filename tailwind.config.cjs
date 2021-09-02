const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
				serif: ['"Andada Pro"', ...defaultTheme.fontFamily.serif],
				headline: ['"Newsreader 72pt"', ...defaultTheme.fontFamily.serif],
			},
			screens: {
				xs: '480px',
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						fontFamily: theme('fontFamily.serif').toString(),
						color: theme('colors.black').toString(),
					},
				},
			}),
		},
	},
	plugins: [require('@tailwindcss/typography')],
};

module.exports = config;
