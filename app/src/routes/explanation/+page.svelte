<script>
	import { goto } from '$app/navigation';
  let showDetails = false;
</script>


<header class="top-bar">
	<div class="arrow">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<svg
			class="goback"
			on:click={() => goto('/')}
			xmlns="http://www.w3.org/2000/svg"
			width="25"
			height="25"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"
			></polyline></svg
		>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="topbefore">
		<div class="logo" on:click={() => goto('/')}>
			⚡ QuickTransfer <span class="version">v1.0</span>
		</div>
	</div>
</header>


<main class="container">
<h1>Welcome to QuickShare</h1>
<p>It works, but sometimes it does not :(</p>

</main>



<style>
.container {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
  font-family: 'Kanit', sans-serif;
  padding: 2rem;
  background: #222;
  border-radius: 12px;
  color: #eee;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}

h1 {
  font-size: 2.5rem;
  color: #00cfe8;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
</style>
