<script lang="ts">
	import type { Leg } from '$lib/interface/Leg';
	import type { Flight } from '$lib/interface/Flight';
	import type { TransportObj } from '$lib/interface/TransportObj';
	import type { Vehicle } from '$lib/interface/Vehicle';
	import type { VehicleModel } from '$lib/interface/VehicleModel';

	import FlightForm from './forms/flight.svelte';
	import VehicleForm from './forms/vehicle.svelte';
	import { scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	$: changeTransport(transport);

	export let transportObj: TransportObj;
	export let numberOfTransportObjects: number;

	const dispatch = createEventDispatcher();

	let transport = '';

	const changeTransport = (value: String) => {
		if (value === 'Flight') {
			const flight: Flight = {
				type: 'flight',
				passengers: 1,
				legs: [
					{
						departure_airport: '',
						destination_airport: ''
					}
				]
			};
			transportObj.type = flight;
		} else if (value === 'Vehicle') {
			const vehicle: Vehicle = {
				type: 'vehicle',
				distance_unit: 'km',
				distance_value: undefined,
				vehicle_model_id: '',
				vehicle_make: ''
			};
			transportObj.type = vehicle;
		}
	};

	const deleteTransportObject = () => {
		dispatch('delete', {
			object: transportObj
		});
	};
</script>

<section class="backdrop-blur-md p-2 rounded-md flex flex-col text-lg m-2 border-2" in:scale>
	<div class="flex flex-row justify-between">
		<div>
			<label for="type">Type:</label>
			<select name="type" bind:value={transport}>
				<option value="Flight">flight</option>
				<option value="Vehicle">vehicle</option>
			</select>
		</div>

		{#if numberOfTransportObjects > 1}
			<button><i class="bi bi-x-circle-fill" on:click={() => deleteTransportObject()} /></button>
		{/if}
	</div>
	{#if transport === 'Flight'}
		<FlightForm bind:flight={transportObj.type} />
	{:else if transport === 'Vehicle'}
		<VehicleForm bind:vehicle={transportObj.type} />
	{/if}
</section>

<style>
	div {
		@apply p-1;
	}
</style>
