<script lang="ts" context="module">
	export const hydrate = false;
</script>

<script lang="ts">
	import committeeData from '$data/committee.json';

	const roles: { role: string; email?: string; people: string[] }[] = committeeData;
</script>

<div class="fw mt-6 xs:mt-8">
	<h1 class="font-headline leading-tight text-5xl text-red-600">
		About <span class="italic">The Student</span>
	</h1>

	<div class="mt-4 article">
		<p>
			The Student is a fortnightly independent newspaper produced by students at the University of
			Edinburgh. It was founded in 1887 by Robert Louis Stevenson, making it Europe’s oldest student
			newspaper.
		</p>
		<p>
			The newspaper has been independent of the university since 1992, but maintains a commercial
			agreement with the Edinburgh University Students’ Association.
		</p>

		<h1>Committee</h1>
		<div class="grid" style="grid-template-columns: auto 1fr;">
			{#each roles as role (role.role)}
				<div class="flex flex-row items-baseline w-full">
					<div class="flex-shrink-0">
						{#if role.email != null}
							<a class="underline hover:text-red-700" href={`mailto:${role.email}`}>{role.role}</a>
						{:else}
							{role.role}
						{/if}
					</div>
					<div class="flex-grow border-b border-dotted mx-2 border-gray-400 min-w-[15px]" />
				</div>
				<div>
					{#each role.people as person}
						<div>
							{person}
						</div>
					{/each}
				</div>
			{/each}
		</div>

		<h1>History</h1>
		<p>
			The Student newspaper was launched in 1887 by Scottish novelist and poet Robert Louis
			Stevenson, as a small weekly magazine published by the Students’ Representative Council. The
			first issues of The Student opened with an editorial and a short biographical piece of a
			notable person, followed by articles from university societies, sports results, poetry and
			literary reviews and profiles of new lecturers. The magazine was funded by advertising and a
			price of two pence.
		</p>
		<p>
			By the 1970s, The Student had become a weekly newspaper that would report on important news
			for the student body. One of the biggest scoops ever reported in The Student was an exposé
			reported by the then News editor Gordon Brown (who later became the Prime Minister of the
			United Kingdom 2007-2010) on the university’s investments in apartheid South Africa, and the
			following campaigns that forced the university to disinvest. Within the same year, Brown was
			also alerted to a loophole in the university’s constitution which allowed a student to run for
			Rector (which he then did, to the fury of the university). The content of The Student by this
			time was reflecting the greater reach of the university on society, with sections for news,
			the environment, society, features, politics and entertainment reviews. The price had risen to
			five pence.
		</p>
		<p>
			The 1990s brought the age of computers to The Student’s publication process, and the offices
			were moved from the Student Publications Board offices at 1 Buccleuch Place to their current
			underground location in The Pleasance (a charmingly cluttered cellar affectionately referred
			to as The Bunker, which was supposedly a reclaimed monkey-testing laboratory). Around this
			time actor, singer-songwriter and author Darius Campbell wrote briefly as a film and music
			critic.
		</p>
		<p>
			In 1992 The Student (current price of thirty pence) was dropped by the student union for
			financial reasons, and funding was replaced with a £5,000 grant from the University
			Development Fund to allow it to continue as a student society and regain editorial
			independence, distributing around campus free of charge, as it does today.
		</p>
		<p>
			The Student has won the Herald Student Media Award for Best Newspaper in 1998, 2006, 2007,
			2008 and 2010 and the Guardian Student Media Awards for the “Best Newspaper on a Shoestring”
			in 2001. The paper has undergone several redesigns, the latest being in September 2018 when we
			moved from a Berliner to a Tabloid format.
		</p>
		<p>
			Many of The Student’s former writers have gone on to become internationally recognised
			journalists and politicians (some we’re proud of, some we’re not). Past staff members of The
			Student include the British politicians Gordon Brown; Lord Steel of Aikwood; Robin Cook; and
			many of Fleet Street’s reporters and editors. Recent graduates include Guardian staff writer
			and editor Helen Pidd, BBC radio reporter Chris Page and deputy Political editor James Kirkup.
		</p>
	</div>
</div>
