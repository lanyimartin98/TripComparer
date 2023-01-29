<script lang="ts">
	import ComparisonObject from '../component/comparisonObject.svelte';
	import ResultsComponent from '../component/results.svelte';
	import type { Trip } from '$lib/interface/Trip';

	let compared: Boolean = false;
	let unique = {};

	let tripsObj: Trip[] = [
		{
			transport_obj: [{ type: null }],
			carbon_g: null
		},
		{
			transport_obj: [{ type: null }],
			carbon_g: null
		}
	];

	const compare = () => {
		compared = true;
		console.log(JSON.stringify(tripsObj));
	};

	const reset = () => {
		unique = {};
		const obj: Trip[] = [
			{
				transport_obj: [{ type: null }],
				carbon_g: null
			},
			{
				transport_obj: [{ type: null }],
				carbon_g: null
			}
		];

		tripsObj = obj;
		compared = false;
	};
</script>

{#key unique}
	<main class="flex flex-wrap flex-row justify-evenly">
		<ComparisonObject bind:transportObjects={tripsObj[0].transport_obj} />
		<ComparisonObject bind:transportObjects={tripsObj[1].transport_obj} />
	</main>
{/key}
<section class="flex justify-center">
	<button on:click={() => compare()}>Compare <i class="bi bi-search" /></button>
	<button on:click={() => reset()}>Reset <i class="bi bi-x-circle-fill" /></button>
</section>
{#if compared}
	<ResultsComponent left_carbon="0" right_carbon="0" />
{/if}
