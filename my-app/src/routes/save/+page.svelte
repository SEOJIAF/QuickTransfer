<script>
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { doc, setDoc } from 'firebase/firestore';

	let isActive = false;
	let docId = '';

	async function save() {
		if (!text) {
			alert('Please enter text.');
			return;
		}

		if (text.length >= 3000) {
			alert(`Input is too long: ${text.length} out of 3000.`);
			return;
		}

		docId = Math.floor(Math.random() * 10000 + 1000).toString();

		await setDoc(doc(db, 'texts', docId), {
			content: text,
			expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000)
		});

		alert('Text saved!');
	}

	let isExpanded = false;
	let text = '';
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
	<h1>Save Text</h1>

	<button on:click={save}>Save</button>
	<!-- Always render the textarea, just toggle its size -->

	<textarea bind:value={text} class:is-expanded={isExpanded} placeholder="Type something..."
	></textarea>

	<button on:click={() => (isExpanded = !isExpanded)} class="copyBtn">
		{isExpanded ? 'Collapse' : 'Expand'}
	</button>

	{#if docId.length > 0}
		<h1>{docId}</h1>
	{/if}
</main>
