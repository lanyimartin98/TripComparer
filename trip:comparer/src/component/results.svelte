<script lang="ts">
	import type { Trip } from '$lib/interface/Trip';
	import { each } from 'svelte/internal';
	import { scale } from 'svelte/transition';

	export let left_results: number[];
	export let right_results: number[];

	let better: string;

	$: if (left_combined < right_combined) {
		better = 'A';
	} else {
		better = 'B';
	}

	$: difference = Math.abs(left_combined - right_combined);

	$: left_combined = left_results.reduce((a, b) => a + b, 0);
	$: right_combined = right_results.reduce((a, b) => a + b, 0);
</script>

<article
	class="backdrop-blur-md border-2 p-4 rounded-md flex flex-col text-lg m-4"
	transition:scale
>
	<div class="flex justify-evenly">
		<div class="flex flex-col justify-center">
			<span>Option A:</span>
			{#each left_results as result}
				<span>+ {result}</span>
			{/each}
			<span>= {left_combined}</span>
		</div>
		<div class="flex flex-col justify-center">
			<span>Option B:</span>
			{#each right_results as result}
				<span>+ {result}</span>
			{/each}
			<span>= {right_combined}</span>
		</div>
	</div>
	<div class="flex justify-center">
		{better} is a better option because it emits difference {difference} less carbon in g's.
	</div>
</article>
