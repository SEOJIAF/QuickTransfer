<script lang="ts">
	import '../app.css';
	import { goto } from "$app/navigation";
	let { children } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore event_directive_deprecated -->
<!-- svelte-ignore a11y_no_static_element_interactions -->


{@render children()}
<title>QuickTransfer</title>

<style>

</style>