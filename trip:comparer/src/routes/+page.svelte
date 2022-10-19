<main class="flex flex-wrap flex-row justify-evenly">
    <ComparisonObject transportObjects={tripsObj[0].transport_obj}/>
    <ComparisonObject transportObjects={tripsObj[1].transport_obj}/>
</main>
<section class="flex justify-center">
<button on:click={()=>compare()}>Compare <i class="bi bi-search"></i></button>
<button>Reset <i class="bi bi-x-circle-fill"></i></button>
</section>

<script lang="ts">
import ComparisonObject from "../component/comparisonObject.svelte";
import type { Trip } from "$lib/interface/Trip";

let tripsObj:Trip[]=[
	{
		transport_obj: [{ type: null }],
		carbon_g: null
	},
	{
		transport_obj: [{ type: null }],
		carbon_g: null
	}
];

const compare=()=>{
    console.log(tripsObj);
}

</script>

<style>
    button{
        @apply text-2xl p-4;
    }
</style>