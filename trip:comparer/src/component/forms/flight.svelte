<script lang="ts">
	import type { Airport } from '$lib/interface/Airport';
	import type { Flight } from '$lib/interface/Flight';
	import type { Leg } from '$lib/interface/Leg';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { airportStore } from '$lib/stores/airportStore';
	import { flightSchema } from '$lib/helper/schemas';
	import { v4 as uuidv4 } from 'uuid';

	import SearchableDropdown from '../utilities/searchableDropdown.svelte';

	let airports: Airport[];

	let loading_airports: boolean = false;

	export let formValid: boolean = false;

	export let flight: Flight;

	const increasePassenger = () => {
		flight.passengers++;
	};

	const decreasePassenger = () => {
		console.log(flight);
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

	$: if (flightSchema.safeParse(flight).success) {
		formValid = true;
	} else {
		formValid = false;
	}
</script>

<article class="pl-4 relative" transition:scale>
	<h3>Flights:</h3>
	<div class="pl-4">
		{#each flight.legs as leg}
			<div class="flex flex-col" transition:scale>
				<label for="dep">Departure:</label>
				{#if airports !== undefined}
					<SearchableDropdown bind:value={leg.departure_airport} bind:items={airports} />
				{:else}
					<span class="text-white animate-pulse"><i class="bi bi-airplane" /></span>
				{/if}
				<label for="dest">Destination:</label>
				{#if airports !== undefined}
					<SearchableDropdown bind:value={leg.destination_airport} bind:items={airports} />
				{:else}
					<span class="text-white animate-pulse"><i class="bi bi-airplane" /></span>
				{/if}
				<div class="flex flex-row">
					{#if Object.keys(flight.legs).length > 1}
						<button
							id="removeAirportLeg_{uuidv4()}"
							aria-label="Remove airport leg"
							class="hover:-translate-y-1 hover:scale-105 duration-300 hover:text-white"
							on:click={() => removeLeg(leg)}><i class="bi bi-x-circle-fill" /></button
						>
					{/if}
					<button
						id="addAirportLeg_{uuidv4()}"
						aria-label="Add airport leg"
						class="hover:-translate-y-1 hover:scale-105 duration-300 hover:text-white"
						on:click={() => addLeg()}><i class="bi bi-plus-circle-fill" /></button
					>
				</div>
			</div>
		{/each}
	</div>
	<div>
		<label for="Passengers">Passengers:</label>
		<button
			id="decreasePassengerNumber_{uuidv4()}"
			aria-label="Decrease passenger number"
			class="text-sm hover:-translate-y-1 hover:scale-105 duration-300 hover:text-white"
			on:click={() => decreasePassenger()}><i class="bi bi-dash" /></button
		>
		<span>{flight.passengers}</span>
		<button
			id="increasePassengerNumber_{uuidv4()}"
			aria-label="Increase passenger number"
			class="hover:-translate-y-1 hover:scale-105 duration-300 hover:text-white"
			on:click={() => increasePassenger()}><i class="bi bi-plus" /></button
		>
	</div>
</article>

<style>
	button {
		@apply text-base;
	}
</style>
