<script>
	import '../app.css';
	import Navbar from '../component/navbar.svelte';
	import Background from '$lib/assets/bg.webp';
	import 'bootstrap-icons/font/bootstrap-icons.css';

	export const prerender = true;
	export const ssr = false;
</script>

<head>
	<title>trip:comparer</title>
</head>

<div
	class="p-4 text-white bg-hero bg-no-repeat bg-cover bg-center bg-fixed min-h-screen"
	style="background-image: url('{Background}') ;"
>
	<Navbar />
	<slot />
</div>
