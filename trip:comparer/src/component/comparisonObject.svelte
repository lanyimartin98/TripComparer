<script lang="ts">
	import type { TransportObj } from '$lib/interface/TransportObj';
	import TransportObject from './transportObject.svelte';

	export let transportObjects: TransportObj[];

	const addTransObject = () => {
		const newTransObject: TransportObj = {
			type: null,
			formValid:false,
			typeAsString:''
		};
		const combinedTransportObject = transportObjects.concat(newTransObject);
		transportObjects = combinedTransportObject;
	};

	const deleteTransportObject = (event: any) => {
		const filteredTransportObjects = transportObjects.filter((t) => {
			if (t !== event.detail.object) {
				return t;
			}
		});
		transportObjects = filteredTransportObjects;
	};
</script>

<section class="md:w-1/2 w-full relative">
	{#each transportObjects as transObj}
		<TransportObject
			bind:transportObj={transObj}
			on:delete={deleteTransportObject}
			numberOfTransportObjects={transportObjects.length}
		/>
	{/each}
	<div class="flex items-center justify-center">
		<button class="hover:-translate-y-1 hover:scale-105 duration-300 hover:text-white" on:click={() => addTransObject()}
			>Add transobject <i class="bi bi-plus-circle-fill" /></button
		>
	</div>
</section>
