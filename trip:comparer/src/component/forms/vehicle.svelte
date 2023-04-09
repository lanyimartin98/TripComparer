<script lang="ts">
	import type { Vehicle } from '$lib/interface/Vehicle';
	import { onMount } from 'svelte';

	import { scale } from 'svelte/transition';
	import { getModelsById, makeStore } from '$lib/stores/vehicleStore';

	import type { Make } from '$lib/interface/Make';
	import type { Model } from '$lib/interface/Model';

	export let vehicle: Vehicle;

	export let makes: Make[];
	let models: Model[];

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
		models = await getModelsById(vehicle.vehicle_make);
		loadingModels = false;
	};
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
		{#if !loadingMakes}
			<select
				name="make"
				id="make"
				bind:value={vehicle.vehicle_make}
				on:change={retrieveModel}
				class="w-1/3"
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
	{#if vehicle.vehicle_make !== ''}
		<div in:scale>
			<label for="model">Model:</label>
			{#if !loadingModels}
				<select name="model" id="model" bind:value={vehicle.vehicle_model_id} class="w-1/3">
					{#if models !== undefined}
						{#each models as model}
							<option value={model.id}>{model.name} ({model.year})</option>
						{/each}
					{/if}
				</select>
			{:else}
				<span class="text-white animate-pulse"><i class="bi bi-car-front" /></span>
			{/if}
		</div>
	{/if}
</article>
