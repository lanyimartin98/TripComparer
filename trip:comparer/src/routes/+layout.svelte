<script>
    import "../app.css";
    import Navbar from '../component/navbar.svelte'
</script>
  
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
<Navbar/>
<div class="p-4 bg-black text-white">
  <slot />
</div>