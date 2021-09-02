<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { createClient } from '$lib/client';
	import { ArticleDocument } from '$lib/generated/graphql';
	import type { ArticleQuery, ArticleQueryVariables } from '$lib/generated/graphql';
	import { format, isSameDay, isSameYear, differenceInMinutes, max } from 'date-fns';

	export const hydrate = false;

	export const load: Load = async ({ fetch, page }) => {
		const client = createClient(fetch);

		const result = await client
			.query<ArticleQuery, ArticleQueryVariables>(ArticleDocument, { slug: page.params.slug })
			.toPromise();

		if (result.error != null) {
			console.error(result.error);
			return { status: 500, error: result.error };
		}

		if (result.data?.article == null) {
			return { status: 404 };
		}

		const article = result.data.article;

		const dates = ((): [published: string, updated: string | null] => {
			const published = new Date(article.published);
			// Updated date should not be before published date
			const updated = max([new Date(article.updated), published] as any);
			const now = new Date();

			const publishedText = ((): string => {
				if (isSameYear(now, published)) {
					return format(published, 'EEEE do MMMM HH.mm');
				}
				return format(published, 'EEEE do MMMM yyyy HH.mm');
			})();
			if (Math.abs(differenceInMinutes(published, updated)) <= 30) {
				return [publishedText, null];
			}

			const updatedText = ((): string => {
				if (isSameDay(published, updated)) {
					return format(updated, 'HH.mm');
				}
				if (isSameYear(now, published)) {
					return format(updated, 'EEE do MMM HH.mm');
				}
				return format(updated, 'EE do MMM yyyy HH.mm');
			})();

			return [publishedText, updatedText];
		})();

		return {
			props: { article, dates },
			maxage: 5 * 60,
		};
	};
</script>

<script lang="ts">
	export let article: NonNullable<ArticleQuery['article']>;

	export let dates: [published: string, updated: string | null];
	let [published, updated] = dates;
</script>

<svelte:head>
	<title>{article.title} — The Student</title>
</svelte:head>

<article class="mt-6 xs:mt-8 fw grid gap-x-6">
	<div>
		<h1 class="font-headline leading-tight text-5xl text-red-600">
			{article.title}
		</h1>
	</div>
	<div />
	<div class="mt-6">
		{#if article.featuredImage != null}
			<img
				class="w-full max-h-96 object-cover shadow-sm rounded-sm"
				src={article.featuredImage.url}
				alt={article.featuredImage.alt ?? undefined}
			/>
		{/if}
	</div>
	<div class="mt-6">
		<div class="tracking-tight">
			<span class="">By</span>
			<a href={`/author/${article.author.slug}`} class="font-semibold hover:underline"
				>{article.author.name}</a
			>
		</div>
		<div class="text-gray-600 text-sm mt-0.5">{published}</div>
		{#if updated != null}
			<div class="text-gray-400 text-sm mt-0.5">Updated {updated}</div>
		{/if}
	</div>
	<div class="mt-5 md:mt-8 article">
		{@html article.content}
		<p>
			<a href="/" class="text-red-600 hover:underline font-sans">← Latest articles</a>
		</p>
	</div>
	<div class="self-end">&nbsp;</div>
</article>

<div class="fw mt-8" />

<style>
	article {
		grid-template-columns: minmax(0, 1fr);
	}

	@media (min-width: 768px) {
		article {
			grid-template-columns: minmax(0, 1fr) minmax(0, 200px);
		}
	}
</style>
