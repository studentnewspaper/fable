<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { createClient } from '$lib/client';
	import { HomepageDocument } from '$lib/generated/graphql';
	import type { HomepageQueryVariables, HomepageQuery } from '$lib/generated/graphql';

	export const hydrate = false;

	export const load: Load = async ({ fetch }) => {
		const client = createClient(fetch);

		const result = await client
			.query<HomepageQuery, HomepageQueryVariables>(HomepageDocument)
			.toPromise();

		if (result.error != null) {
			return { status: 500, error: result.error };
		}

		return {
			props: { data: result.data },
			maxage: 5 * 60,
		};
	};
</script>

<script lang="ts">
	import HomepageBanner from '$lib/HomepageBanner.svelte';
	import { isTruthy } from '$lib/utils';

	export let data: HomepageQuery;
	let featured = data.featured;
	let topArticle = featured != null ? featured.articles.nodes[0] : null;
	let sections = data
		.categories!.filter(isTruthy)
		.filter((section) => section.isSection)
		.filter((section) => section.articles.nodes.length > 0);

	let freshersTitle = 'Freshers 2021 Coverage';
</script>

<svelte:head>
	<title>The Student</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href={`https://fonts.googleapis.com/css2?family=Knewave&display=swap&text=${encodeURIComponent(
			freshersTitle
		)}`}
		rel="stylesheet"
	/>
</svelte:head>

<div class="mt-4 relative">
	<HomepageBanner>
		<div class="flex flex-col md:flex-row items-stretch pb-1">
			<div
				class="py-2 flex flex-col justify-center flex-shrink-0 pr-8 mr-7 md:border-r border-white"
			>
				<div
					class="text-5xl tracking-tight leading-none relative -top-1"
					style="font-family: Knewave, cursive;"
				>
					Freshers 2021 <br class="hidden md:block" />Coverage
				</div>
			</div>
			<div class="py-2 flex flex-row items-center">
				<p class="font-bold leading-snug lg:text-lg">
					Find out all you need to know about Edinburgh, your new home away from home! From clubs to
					restaurants to societies, <span class="italic">The Student</span> has got you covered.
				</p>
			</div>
		</div>
	</HomepageBanner>
	<a href="/section/freshers-21" class="absolute inset-0 opacity-0">View freshers pack</a>
</div>

{#if featured != null && topArticle != null}
	<div class="fw mt-8">
		<div class="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-4">
			<div class="col-span-2 md:col-span-3 md:row-span-4 relative group">
				{#if topArticle.featuredImage != null}
					<img
						class="w-full mb-4 object-cover object-center max-h-[200px] md:max-h-[300px]"
						src={topArticle.featuredImage.url}
						alt={topArticle.featuredImage.alt ?? undefined}
					/>
				{/if}
				<div
					class="text-5xl font-headline font-bold tracking-tight leading-tight group-hover:underline"
				>
					{topArticle.title}
				</div>
				<a href={`/article/${topArticle.slug}`} class="absolute inset-0 opacity-0">View article</a>
			</div>
			{#each featured.articles.nodes.slice(1, 1 + 4) as article (article.id)}
				<div class="col-span-1 md:col-span-2 flex flex-row border-r pr-4 relative group">
					{#if article.featuredImage != null}
						<div
							class="w-32 min-h-[75px] self-stretch flex-shrink-0 relative overflow-hidden sm:block hidden mr-3"
						>
							<img
								src={article.featuredImage.url}
								alt={article.featuredImage.alt ?? undefined}
								class="absolute inset-0 h-full w-full object-cover object-center"
							/>
						</div>
					{/if}
					<div class="font-serif group-hover:underline">
						{article.title}
					</div>
					<a href={`/article/${article.slug}`} class="absolute inset-0 opacity-0">View article</a>
				</div>
			{/each}
		</div>
		<div class="md:grid grid-cols-6 gap-x-4 mt-8 hidden">
			{#each featured.articles.nodes.slice(1 + 4, 1 + 4 + 6) as article (article.id)}
				<div class="font-serif">
					<a href={`/article/${article.slug}`} class="hover:underline">{article.title}</a>
				</div>
			{/each}
		</div>
	</div>
{/if}

<div class="space-y-8 mt-8">
	{#each sections as section (section.slug)}
		<div>
			<div class="fw flex flex-row items-center space-x-4 mb-3">
				<div class="font-headline font-semibold text-2xl text-red-600 flex-shrink-0">
					<a href={`/section/${section.slug}`} class="hover:underline">{section.name}</a>
				</div>
				<div class="border-b border-red-600 flex-grow h-0 relative -top-0.5" />
			</div>
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-6 fw">
				<div class="col-span-2 flex flex-col">
					<div class="font-headline text-xl font-bold">
						<a href={`/article/${section.articles.nodes[0].slug}`} class="hover:underline"
							>{section.articles.nodes[0].title}</a
						>
					</div>
				</div>
				{#each section.articles.nodes.slice(1, 10 + 1) as article (article.id)}
					<div class="font-serif">
						<a href={`/article/${article.slug}`} class="hover:underline">{article.title}</a>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
