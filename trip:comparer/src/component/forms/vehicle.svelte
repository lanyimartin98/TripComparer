<script lang="ts">
	import type { Vehicle } from '$lib/interface/Vehicle';
	import type { VehicleModel } from '$lib/interface/VehicleModel';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { dataset_dev } from 'svelte/internal';

	export let vehicle: Vehicle;

	export let makes:any[];
	export let models:any[];

	onMount(async()=>{
		const resp=await axios.post("http://localhost:5173/api/make");
		makes=resp.data;
	})

	const retrieveModel=async()=>{
		const resp=await axios.post("http://localhost:5173/api/model");
		models=resp.data;
	}
</script>

<article>
	<div>
		<label for="distance_un">Distance unit:</label>
		<select name="distance_un" id="distance_un">
			<option value="mi">miles</option>
			<option value="km">kilometers</option>
		</select>
	</div>
	<div>
		<label for="distance">Distance:</label>
		<input type="text" name="distance" id="distance" />
	</div>
	<div>
		<label for="make">Make:</label>
		<select name="make" id="make" bind:value={vehicle.vehicle_model.vehicle_make_id} on:change={retrieveModel}>
		{#if makes!==undefined}
			{#each makes as make}
				<option value={make.data.id}>{make.data.attributes.name}</option>
			{/each}
		{/if}
		</select>
	</div>
	{#if vehicle.vehicle_model.vehicle_make_id !== ''}
		<div>
			<label for="model">Model:</label>
			<select name="model" id="model">
				{#if models!==undefined}
					{#each models as model}
						<option value={model.data.id}>{model.data.attributes.name}</option>
					{/each}
				{/if}
			</select>
		</div>
	{/if}
</article>
