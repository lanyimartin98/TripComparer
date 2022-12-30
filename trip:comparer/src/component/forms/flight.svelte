<script lang="ts">
	import type { Flight } from '$lib/interface/Flight';
	import type { Leg } from '$lib/interface/Leg';
	import { scale } from 'svelte/transition';
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
</script>

<article in:scale>
	<h3>Flights:</h3>
	<div>
		{#each flight.legs as leg}
			<div transition:scale>
				<label for="dep">Departure:</label>
				<input type="text" bind:value={leg.departure_airport} />
				<label for="dest">Destination:</label>
				<input type="text" bind:value={leg.destination_airport} />
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
