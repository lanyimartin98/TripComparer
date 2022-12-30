<script lang="ts">
	import type { Vehicle } from '$lib/interface/Vehicle';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { PUBLIC_LEAN_URL } from '$env/static/public';

	import { scale } from 'svelte/transition';

	export let vehicle: Vehicle;

	export let makes: any[];
	export let models: any[];

	onMount(async () => {
		const resp = await axios.get(`${PUBLIC_LEAN_URL}/vehicle_makes`);
		makes = resp.data;
	});

	const retrieveModel = async () => {
		const resp = await axios.post(
			`${PUBLIC_LEAN_URL}/vehicle_makes/${vehicle.vehicle_model.vehicle_make_id}`
		);
		models = resp.data;
	};
</script>

<article in:scale>
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
		<select
			name="make"
			id="make"
			bind:value={vehicle.vehicle_model.vehicle_make_id}
			on:change={retrieveModel}
		>
			{#if makes !== undefined}
				{#each makes as make}
					<option value={make.data.id}>{make.data.attributes.name}</option>
				{/each}
			{/if}
		</select>
	</div>
	{#if vehicle.vehicle_model.vehicle_make_id !== ''}
		<div in:scale>
			<label for="model">Model:</label>
			<select name="model" id="model">
				{#if models !== undefined}
					{#each models as model}
						<option value={model.data.id}>{model.data.attributes.name}</option>
					{/each}
				{/if}
			</select>
		</div>
	{/if}
</article>
