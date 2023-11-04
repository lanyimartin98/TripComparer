<nav
	class="flex flex-row justify-between m-2 p-2 shadow-md text-2xl backdrop-blur-md border-2 rounded-md {panelSize}"
>
<div>
<button class="lg:hidden"><i class="bi bi-list" on:click={openPanel}></i></button>
<div class="lg:flex lg:flex-row lg:items-center flex-col {panelOpen}">
	<h1 class="font-bold p-1 lg:block hidden"><a href="/">trip:comparer</a></h1>
	<a class="lg:hidden text-base p-1" href="/">About</a>
	<a class="text-base p-1" href="/compare">Compare</a>
	<a class=" text-base p-1" href="/licensing">Licensing</a>
</div>
</div>
	
	<div>
		<a href="https://github.com/lanyimartin98" target="_blank"><i class="bi bi-github" /></a>
		<a href="https://www.linkedin.com/in/martin-l%C3%A1nyi-0a5250233/" target="_blank"><i class="bi bi-linkedin" /></a>
	</div>
</nav>

<script>
	let open=false;

	let panelOpen="hidden";
	let panelSize="h-auto";

	const openPanel=()=>{
		open=!open;
	}

	$:if(open){
		panelOpen="flex";
		panelSize="h-30";
	}else{
		panelOpen="hidden";
		panelSize="h-auto";
	}
</script>

<style>
	a:hover {
		@apply text-white;
	}
</style>
