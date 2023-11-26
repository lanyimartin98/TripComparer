<script lang="ts">
	import type { Result } from '$lib/interface/Result';
	import type { Trip } from '$lib/interface/Trip';
	import { each, identity } from 'svelte/internal';
	import {slide } from 'svelte/transition';
	import ComparisonObject from './comparisonObject.svelte';

	export let left_results: Result[];
	export let right_results: Result[];

	let better: string;

	let unit: string;

	let display_unit: string;

	$: if (left_combined < right_combined) {
		better = 'A';
	} else if (left_combined > right_combined) {
		better = 'B';
	} else {
		better = 'equal';
	}

	$: switch (unit) {
		case 'gram':
			display_unit = 'g';
			break;
		case 'kilogram':
			display_unit = 'kg';
			break;
		case 'pound':
			display_unit = 'lb';
			break;
		case 'metric_ton':
			display_unit = 't';
			break;
	}

	$: difference = Math.abs(left_combined - right_combined);

	$: left_combined = left_results.reduce((a, b) => a + b[unit], 0);
	$: right_combined = right_results.reduce((a, b) => a + b[unit], 0);
</script>

<article
	class="backdrop-blur-md border-2 p-2 rounded-md flex flex-col text-lg m-2"
	transition:slide
>
	<div class="flex justify-between p-2">
		<div>Results</div>
		<select name="unit" id="unit" bind:value={unit} class="text-right">
			<option value="gram" selected>Grams</option>
			<option value="kilogram">Kilograms</option>
			<option value="pound">Pounds</option>
			<option value="metric_ton">Metric Tons</option>
		</select>
	</div>
	<div class="flex justify-evenly items-center text-center">
		<div class="flex flex-col justify-center">
			<span>Option A:</span>
			{#each left_results as result}
				<span>+ {result[unit]} {display_unit}(s)</span>
			{/each}
			<span>= {left_combined} {display_unit}(s)</span>
		</div>
		<div class="flex flex-col justify-center">
			<span>Option B:</span>
			{#each right_results as result}
				<span>+ {result[unit]} {display_unit}(s)</span>
			{/each}
			<span>= {right_combined} {display_unit}(s)</span>
		</div>
	</div>
	<div class="flex justify-center items-center text-center">
		{#if better === 'equal'}
			Both options emit the same ammount of carbon.
		{:else}
			{better} is a better option because it emits difference {difference} less carbon in {display_unit}(s).
		{/if}
	</div>
</article>
