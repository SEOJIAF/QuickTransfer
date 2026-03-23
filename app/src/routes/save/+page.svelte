<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { db } from '$lib/firebase';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	let copybutton = 'Copy link';
	let previous_text = '';
	let docId = '';
	let status = '';

	const getShareUrl = () => {
		const origin =
			typeof window !== 'undefined' && window.location?.origin
				? window.location.origin
				: 'https://quicktransfer.vercel.app';
		return `${origin}/load?Id=${docId}`;
	};

	const generateId = () => {
		if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
			const buffer = new Uint32Array(1);
			crypto.getRandomValues(buffer);
			const normalized = buffer[0] / 0x100000000;
			return (Math.floor(normalized * 9000) + 1000).toString();
		}
		return Math.floor(Math.random() * 9000 + 1000).toString();
	};

	async function save() {
		const trimmedText = text.trim();
		showPopup = false;
		showPopup2 = false;
		copybutton = 'Copy link';

		if (!trimmedText) {
			status = 'Add some text to save.';
			return;
		}

		if (trimmedText.length > 3000) {
			status = `Keep it under 3,000 characters. (${trimmedText.length}/3000)`;
			return;
		}

		if (previous_text === trimmedText && docId) {
			status = `Already saved. Your ID is ${docId}.`;
			showPopup2 = true;
			return;
		}

		status = 'Generating a secure ID...';

		let candidateId = '';
		for (let attempt = 0; attempt < 5; attempt += 1) {
			const nextId = generateId();
			const docSnap = await getDoc(doc(db, 'texts', nextId));
			if (!docSnap.exists()) {
				candidateId = nextId;
				break;
			}
		}

		if (!candidateId) {
			status = 'Could not generate a new ID. Please try again.';
			return;
		}

		docId = candidateId;

		status = 'Saving...';

		await setDoc(doc(db, 'texts', docId), {
			content: trimmedText,
			expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000)
		});
		previous_text = trimmedText;
		status = 'Saved! Share your ID, link, or QR code.';
		showPopup2 = true;
	}

	// :)
	let showPopup = false;
	let showPopup2 = false;
	let qrUrl = '';
	let qrError = false;

	function togglePopup() {
		if (!docId) {
			status = 'Save text first to create a QR code.';
			return;
		}
		qrError = false;
		qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
			getShareUrl()
		)}&size=384x384`;
		showPopup = !showPopup;
		showPopup2 = false;
	}

	function togglePopup2() {
		showPopup2 = !showPopup2;
	}

	let isExpanded = false;
	let text = '';

	async function copytext() {
		if (!docId) {
			status = 'Save text first to generate a link.';
			return;
		}
		try {
			await navigator.clipboard.writeText(getShareUrl());
			copybutton = 'Link copied';
			status = 'Link copied to your clipboard.';
		} catch {
			copybutton = 'Copy failed';
			status = 'Unable to copy the link. Please try again.';
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
	<h1>Save Text</h1>

	<p></p>

	<textarea
		bind:value={text}
		class:is-expanded={isExpanded}
		placeholder="Type something..."
		maxlength="3000"
		aria-label="Text to save"
	></textarea>
	<h3>{status}</h3>
	<div class="saveBtns">
		<button on:click={save}>Save</button>
		<button on:click={() => (isExpanded = !isExpanded)} class="copyBtn"
			>{isExpanded ? 'Collapse' : 'Expand'}</button
		>
	</div>

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
				{#if !qrError}
					<img
						src={qrUrl}
						alt="QR code for your saved text"
						class="qr"
						loading="lazy"
						referrerpolicy="no-referrer"
						on:error={() => {
							qrError = true;
							status = 'QR code could not load. Use the link instead.';
						}}
					/>
				{/if}
				{#if qrError}
					<p role="alert">QR code unavailable. Use the share link instead.</p>
				{/if}
				<p></p>
				<button on:click={togglePopup}>Close</button>
			</div>
		</div>
	{/if}
	{#if showPopup2}
		<div
			class="popup-overlay"
			role="button"
			tabindex="0"
			on:click={togglePopup2}
			on:keydown={(e) => e.key === 'Enter' && togglePopup2()}
		>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_interactive_supports_focus -->
			<div class="popup-content" role="dialog" aria-modal="true" on:click|stopPropagation>
				<div class="appears">
					<h1>Your shareable ID is:</h1>
					<h1 class="ID">{docId}</h1>
				</div>
				<p>or</p>

				<div>
					<button on:click={togglePopup} class="copyBtn">Qr code</button>
					<button class="copyBtn" on:click={copytext}>{copybutton}</button>
				</div>
				<button on:click={togglePopup2}>Close</button>
			</div>
		</div>
	{/if}
</main>
