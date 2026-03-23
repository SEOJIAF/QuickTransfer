<script>
	import { goto } from '$app/navigation';
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
			⚡ QuickTransfer <span class="version">v1.3</span>
		</div>
	</div>
</header>

<main class="container">
	<div class="page-card">
		<div class="page-header">
			<h1>How QuickTransfer works</h1>
			<p class="subtitle">Move text between devices in three simple steps.</p>
		</div>
		<div class="info-grid">
			<div class="info-item">
				<h3>1. Save</h3>
				<p>Paste up to 3,000 characters and create a temporary entry.</p>
			</div>
			<div class="info-item">
				<h3>2. Share</h3>
				<p>Use the 4-digit ID, link, or QR code to open it elsewhere.</p>
			</div>
			<div class="info-item">
				<h3>3. Load</h3>
				<p>Enter the ID on any device to retrieve your text instantly.</p>
			</div>
		</div>
		<p class="info-note">Entries expire automatically after 24 hours for peace of mind.</p>
	</div>
</main>
