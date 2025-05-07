<script>
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { collection, getDocs, query, where, deleteDoc } from 'firebase/firestore';

	function isMobile() {
		return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
	}

	let is_on_phone = false;

	if (isMobile()) {
		is_on_phone = true;
	} else {
		is_on_phone = false;
	}

	async function checkDocs() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('visited', 'true');
		}
		const colRef = collection(db, 'texts');
		const querySnapshot = await getDocs(colRef);

		const now = new Date();

		querySnapshot.forEach(async (docSnap) => {
			const data = docSnap.data();
			if (data.expires_at) {
				const expiresAt = data.expires_at.toDate();

				if (now > expiresAt) {
					console.log(`Document ${docSnap.id} expired.`);
					await deleteDoc(docSnap.ref);
				} else {
					console.log(`Document ${docSnap.id} is still valid.`);
				}
			}
		});
	}

	checkDocs();
</script>

<main class="container" id="home-page">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<header class="top-bar">
		<div class="nav-div">
			<nav class="nav-links">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore a11y_missing_attribute -->
				<a on:click={() => goto('/explanation')} class="downtextmobile">How it works</a>
				<a href="https://github.com/SEOJIAF/QuickTransfer">GitHub</a>
				<a href="https://war.ukraine.ua/">Support ukraine 🇺🇦</a>
			</nav>
		</div>
		<div class="logo" on:click={() => goto('/')}>
			⚡ QuickTransfer <span class="version">v1.2</span>
		</div>
	</header>

	<main class="hero">
		<div class="hero-text">
			<h1>Share text across devices</h1>
			<p>Paste and transfer text instantly—no apps, no accounts</p>
			<div class="btns">
				<button on:click={() => goto('/save')} class="startbutton">Save Text</button>
				<button on:click={() => goto('/load')} class="startbutton">Load Text</button>
			</div>
		</div>
		{#if is_on_phone == false}
			<div class="hero-image">
				<img src="\logonew.png" alt="network graphic" />
			</div>
		{/if}
	</main>
	{#if is_on_phone == false}
		<div class="feet">
			<p class="downtext">Secure. Encrypted. Private.</p>
			<a href="https://github.com/SEOJIAF/QuickSync/issues" target="_blank" class="downtext"
				>Feedback</a
			>
		</div>
		<footer class="footer-wave"></footer>
	{/if}

	{#if is_on_phone == true}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_missing_attribute -->
		<div class="feetmobile">
			<a href="https://github.com/SEOJIAF/QuickSync/issues" target="_blank" class="downtextmobile"
				>Feedback</a
			>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_missing_attribute -->
			<a on:click={() => goto('/explanation')} class="downtextmobile">How it works</a>
			<a href="https://github.com/SEOJIAF/QuickTransfer" class="downtextmobile">GitHub</a>
		</div>
		<footer class="footer-wave"></footer>
	{/if}
</main>
