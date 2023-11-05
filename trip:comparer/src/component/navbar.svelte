<nav
	class="flex flex-row justify-between m-2 p-2 shadow-md text-2xl backdrop-blur-md border-2 rounded-md"
>
<div>

<button class="lg:hidden"><i class="bi {icon}" on:click={openClosePanel}></i></button>
{#key animateHelper}
<div class="lg:flex lg:flex-row lg:items-center flex-col {panelOpen}" transition:screenSizeBasedSlide>
	<h1 class="font-bold p-1 lg:block hidden"><a href="/">trip:comparer</a></h1>
	<a class="lg:hidden text-base p-1" href="/" on:click={openClosePanel}>About</a>
	<a class="text-base p-1" href="/compare" on:click={openClosePanel}>Compare</a>
	<a class=" text-base p-1" href="/licensing" on:click={openClosePanel}>Licensing</a>
</div>
{/key}
</div>
	
	<div>
		<a href="https://github.com/lanyimartin98" target="_blank"><i class="bi bi-github" /></a>
		<a href="https://www.linkedin.com/in/martin-l%C3%A1nyi-0a5250233/" target="_blank"><i class="bi bi-linkedin" /></a>
	</div>
</nav>

<script>
	import {slide, scale} from 'svelte/transition';

	let isOpen=false;
	let panelOpen="hidden";
	let icon="bi-list";

	const screenSizeBasedSlide=(node)=>{
		return window.screen.width<1024 ? slide(node) : null;
	}

	let animateHelper = {}

	const openClosePanel=()=>{
		isOpen=!isOpen;
		animateHelper={};
	}

	$:if(isOpen){
		panelOpen="flex";
		icon="bi-arrow-left";
	}else{
		panelOpen="hidden";
		icon="bi-list";
	}
</script>

<style>
	a:hover {
		@apply text-white;
	}
</style>
