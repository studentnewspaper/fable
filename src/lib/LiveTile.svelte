<script lang="ts">
	const updates = [
		{
			time: '06.20',
			text: 'Major EUSA election complete'
		},
		{ time: '06.30', text: 'This is a really long headline that wraps because we force it to' },
		{ time: '1d', text: 'Shorter update this time' }
	];
</script>

<div
	class="grid items-baseline gap-x-2 gap-y-2 "
	style="grid-template-columns: minmax(0, auto) minmax(0, 1fr);"
>
	{#each updates as update}
		<div class="text-sm font-bold tabular-nums text-red-600 text-right">
			{update.time}
		</div>
		<a class="font-serif leading-tight hover:underline" href="#">{update.text}</a>
	{/each}
</div>
