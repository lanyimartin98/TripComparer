<script lang="ts">
	import type { TransportObj } from "$lib/interface/TransportObj";
	import TransportObject from "./transportObject.svelte";

export let transportObjects:TransportObj[];

const addTransObject=()=>{
	console.log(transportObjects)
	const newTransObject:TransportObj={
		type:null
	}
	const combinedTransportObject=transportObjects.concat(newTransObject);
	transportObjects=combinedTransportObject;
	console.log(transportObjects)
}

</script>
<section class="md:w-1/2 w-full p-1">
{#each transportObjects as transObj}
	<TransportObject transportObj={transObj}/>
{/each}
<div class="flex items-center justify-center">
<button on:click={()=>addTransObject()}>Add transobject <i class="bi bi-plus-circle-fill"></i></button>
</div>
</section>