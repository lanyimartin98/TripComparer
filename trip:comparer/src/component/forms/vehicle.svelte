<script lang="ts">
	import type { Vehicle } from '$lib/interface/Vehicle';
	import { onMount } from 'svelte';

	import { scale } from 'svelte/transition';
	import { getModelsById, makeStore } from '$lib/stores/vehicleStore';

	import type { Make } from '$lib/interface/Make';
	import type { Model } from '$lib/interface/Model';

	import SearchableDropdown from '../utilities/searchableDropdown.svelte';

	import { vehicleSchema } from '$lib/helper/schemas';

	export let vehicle: Vehicle;

	export let formValid: boolean = false;

	let makes: Make[];
	let models: Model[];

	onMount(async () => {
		makeStore.subscribe((data) => {
			makes = data;
		});
	});

	$: {
		if (vehicle.vehicle_make !== '') {
			getModelsById(vehicle.vehicle_make).then((m) => {
				models = m;
			});
		}
	}

	$: if (vehicleSchema.safeParse(vehicle).success) {
		formValid = true;
	} else {
		formValid = false;
	}
</script>

<article class="pl-4" in:scale>
	<div>
		<label for="distance_un">Distance unit:</label>
		<select name="distance_un" id="distance_un" bind:value={vehicle.distance_unit} class="w-1/3">
			<option value="mi">miles</option>
			<option value="km">kilometers</option>
		</select>
	</div>
	<div>
		<label for="distance">Distance:</label>
		<input
			type="number"
			name="distance"
			id="distance"
			bind:value={vehicle.distance_value}
			class="w-1/3"
		/>
	</div>
	<div>
		<label for="make">Make:</label>
		{#if makes !== undefined}
			<SearchableDropdown bind:value={vehicle.vehicle_make} bind:items={makes} />
		{/if}
	</div>
	{#if vehicle.vehicle_make !== ''}
		<div in:scale>
			<label for="model">Model:</label>
			{#if models !== undefined}
				<SearchableDropdown bind:value={vehicle.vehicle_model_id} bind:items={models} />
			{:else}
				<span class="text-white animate-pulse"><i class="bi bi-car-front" /></span>
			{/if}
		</div>
	{/if}
</article>
