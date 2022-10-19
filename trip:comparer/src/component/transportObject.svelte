<section class="border-cyan-500 border-2 p-4 rounded-md flex flex-col text-lg m-4">
    <div>
    <label for="type">Type:</label>
    <select name="type" class="bg-black border-cyan-500" bind:value={transport}>
        <option value="Flight">flight</option>
        <option value="Vehicle">vehicle</option>
    </select>
</div>
    {#if transport==="Flight"}
        <FlightForm flight={transportObj.type}/>
    {:else if transport==="vehicle"}
    Vechile
    {/if}
</section>

<script lang="ts">
	import type { Leg } from "$lib/interface/Leg";
    import type{Flight} from "$lib/interface/Flight";
	import type { TransportObj } from "$lib/interface/TransportObj";
	import type { Vehicle } from "$lib/interface/Vehicle";
	import type { VehicleModel } from "$lib/interface/VehicleModel";

    import FlightForm from './forms/flight.svelte';


    $: changeTransport(transport);

    export let transportObj:TransportObj;

    let transport=""

    const changeTransport=(value:String)=>{

        if(value==="Flight"){
            const flight:Flight={
                type: 'flight',
	            passengers: 1,
	            legs:[
                    {
                        departure_airport: "",
	                    destination_airport:""
                    }
                ]
            };
            transportObj.type=flight;
        }else if(value==="Vehicle"){
            const vehicleModel:VehicleModel={
                vehicle_make_id: "",
	            vehicle_model_id: ""
            }

            const vehicle:Vehicle={
                type: 'vehicle',
	            distance_unit: 'km',
	            distance_value: 0,
	            vehicle_model: vehicleModel
            }
            transportObj.type=vehicle
        }
    }

</script>

<style>
    div{
        @apply p-1
    }
</style>