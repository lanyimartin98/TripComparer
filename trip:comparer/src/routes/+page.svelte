<script lang="ts">
	import ComparisonObject from '../component/comparisonObject.svelte';
	import ResultsComponent from '../component/results.svelte';
	import type { Trip } from '$lib/interface/Trip';
	import { onMount } from 'svelte';
	import { getAllAirports } from '$lib/stores/airportStore';
	import { getAllMakes } from '$lib/stores/vehicleStore';
	import { formValidate } from '$lib/helper/formValidator';
	import Error from '../component/utilities/error.svelte';

	let compared: Boolean = false;
	let unique = {};
	let errors: string[] = [];

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

	const hideError = (event: any) => {
		const errorText = event.detail.object;
		const filteredErrors = errors.filter((error) => {
			if (error !== errorText) {
				return error;
			}
		});
		errors = filteredErrors;
	};

	const compare = () => {
		let success: boolean = true;
		let error: string[] = [];
		console.log(tripsObj);
		tripsObj.forEach((trip) => {
			trip.transport_obj.forEach((transport) => {
				const validation = formValidate(transport);
				if (validation === undefined) {
					success = false;
					error.push('One or more transport object(s) is/are empty!');
					return;
				}
				if (validation.success === false) {
					success = false;
					validation.error.errors.forEach((validationError) => {
						error.push(validationError.message);
					});

					return;
				}
			});
		});
		errors = error;
		compared = success;
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

	onMount(async () => {
		getAllAirports();
		getAllMakes();
	});
</script>

<article class="bg-cyan-500 p-4 w-full">
	Hello dear visitor! This is a portfolio project of mine, which utilizes FlightLAB's airport API
	and the Carbon Interface. You can use it to compare your options of travel in case of it's
	emissions. Please keep in mind that this is not a prodcution app, more like a demo of my frontend
	skills. If you find it useful please do not hesitate to help the incredible work of these to API
	developer teams!
	<br />Tech stack:
	<ul class="list-disc list-inside">
		<li>Sveltekit</li>
		<li>TailwindCSS</li>
		<li>TRPC</li>
		<li>Zod</li>
	</ul>
	If you are interested in my work check out my Github or LindkedIn page!
</article>
{#each errors as error}
	<Error errorText={error} on:hideError={hideError} />
{/each}

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
