<script lang="ts" context="module">
	import { createClient } from '$lib/client';
	import { SectionDocument } from '$lib/generated/graphql';
	import type { SectionQuery, SectionQueryVariables } from '$lib/generated/graphql';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, page }) => {
		const client = createClient(fetch);

		const result = await client
			.query<SectionQuery, SectionQueryVariables>(SectionDocument, {
				id: page.params.slug,
			})
			.toPromise();

		if (result.error != null) {
			return { status: 500, error: result.error };
		}

		if (result.data?.category == null) {
			return { status: 404 };
		}

		return {
			props: {
				section: result.data.category,
			},
			maxage: 5 * 60,
		};
	};
</script>

<script lang="ts">
	export let section: NonNullable<SectionQuery['category']>;
</script>

<svelte:head>
	<title>{section.name} — The Student</title>
</svelte:head>

<div class="mt-8 fw">
	<h1 class="font-headline leading-tight text-5xl text-red-600">
		{section.name}
	</h1>
	<div class="mt-4 grid grid-cols-2 xs:grid-cols-3 gap-x-4 gap-y-6">
		{#each section.articles.nodes as article (article.id)}
			<div class="font-serif">
				<a href={`/article/${article.slug}`} class="hover:underline">{article.title}</a>
			</div>
		{/each}
	</div>
</div>
