<script lang="ts">
	import type { Airport } from '$lib/interface/Airport';
	import type { Flight } from '$lib/interface/Flight';
	import type { Leg } from '$lib/interface/Leg';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import axios from 'axios';
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
		try {
			airportStore.subscribe((data) => {
				airports = data;
			});
		} catch (err) {
			console.log(err);
		}
	});
</script>

<article class="pl-4" in:scale>
	<h3>Flights:</h3>
	<div class="pl-4">
		{#each flight.legs as leg}
			<div class="flex lg:flex-row flex-col" transition:scale>
				<div>
					<label for="dep">Departure:</label>
					<select name="dep" id="dep" bind:value={leg.departure_airport} class="w-1/3">
						{#if airports !== undefined}
							{#each airports as airport}
								<option value={airport.IATA}>{airport.name} ({airport.IATA})</option>
							{/each}
						{/if}
					</select>
				</div>
				<div>
					<label for="dest">Destination:</label>
					<select name="dest" id="dest" bind:value={leg.destination_airport} class="w-1/3">
						{#if airports !== undefined}
							{#each airports as airport}
								<option value={airport.IATA}>{airport.name} ({airport.IATA})</option>
							{/each}
						{/if}
					</select>
					{#if Object.keys(flight.legs).length > 1}
						<button on:click={() => removeLeg(leg)}><i class="bi bi-x-circle-fill" /></button>
					{/if}
					<button on:click={() => addLeg()}><i class="bi bi-plus-circle-fill" /></button>
				</div>
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
