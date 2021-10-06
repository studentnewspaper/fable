<script lang="ts" context="module">
	export const hydrate = false;
</script>

<script lang="ts">
	import PageHeader from '../lib/PageHeader.svelte';

	const locations: { name: string }[] = [{ name: 'Main Library' }];
</script>

<svelte:head>
	<title>Distribution — The Student</title>
</svelte:head>

<PageHeader>Get a copy of <i>The Student</i></PageHeader>

<div class="fw mt-4 article">
	<p>
		There's loads of places to pick up a copy of <i>The Student</i>. They're completely free and we
		invite you to take them away with you (we promise it's worth it).
	</p>
	<ul>
		{#each locations as location}
			<li>{location.name}</li>
		{/each}
	</ul>
</div>
