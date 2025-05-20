
<!-- svelte-ignore script_context_deprecated -->
<script module lang="ts">
	// Declare Ukraine as a global variable
	declare const Ukraine: any;
</script>

<script lang="ts">
	import '../app.css';
	import { goto } from '$app/navigation';
	let { children } = $props();

	import { onMount } from 'svelte';
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore event_directive_deprecated -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

{@render children()}
<title>QuickTransfer</title>
<link rel="icon" type="image/x-icon" href="/newlogo.ico">