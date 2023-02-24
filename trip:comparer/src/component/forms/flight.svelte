<script lang="ts">
	import type { Airport } from '$lib/interface/Airport';
	import type { Flight } from '$lib/interface/Flight';
	import type { Leg } from '$lib/interface/Leg';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import axios from 'axios';
	import { PUBLIC_LEAN_URL } from '$env/static/public';
	import { airportStore } from '$lib/stores/airportStore';

	let airports: Airport[];

	export let flight: Flight;

	const increasePassenger = () => {
		flight.passengers++;
	};

	const decreasePassenger = () => {
		if (flight.passengers > 1) {
			flight.passengers--;
		}
	};

	const addLeg = () => {
		const newLeg: Leg = {
			departure_airport: '',
			destination_airport: ''
		};
		const combinedLeg = flight.legs.concat(newLeg);
		flight.legs = combinedLeg;
	};

	const removeLeg = (leg: Leg) => {
		const legs = flight.legs.filter((l) => {
			if (l !== leg) {
				return l;
			}
		});

		flight.legs = legs;
	};

	onMount(async () => {
		airportStore.subscribe((data) => {
			airports = data;
		});
	});
</script>

<article in:scale>
	<h3>Flights:</h3>
	<div>
		{#each flight.legs as leg}
			<div transition:scale>
				<label for="dep">Departure:</label>
				<select name="dep" id="dep" bind:value={leg.departure_airport}>
					{#if airports !== undefined}
						{#each airports as airport}
							<option value={airport.IATA}>{airport.name}</option>
						{/each}
					{/if}
				</select>
				<label for="dest">Destination:</label>
				<select name="dest" id="dest" bind:value={leg.destination_airport}>
					{#if airports !== undefined}
						{#each airports as airport}
							<option value={airport.IATA}>{airport.name}</option>
						{/each}
					{/if}
				</select>
				<div class="inline-block">
					<div class="group flex relative">
						<a
							href="https://www.iata.org/en/publications/directories/code-search/"
							target="_blank"
							class="hover:text-cyan-500"><span><i class="bi bi-question-circle" /></span></a
						>
						<span
							class="w-48 text-center group-hover:opacity-100 transition-opacity bg-cyan-500 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-16
						-translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">More info on IATA codes.</span
						>
					</div>
				</div>
				{#if Object.keys(flight.legs).length > 1}
					<button on:click={() => removeLeg(leg)}><i class="bi bi-x-circle-fill" /></button>
				{/if}
				<button on:click={() => addLeg()}><i class="bi bi-plus-circle-fill" /></button>
			</div>
		{/each}
	</div>
	<div>
		<label for="Passengers">Passengers:</label>
		<button class="text-sm" on:click={() => decreasePassenger()}><i class="bi bi-dash" /></button>
		<span>{flight.passengers}</span>
		<button on:click={() => increasePassenger()}><i class="bi bi-plus" /></button>
	</div>
</article>

<style>
	button {
		@apply text-base;
	}
</style>
