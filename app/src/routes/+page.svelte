<script>
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { collection, deleteDoc, getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';

	function isMobile() {
		return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
	}

	let is_on_phone = false;

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

	onMount(() => {
		is_on_phone = isMobile();
		checkDocs();
	});
</script>

<main class="container" id="home-page">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<header class="top-bar">
		<div class="nav-div">
			<nav class="nav-links">
				<a href="/explanation" class="downtextmobile">How it works</a>
				<a href="https://github.com/SEOJIAF/QuickTransfer" target="_blank" rel="noreferrer">
					GitHub
				</a>
				<a href="https://war.ukraine.ua/" target="_blank" rel="noreferrer"> Support Ukraine 🇺🇦 </a>
			</nav>
		</div>
		<div class="logo" on:click={() => goto('/')}>
			⚡ QuickTransfer <span class="version">v1.3</span>
		</div>
	</header>

	<main class="hero">
		<div class="hero-text">
			<h1>Share text across devices</h1>
			<p>Paste and transfer text instantly — no apps, no accounts.</p>
			<div class="btns">
				<button on:click={() => goto('/save')} class="startbutton primary-button">Save Text</button>
				<button on:click={() => goto('/load')} class="startbutton secondary-button"
					>Load Text</button
				>
			</div>
			<ul class="feature-list">
				<li><span>1.</span> Save up to 3,000 characters for 24 hours.</li>
				<li><span>2.</span> Get a 4-digit ID, link, or QR code.</li>
				<li><span>3.</span> Load it on any device in seconds.</li>
			</ul>
		</div>
		{#if is_on_phone == false}
			<div class="hero-image">
				<img src="/logonew.png" alt="QuickTransfer network graphic" />
			</div>
		{/if}
	</main>
	{#if is_on_phone == false}
		<div class="feet">
			<p class="downtext">Secure. Encrypted. Private.</p>
			<a
				href="https://github.com/SEOJIAF/QuickSync/issues"
				target="_blank"
				rel="noreferrer"
				class="downtext">Feedback</a
			>
		</div>
		<footer class="footer-wave"></footer>
	{/if}

	{#if is_on_phone == true}
		<div class="feetmobile">
			<a
				href="https://github.com/SEOJIAF/QuickSync/issues"
				target="_blank"
				rel="noreferrer"
				class="downtextmobile">Feedback</a
			>
			<a href="/explanation" class="downtextmobile">How it works</a>
			<a
				href="https://github.com/SEOJIAF/QuickTransfer"
				target="_blank"
				rel="noreferrer"
				class="downtextmobile"
			>
				GitHub
			</a>
		</div>
		<footer class="footer-wave"></footer>
	{/if}
</main>
