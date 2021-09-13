<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { createClient } from '$lib/client';
	import { ArticleDocument } from '$lib/generated/graphql';
	import type { ArticleQuery, ArticleQueryVariables } from '$lib/generated/graphql';
	import { format, isSameDay, isSameYear, differenceInMinutes, max } from 'date-fns';

	export const hydrate = false;

	export const load: Load = async ({ fetch, page }) => {
		const client = createClient(fetch);

		const slug = page.params.slug;
		const result = await client
			.query<ArticleQuery, ArticleQueryVariables>(ArticleDocument, { slug })
			.toPromise();

		if (result.error != null) {
			console.error(result.error);
			return { status: 500, error: result.error };
		}

		if (result.data?.article == null) {
			return { status: 404 };
		}

		const article = result.data.article;
		const publishedAt = new Date(article.published);
		// Updated date should not be before published date
		const updatedAt = max([new Date(article.updated), publishedAt] as any);
		const now = new Date();

		const dates = ((): [published: string, updated: string | null] => {
			const publishedText = ((): string => {
				if (isSameYear(now, publishedAt)) {
					return format(publishedAt, 'EEEE do MMMM HH.mm');
				}
				return format(publishedAt, 'EEEE do MMMM yyyy HH.mm');
			})();
			if (Math.abs(differenceInMinutes(publishedAt, updatedAt)) <= 30) {
				return [publishedText, null];
			}

			const updatedText = ((): string => {
				if (isSameDay(publishedAt, updatedAt)) {
					return format(updatedAt, 'HH.mm');
				}
				if (isSameYear(now, publishedAt)) {
					return format(updatedAt, 'EEE do MMM HH.mm');
				}
				return format(updatedAt, 'EE do MMM yyyy HH.mm');
			})();

			return [publishedText, updatedText];
		})();

		return {
			props: { article, dates, rawDates: [publishedAt.toISOString(), updatedAt.toISOString()] },
			maxage: 5 * 60,
		};
	};
</script>

<script lang="ts">
	export let article: NonNullable<ArticleQuery['article']>;

	export let dates: [published: string, updated: string | null];
	let [published, updated] = dates;

	export let rawDates: [publishedAt: string, updatedAt: string];
	let [publishedAt, updatedAt] = rawDates;
</script>

<svelte:head>
	<title>{article.title} — The Student</title>
	<meta property="og:locale" content="en_GB" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={article.title} />
	<meta property="og:url" content={`https://studentnewspaper.org/article/${article.slug}`} />
	<meta property="og:site_name" content="The Student" />
	<meta property="article:publisher" content="https://studentnewspaper.org" />
	<meta property="article:published_time" content={publishedAt} />
	<meta property="article:modified_time" content={updatedAt} />
	<!-- <meta property="article:section" content=""> -->

	{#if article.featuredImage != null}
		<meta property="og:image" content={article.featuredImage.url} />
	{/if}
</svelte:head>

<article class="mt-6 xs:mt-8 fw grid gap-x-6">
	<div>
		<h1 class="stu-headline">
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
	<div class="mt-5 md:mt-8 article md:text-lg">
		{@html article.content}
	</div>
	<div class="self-end">&nbsp;</div>
	<div class="mt-6">
		<p>
			<a href="/" class="text-red-600 hover:underline font-sans">← Latest articles</a>
		</p>
	</div>
	<div />
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
