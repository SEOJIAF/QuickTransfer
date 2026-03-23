<script lang="ts">
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	// @ts-ignore
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	// @ts-ignore
	let copybutton = 'Copy link';
	let previous_text = '';
	let docId = '';
	let status = '';
	let statusTone = 'neutral';

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
			return ((buffer[0] % 9000) + 1000).toString();
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
			statusTone = 'error';
			return;
		}

		if (trimmedText.length > 3000) {
			status = `Keep it under 3,000 characters. (${trimmedText.length}/3000)`;
			statusTone = 'error';
			return;
		}

		if (previous_text === trimmedText && docId) {
			status = `Already saved. Your ID is ${docId}.`;
			statusTone = 'info';
			showPopup2 = true;
			return;
		}

		status = 'Saving...';
		statusTone = 'info';

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
			statusTone = 'error';
			return;
		}

		docId = candidateId;

		await setDoc(doc(db, 'texts', docId), {
			content: trimmedText,
			expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000)
		});
		previous_text = trimmedText;
		status = 'Saved! Share your ID, link, or QR code.';
		statusTone = 'success';
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
			statusTone = 'error';
			return;
		}
		qrError = false;
		qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
			getShareUrl()
		)}&size=512x512`;
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
			statusTone = 'error';
			return;
		}
		try {
			await navigator.clipboard.writeText(getShareUrl());
			copybutton = 'Link copied';
			status = 'Link copied to your clipboard.';
			statusTone = 'success';
		} catch (error) {
			copybutton = 'Copy failed';
			status = 'Unable to copy the link. Please try again.';
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
			<h1>Save Text</h1>
			<p class="subtitle">Paste your snippet below. It expires in 24 hours.</p>
		</div>
		<textarea
			bind:value={text}
			class:is-expanded={isExpanded}
			placeholder="Type or paste something…"
			maxlength="3000"
			aria-label="Text to save"
		></textarea>
		<div class="helper-row">
			<span class="helper-text">{text.length}/3000 characters</span>
			<span class="helper-text">4-digit ID • 24-hour expiry</span>
		</div>
		{#if status}
			<p class={`status-message ${statusTone}`} aria-live="polite">{status}</p>
		{/if}
		<div class="button-row">
			<button on:click={save} class="primary-button">Save</button>
			<button on:click={() => (isExpanded = !isExpanded)} class="secondary-button">
				{isExpanded ? 'Collapse' : 'Expand'}
			</button>
		</div>
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
				<h2 class="poptext2">QR code</h2>
				<p class="poptext">Scan to open the link.</p>
				{#if !qrError}
					<img
						src={qrUrl}
						alt="QR code for your saved text"
						class="qr"
						on:error={() => {
							qrError = true;
							status = 'QR code could not load. Use the link instead.';
							statusTone = 'error';
						}}
					/>
				{/if}
				{#if qrError}
					<p class="status-message error">QR code unavailable. Use the share link instead.</p>
				{/if}
				<p></p>
				<button on:click={togglePopup} class="secondary-button">Close</button>
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

				<div class="popup-actions">
					<button on:click={togglePopup} class="secondary-button">QR code</button>
					<button class="secondary-button" on:click={copytext}>{copybutton}</button>
				</div>
				<button on:click={togglePopup2} class="primary-button">Close</button>
			</div>
		</div>
	{/if}
</main>
