<script>
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';

	let isActive = false;
	let docId = '';
	let retrievedText = '';
	let copybutton = 'copy text';
	let status = '';

	async function save() {
		if (!text) {
			alert('Please enter text.');
			return;
		}
		status = 'saving';

		if (text.length >= 3000) {
			alert(`Input is too long: ${text.length} out of 3000.`);
			return;
		}

		docId = Math.floor(Math.random() * 10000 + 1000).toString();

		await setDoc(doc(db, 'texts', docId), {
			content: text,
			expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000)
		});

		const docRef = doc(db, 'texts', docId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			goto(`?Id=${docId}`, { replaceState: true });
		} else {
			alert('No text found.');
		}

		status = 'saved';
	}

	let showPopup = false;
	let qrUrl = '';

	function togglePopup() {
		qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=https://dev-quicktransfer.vercel.app/load?Id=${docId}&size=15000x15000`;
		showPopup = !showPopup;
	}

	let isExpanded = false;
	let text = '';

	onMount(async () => {
		const $page = get(page); // use get() to read the store synchronously
		const code = $page.url.searchParams.get('Id');

		if (code) {
			const docRef = doc(db, 'texts', code);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				retrievedText = docSnap.data().content;
				docId = code; // Optional: fill in the input with the loaded ID
			} else {
				alert('No text found.');
			}
		} else {
			console.log("No 'Id' in URL");
		}
	});
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
	<h3>{status}</h3>

	<button on:click={() => (isExpanded = !isExpanded)} class="copyBtn">
		{isExpanded ? 'Collapse' : 'Expand'}
	</button>
	<button on:click={togglePopup} class="copyBtn">Qr code</button>

	{#if docId.length > 0}
		<h1>{docId}</h1>
	{/if}

	{#if showPopup}
		<div
			class="popup-overlay"
			role="button"
			tabindex="0"
			on:click={togglePopup}
			on:keydown={(e) => e.key === 'Enter' && togglePopup()}
		>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_interactive_supports_focus -->
			<div class="popup-content" role="dialog" aria-modal="true" on:click|stopPropagation>
				<h2 class="poptext2">Qr code</h2>
				<p class="poptext">Scan to share.</p>
				<img src={qrUrl} alt="s" class="qr" />
				<p></p>
				<button on:click={togglePopup}>Close</button>
			</div>
		</div>
	{/if}
</main>
