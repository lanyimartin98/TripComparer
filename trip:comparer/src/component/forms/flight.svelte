<script lang="ts">
	import type { Airport } from '$lib/interface/Airport';
	import type { Flight } from '$lib/interface/Flight';
	import type { Leg } from '$lib/interface/Leg';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import axios from 'axios';
	import { airportStore } from '$lib/stores/airportStore';
	import { boolean } from 'zod';

	let airports: Airport[];

	let loading_airports: boolean = false;

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
			loading_airports = true;
			airportStore.subscribe((data) => {
				airports = data;
			});
			loading_airports = false;
	});
</script>

<article class="pl-4" in:scale>
	<h3>Flights:</h3>
	<div class="pl-4">
		{#each flight.legs as leg}
			<div class="flex lg:flex-row flex-col" transition:scale>
				<div>
					<label for="dep">Departure:</label>
					{#if !loading_airports}
						<select name="dep" id="dep" bind:value={leg.departure_airport} class="w-1/3">
							{#if airports !== undefined}
								{#each airports as airport}
									<option value={airport.IATA}>{airport.name} ({airport.IATA})</option>
								{/each}
							{/if}
						</select>
					{:else}
						<span class="text-white animate-pulse"><i class="bi bi-airplane" /></span>
					{/if}
				</div>
				<div>
					<label for="dest">Destination:</label>
					{#if !loading_airports}
						<select name="dest" id="dest" bind:value={leg.destination_airport} class="w-1/3">
							{#if airports !== undefined}
								{#each airports as airport}
									<option value={airport.IATA}>{airport.name} ({airport.IATA})</option>
								{/each}
							{/if}
						</select>
					{:else}
						<span class="text-white animate-pulse"><i class="bi bi-airplane" /></span>
					{/if}
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
