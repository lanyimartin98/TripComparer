<script lang="ts">
	export let left_carbon: string;
	export let right_carbon: string;
</script>

<article class="border-cyan-500 border-2 p-4 rounded-md flex flex-col text-lg m-4">
	<div class="flex justify-evenly">
		<div>
			Carbon footprint of the option A is: {left_carbon};
		</div>
		<div>
			Carbon footprint of the option B is: {right_carbon};
		</div>
	</div>
	<div class="flex justify-center">The winner is A!</div>
</article>
