<script>
    import { goto } from "$app/navigation";
</script>

<main class="container">
    <h1>Welcome</h1>
    <button on:click={() => goto('/save')}>Go to Save Page</button>
    <button on:click={() => goto('/load')}>Go to Load Page</button>
</main>
