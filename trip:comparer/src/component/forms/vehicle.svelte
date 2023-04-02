<script lang="ts">
	import type { Vehicle } from '$lib/interface/Vehicle';
	import { onMount } from 'svelte';
	import axios from 'axios';

	import { scale } from 'svelte/transition';
	import { getModelsById, makeStore } from '$lib/stores/vehicleStore';
	import type { Make } from '$lib/interface/Make';
	import type { Model } from '$lib/interface/Model';

	export let vehicle: Vehicle;

	export let makes: Make[];
	export let models: Model[];

	let loadingMakes: boolean = false;
	let loadingModels: boolean = false;

	onMount(async () => {
		loadingMakes = true;
		makeStore.subscribe((data) => {
			makes = data;
		});
		loadingMakes = false;
	});

	const retrieveModel = async () => {
		loadingModels = true;
		models = await getModelsById(vehicle.vehicle_model.vehicle_make_id);
		loadingModels = false;
	};
</script>

<article in:scale>
	<div>
		<label for="distance_un">Distance unit:</label>
		<select name="distance_un" id="distance_un" bind:value={vehicle.distance_unit}>
			<option value="mi">miles</option>
			<option value="km">kilometers</option>
		</select>
	</div>
	<div>
		<label for="distance">Distance:</label>
		<input type="number" name="distance" id="distance" bind:value={vehicle.distance_value} />
	</div>
	<div>
		<label for="make">Make:</label>
		{#if !loadingMakes}
			<select
				name="make"
				id="make"
				bind:value={vehicle.vehicle_model.vehicle_make_id}
				on:change={retrieveModel}
			>
				{#if makes !== undefined}
					{#each makes as make}
						<option value={make.id}>{make.name}</option>
					{/each}
				{/if}
			</select>
		{:else}
			<span class="text-white animate-pulse"><i class="bi bi-car-front" /></span>
		{/if}
	</div>
	{#if vehicle.vehicle_model.vehicle_make_id !== ''}
		<div in:scale>
			<label for="model">Model:</label>
			{#if !loadingModels}
				<select name="model" id="model" bind:value={vehicle.vehicle_model.vehicle_model_id}>
					{#if models !== undefined}
						{#each models as model}
							<option value={model.id}>{model.name}</option>
						{/each}
					{/if}
				</select>
			{:else}
				<span class="text-white animate-pulse"><i class="bi bi-car-front" /></span>
			{/if}
		</div>
	{/if}
</article>
