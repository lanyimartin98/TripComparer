<section class="border-cyan-500 border-2 p-4 rounded-md flex flex-col text-lg">
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
	import type { TransportObj } from "$lib/interface/TrabsportObj";
	import type { Vehicle } from "$lib/interface/Vehicle";
	import type { VehicleModel } from "$lib/interface/VehicleModel";

    import FlightForm from './forms/flight.svelte';


    $: changeTransport(transport);

    let transportObj:TransportObj={
        type:null
    }

    let transport=""
    let legs:Leg[]=[
        {
            departure_airport: "",
	        destination_airport:""
        }
    ]

    const changeTransport=(value:String)=>{

        if(value==="Flight"){
            const flight:Flight={
                type: 'flight',
	            passengers: 0,
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
        console.log(transportObj.type)
    }

</script>

<style>
    div{
        padding:0.1em
    }
</style>