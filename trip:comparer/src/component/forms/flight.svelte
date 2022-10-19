<article>
    <h3>Flights:</h3>
    <div>
    {#each flight.legs as leg}
        <div>
            <label for="dep">Departure:</label>
            <input class="rounded-md bg-black text-white border-white border-2" type="text"/>
            <label for="dest">Destination:</label>
            <input class="rounded-md bg-black text-white border-white border-2" type="text"/>
            {#if Object.keys(flight.legs).length>1}
            <button><i class="bi bi-x-circle-fill"></i></button>
            {/if}
            <button on:click={()=>addLeg()}><i class="bi bi-plus-circle-fill"></i></button>
        </div>
    {/each}
</div>
<div>
    <label for="Passengers">Passengers:</label>
    <button on:click={()=>decreasePassenger()}><i class="bi bi-dash"></i></button>
    <span>{flight.passengers}</span>
    <button on:click={()=>increasePassenger()}><i class="bi bi-plus"></i></button>
</article>

<script lang="ts">

import type { Flight } from "$lib/interface/Flight";
import type { Leg } from "$lib/interface/Leg";
export let flight:Flight;

const increasePassenger=()=>{
    flight.passengers++;
}

const decreasePassenger=()=>{
    if(flight.passengers>1){
        flight.passengers--;
    }
}

const addLeg=()=>{
    const newLeg:Leg={
        departure_airport:"",
	    destination_airport:""
    }
    const combinedLeg=flight.legs.concat(newLeg);
    flight.legs=combinedLeg;
}

</script>