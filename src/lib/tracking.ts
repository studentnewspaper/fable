declare global {
	interface Window {
		_paq: any[];
	}
}

export function trackPageView({
	location,
	title,
	previous,
}: {
	location: string;
	title: string | boolean;
	previous?: string;
}) {
	if (typeof window == 'undefined' || !('_paq' in window)) {
		console.log('Incorrect environment for analytics');
		return;
	}

	if (previous != null) {
		window._paq.push(['setReferrerUrl', previous]);
	}

	window._paq.push(['setCustomUrl', location]);

	const fullTitle = generateTitle(title);
	window._paq.push(['setDocumentTitle', fullTitle]);

	window._paq.push(['deleteCustomVariables', 'page']);
	window._paq.push(['trackPageView']);

	// make Matomo aware of newly added content
	const pageRoot = document.getElementById('svelte');
	// window._paq.push(['MediaAnalytics::scanForMedia', pageRoot]);
	// window._paq.push(['FormAnalytics::scanForForms', pageRoot]);
	window._paq.push(['trackContentImpressionsWithinNode', pageRoot]);
	window._paq.push(['enableLinkTracking']);
}

// IMPORTANT NOTE: Need to clear custom dimensions and stuff: https://developer.matomo.org/guides/spa-tracking

function generateTitle(title: string | boolean) {
	if (typeof title == 'string') return title.trim();
	return document.title.replace('— The Student', '').trim();
}
