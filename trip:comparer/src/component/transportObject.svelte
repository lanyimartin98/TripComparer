<script lang="ts">
	import type { Leg } from '$lib/interface/Leg';
	import type { Flight } from '$lib/interface/Flight';
	import type { TransportObj } from '$lib/interface/TransportObj';
	import type { Vehicle } from '$lib/interface/Vehicle';
	import type { VehicleModel } from '$lib/interface/VehicleModel';

	import FlightForm from './forms/flight.svelte';
	import VehicleForm from './forms/vehicle.svelte';
	import { slide } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';

	$: changeTransport(transport);

	let transport='';

	export let transportObj: TransportObj;
	export let numberOfTransportObjects: number;

	const dispatch = createEventDispatcher();

	const changeTransport = (value: string) => {
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
			transportObj.typeAsString="Flight"
		} else if (value === 'Vehicle') {
			const vehicle: Vehicle = {
				type: 'vehicle',
				distance_unit: 'km',
				distance_value: undefined,
				vehicle_model_id: '',
				vehicle_make: ''
			};
			transportObj.typeAsString="Vehicle"
			transportObj.type = vehicle;
		}
	};

	const deleteTransportObject = () => {
		dispatch('delete', {
			object: transportObj
		});
	};
</script>

<section class="relative backdrop-blur-md p-2 rounded-md flex flex-col text-lg m-2 border-2" transition:slide>
	<div class="flex flex-row justify-between">
		<div>
			<label for="type">Type:</label>
			<select name="type" bind:value={transport}>
				<option value="Flight">flight</option>
				<option value="Vehicle">vehicle</option>
			</select>
		</div>

		{#if numberOfTransportObjects > 1}
			<button class="hover:-translate-y-1 hover:scale-105 duration-300 hover:text-white"><i class="bi bi-x-circle-fill" on:click={() => deleteTransportObject()} /></button>
		{/if}
	</div>
	{#if transportObj.typeAsString === 'Flight'}
		<FlightForm bind:flight={transportObj.type} bind:formValid={transportObj.formValid}/>
	{:else if transportObj.typeAsString === 'Vehicle'}
		<VehicleForm bind:vehicle={transportObj.type} bind:formValid={transportObj.formValid}/>
	{/if}
</section>

<style>
	div {
		@apply p-1;
	}
</style>
