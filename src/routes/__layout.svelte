<script lang="ts" context="module">
	import '@fontsource/andada-pro/400.css';
	import '@fontsource/inter/400.css';
	import '../app.css';
</script>

<script lang="ts">
	const year = new Date().getFullYear();
	const links = [
		['Latest', '/'],
		// ['Freshers', '/section/freshers'],
		['Fringe', '/section/fringe'],
		['About', '/about'],
	];
</script>

<header>
	<!-- TODO: Handle scrolling without ugly scrollbar (perfect scrollbar, maybe?) -->
	<nav class="border-b py-3 overflow-y-auto">
		<div class="flex flex-row justify-start space-x-5 fw">
			{#each links as [title, href] (href)}
				<div
					class="font-semibold text-sm tracking-tight leading-none flex-shrink-0 text-gray-800 hover:text-red-600 transition-colors"
				>
					<a {href}>{title}</a>
				</div>
			{/each}
		</div>
	</nav>
	<div class="font-headline font-bold text-4xl xs:text-6xl mt-5 xs:mt-6 leading-none fw">
		<a href="/">The Student</a>
	</div>
	<div class="font-serif xs:text-md leading-tight mt-1 mb-3 xs:mb-4 fw text-gray-800">
		Edinburgh's independent student newspaper
	</div>
	<div class="border-t mb-1" />
	<div class="border-t mb-1" />
	<div class="border-t" />
</header>

<slot />

<div class="mb-16" />

<!-- <footer class="mt-16 bg-gray-50">
	<div class="py-6 fw">
		<div>&copy; The Student Newspaper {year}</div>
		<div>Site designed and developed by Nicholas Bush and Isabella Ronca</div>
	</div>
</footer> -->
