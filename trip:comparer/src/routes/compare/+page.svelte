<script lang="ts">
	import ComparisonObject from '../../component/comparisonObject.svelte';
	import ResultsComponent from '../../component/results.svelte';
	import type { Trip } from '$lib/interface/Trip';
	import { onMount } from 'svelte';
	import { getAllAirports } from '$lib/stores/airportStore';
	import { getAllMakes } from '$lib/stores/vehicleStore';
	import Error from '../../component/utilities/error.svelte';
	import { isFlight, isVehicle } from '$lib/helper/typeChecker';
	import { trpc } from '$lib/trpc/client';
	import Results from '../../component/results.svelte';
	import { each } from 'svelte/internal';
	import { TRPCClientError } from '@trpc/client';
	import type { Result } from '$lib/interface/Result';
	import { errorStore, pushError } from '$lib/stores/errorStore';
	import { slide } from 'svelte/transition';

	let unique = {};
	let errors: string[] = [];
	let left_results: Result[] = [];
	let right_results: Result[] = [];
	let comparisonDisabled = true;

	const unsubscribe = errorStore.subscribe((err) => {
		errors = err;
	});

	let tripsObj: Trip[] = [
		{
			transport_obj: [{ type: null, formValid: false, typeAsString: '' }]
		},
		{
			transport_obj: [{ type: null, formValid: false, typeAsString: '' }]
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

	const compare = async () => {
		left_results = [];
		right_results = [];
		let error: string[] = [];
		tripsObj[0].transport_obj.forEach(async (transport) => {
			try {
				if (isFlight(transport.type)) {
					const estimate: Result = await trpc().estimatesFlight.query(transport.type);
					left_results = [...left_results, estimate];
				} else {
					const estimate: Result = await trpc().estimatesVehicle.query(transport.type);
					left_results = [...left_results, estimate];
				}
			} catch (err) {
				if (err instanceof TRPCClientError) {
					JSON.parse(err.message).forEach((e: any) => {
						pushError(e.message);
					});
				} else {
					pushError('Internal server error.');
				}
			}
		});

		tripsObj[1].transport_obj.forEach(async (transport) => {
			try {
				if (isFlight(transport.type)) {
					const estimate: Result = await trpc().estimatesFlight.query(transport.type);
					right_results = [...right_results, estimate];
				} else {
					const estimate: Result = await trpc().estimatesVehicle.query(transport.type);
					right_results = [...right_results, estimate];
				}
			} catch (err) {
				if (err instanceof TRPCClientError) {
					JSON.parse(err.message).forEach((e: any) => {
						pushError(e.message);
					});
				} else {
					pushError('Internal server error.');
				}
			}
		});
	};

	const reset = () => {
		unique = {};
		const obj: Trip[] = [
			{
				transport_obj: [{ type: null, formValid: false, typeAsString: '' }]
			},
			{
				transport_obj: [{ type: null, formValid: false, typeAsString: '' }]
			}
		];

		left_results = [];
		right_results = [];

		tripsObj = obj;
	};

	const checkFormValidity = (leftTrip: Trip, rightTrip: Trip) => {
		let valid: boolean = true;
		leftTrip.transport_obj.forEach((t) => {
			if (!t.formValid) {
				valid = false;
			}
		});
		rightTrip.transport_obj.forEach((t) => {
			if (!t.formValid) {
				valid = false;
			}
		});
		return valid;
	};

	$: comparisonDisabled = !checkFormValidity(tripsObj[0], tripsObj[1]);

	onMount(async () => {
		getAllAirports();
		getAllMakes();
	});
</script>

{#each errors as error}
	<Error errorText={error} on:hideError={hideError} />
{/each}

{#key unique}
	<main class="flex flex-wrap flex-row justify-evenly" transition:slide>
		<ComparisonObject bind:transportObjects={tripsObj[0].transport_obj} />
		<ComparisonObject bind:transportObjects={tripsObj[1].transport_obj} />
	</main>
{/key}
<section class="flex justify-center" transition:slide>
	<button
		id="compare"
		aria-label="Compare transport objects"
		class="hover:-translate-y-1 hover:scale-105 duration-300 hover:text-white disabled:text-gray disabled:opacity-75"
		on:click={() => compare()}
		disabled={comparisonDisabled}>Compare <i class="bi bi-search" /></button
	>
	<button
		id="reset"
		aria-label="Reset"
		class="hover:-translate-y-1 hover:scale-105 duration-300 hover:text-white"
		on:click={() => reset()}>Reset <i class="bi bi-x-circle-fill" /></button
	>
</section>
{#if left_results.length > 0 && right_results.length > 0 && errors.length === 0}
	<Results {left_results} {right_results} />
{/if}
