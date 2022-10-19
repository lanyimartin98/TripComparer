<script lang="ts">
	import type { Vehicle } from '$lib/interface/Vehicle';

	export let vehicle: Vehicle;
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
		<select name="make" id="make" bind:value={vehicle.vehicle_model.vehicle_make_id}>
			<option value="1">BMW</option>
			<option value="2">Mercedes</option>
		</select>
	</div>
	{#if vehicle.vehicle_model.vehicle_make_id !== ''}
		<div>
			<label for="model">Model:</label>
			<select name="model" id="model">
				<option value="">323ci</option>
				<option value="">325i</option>
			</select>
		</div>
	{/if}
</article>
