<script lang="ts">
	import '../app.css';
	import { goto } from "$app/navigation";
	let { children } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore event_directive_deprecated -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<header class="top-bar">
    <div class="logo"  on:click={() => goto('/')}>
      ⚡ QuickTransfer <span class="version">v1.0</span>
    </div>
    <div class="nav-div">
      <nav class="nav-links">
        <a href="https://example.com/sponsor">How it works</a>
        <a href="https://example.com/sponsor">GitHub</a>
      </nav>
    </div>
  </header>


{@render children()}
<title>QuickTransfer</title>

<style>
	.logo:hover{
		cursor: pointer;
	}
</style>