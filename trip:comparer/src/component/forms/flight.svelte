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
            <button><i class="bi bi-plus-circle-fill"></i></button>
        </div>
    {/each}
</div>
<div>
    <label for="Passengers">Passengers:</label>
    <button><i class="bi bi-dash"></i></button>
    <span>{flight.passengers}</span>
    <button><i class="bi bi-plus"></i></button>
</article>

<script lang="ts">
	import type { Flight } from "$lib/interface/Flight";



export let flight:Flight;

</script>