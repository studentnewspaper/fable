<script lang="ts" context="module">
	import '@fontsource/andada-pro/400.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';
	import '../app.css';

	import * as Sentry from '@sentry/browser';
	import { Integrations } from '@sentry/tracing';
	import { dev } from '$app/env';

	const sha = import.meta.env.VITE_GIT_COMMIT_SHA ?? null;
	if (sha != null) {
		console.log(`Running fable:${sha}`);
	} else {
		console.log(`No release SHA available`);
	}

	// Sentry.init({
	// 	dsn: 'https://6a1fc67964314028bded070bfbfb21af@o431302.ingest.sentry.io/5966792',
	// 	integrations: [new Integrations.BrowserTracing()],
	// 	enabled: !dev,
	// 	release: sha,

	// 	// Set tracesSampleRate to 1.0 to capture 100%
	// 	// of transactions for performance monitoring.
	// 	// We recommend adjusting this value in production
	// 	tracesSampleRate: 1.0,
	// });
</script>

<script lang="ts">
	const year = new Date().getFullYear();
	const links = [
		['Latest', '/'],
		['About', '/about'],
		['Get involved', '/get-involved'],
		['Get a copy', '/distribution'],
	];
</script>

<svelte:head>
	<link rel="dns-prefetch" href="https://gateway.fable.studentnewspaper.org" />
</svelte:head>

<header>
	<!-- TODO: Handle scrolling without ugly scrollbar (perfect scrollbar, maybe?) -->
	<nav class="border-b py-3 overflow-y-auto">
		<div class="flex flex-row justify-start space-x-5 fw">
			{#each links as [title, href] (href)}
				<div
					class="font-semibold text-sm tracking-tight leading-none flex-shrink-0 text-gray-800 hover:text-red-600 transition-colors"
				>
					<a {href}>{title}</a>
				</div>
			{/each}
		</div>
	</nav>
	<div class="font-headline font-bold italic text-4xl xs:text-6xl mt-5 xs:mt-6 leading-none fw">
		<a href="/">THE STUDENT</a>
	</div>
	<div class="font-serif xs:text-md leading-tight mt-0 mb-3 xs:mb-4 fw text-gray-800">
		Edinburgh's independent student newspaper
	</div>
	<div class="border-t mb-1" />
	<div class="border-t mb-1" />
	<div class="border-t" />
</header>

<slot />

<footer class="mt-16 bg-gray-100 border-t">
	<div class="py-6 fw">
		<div>&copy; The Student Newspaper {year}</div>
		<div>
			Site designed and developed by Nicholas Bush, with Georgie McNamara, Hannah Robinson, and
			Isabella Ronca.
		</div>
	</div>
</footer>
