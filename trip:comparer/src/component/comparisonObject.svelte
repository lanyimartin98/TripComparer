<script lang="ts">
	import type { TransportObj } from '$lib/interface/TransportObj';
	import TransportObject from './transportObject.svelte';

	export let transportObjects: TransportObj[];

	const addTransObject = () => {
		console.log(transportObjects);
		const newTransObject: TransportObj = {
			type: null
		};
		const combinedTransportObject = transportObjects.concat(newTransObject);
		transportObjects = combinedTransportObject;
		console.log(transportObjects);
	};

	const deleteTransportObject = (event: any) => {
		console.log(event);
		const filteredTransportObejcts = transportObjects.filter((t) => {
			if (t !== event.detail.object) {
				console.log(t);
				return t;
			}
		});
		transportObjects = filteredTransportObejcts;
	};
</script>

<section class="md:w-1/2 w-full p-1">
	{#each transportObjects as transObj}
		<TransportObject
			bind:transportObj={transObj}
			on:delete={deleteTransportObject}
			numberOfTransportObjects={transportObjects.length}
		/>
	{/each}
	<div class="flex items-center justify-center">
		<button on:click={() => addTransObject()}
			>Add transobject <i class="bi bi-plus-circle-fill" /></button
		>
	</div>
</section>
