<script>
	import '../app.css';
	import Navbar from '../component/navbar.svelte';
	import Background from '$lib/assets/bg.jpg';
</script>

<head>
	<title>trip:comparer</title>
</head>

<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
/>
<div
	class="p-4 text-white bg-hero bg-no-repeat bg-cover bg-center bg-fixed min-h-screen"
	style="background-image: url('{Background}') ;"
>
	<Navbar />
	<slot />
</div>
