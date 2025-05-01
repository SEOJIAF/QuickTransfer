<script lang="ts">
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	// @ts-ignore
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	// @ts-ignore
	let copybutton = "Copy link";
	let previous_text = '';
	let docId = '';
	let status = '';
	// @ts-ignore
	let files: FileList | null = null;

	async function save() {
		if (!text) {
			alert('Please enter text.');
			docId = 'error, try again';
			return;
		}
		status = 'saving';

		if (previous_text == text) {
			status = 'you already saved this message with ' + docId;
			togglePopup2();
			return;
		}

		if (text.length >= 3000) {
			alert(`Input is too long: ${text.length} out of 3000.`);
			docId = 'error, try again';
			return;
		}

		docId = Math.floor(Math.random() * 10000 + 1000).toString();

		const docSnap = await getDoc(doc(db, 'texts', docId));
		if (docSnap.exists()) {
			docId = 'error, try again';
			return;
		}

		if (docId.length > 4) {
			return;
		}

		await setDoc(doc(db, 'texts', docId), {
			content: text,
			expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000)
		});
		previous_text = text;
		status = 'saved';
	}




	// :)
	let showPopup = false;
	let showPopup2 = false;
	let qrUrl = '';

	function togglePopup() {
		qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=https://dev-quicktransfer.vercel.app/load?Id=${docId}&size=15000x15000`;
		showPopup = !showPopup;
		showPopup2 = !showPopup2;
	}

	function togglePopup2() {
		showPopup2 = !showPopup2;
	}

	let isExpanded = false;
	let text = '';


	function copytext() {
		try {
			navigator.clipboard.writeText(`https://dev-quicktransfer.vercel.app/load?Id=${docId}`);
			copybutton = 'Link copied';
		} catch (error) {
			copybutton = 'error';
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
			⚡ QuickTransfer <span class="version">v1.2</span>
		</div>
	</div>
</header>

<main class="container">
	<h1>Save Text</h1>

	<!-- Always render the textarea, just toggle its size -->
	<p></p>

	<textarea bind:value={text} class:is-expanded={isExpanded} placeholder="Type something..."
	></textarea>
	<h3>{status}</h3>
	<div class="saveBtns">
		<button on:click={() => {save();togglePopup2();}}>Save</button>
		<button on:click={() => (isExpanded = !isExpanded)} class="copyBtn">{isExpanded ? 'Collapse' : 'Expand'}</button>
	</div>


	{#if showPopup}
		<div
			class="popup-overlay"
			role="button"
			tabindex="0"
			on:click={togglePopup}
			on:keydown={(e) => e.key === 'Enter' && togglePopup()}>
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
					<button class="copyBtn"  on:click={copytext}>{copybutton}</button>
				</div>
				<button on:click={togglePopup2}>Close</button>
			</div>
		</div>
	{/if}
</main>
