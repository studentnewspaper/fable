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
	// import Section from '$lib/Section.svelte';

	function without<T>(arr: T[], predicate: (v: T) => boolean): [T | null, T[]] {
		for (let i = 0; i < arr.length; i++) {
			const v = arr[i];

			if (predicate(v)) {
				const newArr = [...arr];
				const removedItem = newArr.splice(i, 1);
				return [removedItem[0], newArr];
			}
		}
		return [null, arr];
	}

	export let data: HomepageQuery;
	let sections = data.categories.filter((section) => section.isSection);
	let featured = data.categories.find((section) => section.id == 'featured');
	let topArticle = featured != null ? featured.articles.nodes[0] : null;
</script>

<svelte:head>
	<title>The Student</title>
</svelte:head>

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
	{#each sections as section (section.id)}
		<div>
			<div class="fw flex flex-row items-center space-x-4 mb-3">
				<div class="font-headline font-semibold text-2xl text-red-600 flex-shrink-0">
					<a href={`/section/${section.id}`} class="hover:underline">{section.name}</a>
				</div>
				<div class="border-b border-red-600 flex-grow h-0 relative -top-0.5" />
			</div>
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-6 fw">
				<div class="col-span-2 flex flex-col">
					<!-- <div class="bg-blue-100 flex-grow mb-3" /> -->
					<!-- {#if section.articles.nodes[0].featuredImage != null}
						<div class="flex-grow mb-3 relative overflow-hidden">
							<img
								src={section.articles.nodes[0].featuredImage.url}
								alt=""
								class="absolute inset-0 object-cover object-center w-full max-w-none"
							/>
						</div>
					{/if} -->
					<div class="font-headline text-xl font-bold">
						<a href={`/article/${section.articles.nodes[0].slug}`} class="hover:underline"
							>{section.articles.nodes[0].title}</a
						>
					</div>
				</div>
				{#each section.articles.nodes.slice(1, 8 + 1) as article (article.id)}
					<div class="font-serif">
						<a href={`/article/${article.slug}`} class="hover:underline">{article.title}</a>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
