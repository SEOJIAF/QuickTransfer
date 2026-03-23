<script>
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { db } from '$lib/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';

	let docId = '';
	let retrievedText = '';
	let copybutton = 'Copy text';
	let loaded = false;
	let status = '';
	let statusTone = 'neutral';

	onMount(async () => {
		const $page = get(page);
		const code = $page.url.searchParams.get('Id')?.trim();

		if (code) {
			docId = code;
			await load();
		}
	});

	async function load() {
		const trimmedId = docId.trim();

		if (!trimmedId) {
			status = 'Enter a 4-digit ID.';
			statusTone = 'error';
			loaded = false;
			return;
		}
		if (!/^\d{4}$/.test(trimmedId)) {
			status = 'ID must be exactly 4 digits.';
			statusTone = 'error';
			loaded = false;
			return;
		}

		status = 'Loading...';
		statusTone = 'info';
		docId = trimmedId;

		const docRef = doc(db, 'texts', docId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			retrievedText = docSnap.data().content;
			loaded = true;
			status = 'Text loaded successfully.';
			statusTone = 'success';
		} else {
			retrievedText = '';
			loaded = false;
			status = 'We could not find that ID.';
			statusTone = 'error';
		}
	}

	async function copytext() {
		if (!retrievedText) {
			status = 'Load a text first to copy it.';
			statusTone = 'error';
			return;
		}
		try {
			await navigator.clipboard.writeText(retrievedText);
			copybutton = 'Text copied';
			status = 'Copied to clipboard.';
			statusTone = 'success';
		} catch {
			copybutton = 'Copy failed';
			status = 'Unable to copy the text. Please try again.';
			statusTone = 'error';
		}
	}
</script>

<header class="top-bar">
	<div class="arrow">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<svg
			class="goback"
			on:click={() => goto(resolve('/'))}
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
		<div class="logo" on:click={() => goto(resolve('/'))}>
			⚡ QuickTransfer <span class="version">v1.3</span>
		</div>
	</div>
</header>
<main class="container">
	<div class="page-card">
		<div class="page-header">
			<h1>Load Text</h1>
			<p class="subtitle">Enter the 4-digit ID to retrieve your text.</p>
		</div>
		<form class="formField" on:submit|preventDefault={load}>
			<input
				bind:value={docId}
				inputmode="numeric"
				autocomplete="off"
				maxlength="4"
				placeholder="1234"
				aria-label="4-digit text ID"
			/>
			<span>ID</span>
		</form>
		<div class="button-row">
			<button on:click={load} class="primary-button">Load</button>
		</div>
		{#if status}
			<p class={`status-message ${statusTone}`} aria-live="polite">{status}</p>
		{/if}

		{#if loaded}
			<hr />
			<p class="retriev">Retrieved text</p>
			<pre class="retrieved">{retrievedText}</pre>
			<button on:click={copytext} class="secondary-button">{copybutton}</button>
		{/if}
	</div>
</main>
