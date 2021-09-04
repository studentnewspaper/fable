<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { createClient } from '$lib/client';
	import { AuthorDocument } from '$lib/generated/graphql';
	import type { AuthorQuery, AuthorQueryVariables } from '$lib/generated/graphql';

	export const hydrate = false;

	export const load: Load = async ({ fetch, page }) => {
		const client = createClient(fetch);

		const result = await client
			.query<AuthorQuery, AuthorQueryVariables>(AuthorDocument, { slug: page.params.slug })
			.toPromise();

		if (result.error != null) {
			console.error(result.error);
			return { status: 500, error: result.error };
		}

		if (result.data?.author == null) {
			return { status: 404 };
		}

		const author = result.data.author;

		if (author.canonical?.slug != null) {
			return {
				redirect: `/author/${author.canonical.slug}`,
				status: 301,
			};
		}

		return {
			props: { author },
			maxage: 5 * 60,
		};
	};
</script>

<script lang="ts">
	import PageHeader from '$lib/PageHeader.svelte';

	export let author: NonNullable<AuthorQuery['author']>;
</script>

<svelte:head>
	<title>{author.name} — The Student</title>
</svelte:head>

<PageHeader>{author.name}</PageHeader>

<div class="fw">
	{#if author.bio != null}
		<div class="mt-1 font-serif space-y-4">
			{@html author.bio}
		</div>
		<div class="mt-1.5 text-xs text-gray-400 italic">
			(authors write their own bio, which is not pre-approved by the editorial team)
		</div>
	{:else}
		<div class="text-gray-700">
			Author at <span class="italic">The Student</span>
		</div>
	{/if}
</div>

{#if author.bio != null}
	<div class="border-t mt-8" />
{/if}

<div class="fw space-y-2 mt-8">
	{#each author.articles as article (article.id)}
		<div class="font-serif">
			<a href={`/article/${article.slug}`} class="hover:underline">&rtrif; {article.title}</a>
		</div>
	{/each}
</div>
