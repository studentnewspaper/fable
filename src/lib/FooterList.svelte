<script lang="ts">
	export let title: string;
</script>

<div>
	<div class="font-semibold">{title}</div>
	<div>
		<slot />
	</div>
</div>
