<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { createClient } from '$lib/client';
	import { GetInvolvedDocument } from '$lib/generated/graphql';
	import type { GetInvolvedQuery, GetInvolvedQueryVariables } from '$lib/generated/graphql';

	export const hydrate = false;

	export const load: Load = async ({ fetch, page }) => {
		const client = createClient(fetch);

		const result = await client
			.query<GetInvolvedQuery, GetInvolvedQueryVariables>(GetInvolvedDocument, {})
			.toPromise();

		if (result.error != null) {
			console.error(result.error);
			return { status: 500, error: result.error };
		}

		const vacancies = result.data!.vacancies!.filter(isTruthy);

		return {
			props: { vacancies },
			maxage: 5 * 60,
		};
	};
</script>

<script lang="ts">
	import PageHeader from '$lib/PageHeader.svelte';
	import { isTruthy } from '$lib/utils';
	import { format } from 'date-fns';

	type Vacancy = NonNullable<NonNullable<GetInvolvedQuery['vacancies']>[0]>;

	export let vacancies: Vacancy[];
</script>

<svelte:head>
	<title>Get involved — The Student</title>
</svelte:head>

<PageHeader>
	How to get involved with <span class="italic">The Student</span>
</PageHeader>

<div class="fw mt-4 article">
	<p>
		Hey there! We’re so glad that you want to get involved with The Student. We’re always looking
		for new people to join us. There are a number of ways to do this:
	</p>

	<h1>Current vacancies</h1>
	<div class="grid gap-y-4" style="grid-template-columns: auto 1fr;">
		{#each vacancies as vacancy (vacancy.id)}
			<div class="flex flex-row items-baseline w-full">
				<div class="flex-shrink-0 font-sans leading-normal">
					<div class="font-semibold">
						{vacancy.title}
					</div>

					{#if vacancy.href != null}
						<div class="leading-none">
							<a href={vacancy.href} class="text-sm text-red-600 hover:underline">Contact</a>
						</div>
					{/if}
				</div>
				<div
					class="flex-grow border-b border-dotted mx-2 border-gray-400 min-w-[15px] md:min-w-[40px]"
				/>
			</div>
			<div>
				{#if vacancy.description != null}
					{@html vacancy.description}
				{:else}
					<p class="text-gray-600 italic">Find out more information by contacting us.</p>
				{/if}
			</div>
		{/each}
	</div>

	<h1>Write for us</h1>
	<ol>
		<li>
			Join our Facebook groups. We have one for each section of our paper, as well as an
			illustrators group. Here you can find pitches, events, and easily contact editors if you’d
			like to write anything for the paper. If you’re struggling to find these groups on Facebook,
			just email the relevant section editors or our outreach officer so we can make sure that you
			get added.
		</li>
		<li>
			Attend our weekly writers’ meetings on Microsoft Teams, which take place every Monday at 6pm.
			This is where our editors usually dish out pitches, as well as chat to writers about anything
			they’d like to write. There’s no pressure to speak at these meetings: you’re more than welcome
			to just come and listen to see what The Student is all about. You can find the link to these
			meetings on our section groups and main Facebook page. If you have trouble finding it, just
			give us an email or send a message on Facebook.
		</li>
		<li>
			Come to any one of our virtual socials! The Student has a number of get-togethers throughout
			the year, from pub crawls to coffee meet-ups, however right now due to the pandemic we're
			stuck with Teams meetings. However, this is a great way to get to know your fellow writers, as
			well as your editors and committee members. We'll advertise socials on our Instagram and
			Facebook pages. If you have any questions about socials, please <a
				href="mailto:social@studentnewspaper.org">contact our social secretaries</a
			>
		</li>
		<li>
			If you’re more interested in learning about the editing process, you can contact one of our
			editors to brush up on your skills at our copy editing sessions! These happen fortnightly
			(when the paper is printed) and editors remotely copyedit from their own homes. It’s a great
			way to get more involved behind the scenes of the paper.
		</li>
		<li>
			If you’ve written, or intend to write, more than twice for the paper, you must become a
			member. You can become a member on the EUSA site for £10 a year. We are aware that everyone’s
			financial circumstances are different, so please contact us if you would like to become a
			member and feel like the fees may be difficult for you to pay.
		</li>
	</ol>
	<p>
		Finally, if you have any questions or suggestions please do not hesitate to contact our
		president, Hannah Robinson, our editor-in-chief Magdalena Jablonska, deputy editors-in-chief
		James Small-Edwards and Shin Woo Kim, or our outreach officer Vaishnavi Ramu. Our welfare
		officer Alexandra Thompson is also available for any questions or welfare concerns you have.
	</p>
	<p>
		*Due to the COVID-19 pandemic, all meetings and socials will now be online for the foreseeable
		future. Information on all events will be available on our Facebook and Instagram pages. If you
		have any questions or can't find what you are looking for, do not hesitate to contact our
		outreach officer.
	</p>
</div>
