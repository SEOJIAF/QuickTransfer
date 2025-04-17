<script>
    import { goto } from "$app/navigation";
    import { db } from "$lib/firebase";
    import { doc, setDoc } from "firebase/firestore";

    let text = "";
    let docId = "";

    async function save() {
        
        if (!text) {
            alert("Please enter text.");
            return;
        }

        if (text.length >= 3000) {
            alert(`Input is too long: ${text.length} out of 3000.`);
            return;
        }

        // ✅ Generate docId before using it
        docId = Math.floor(Math.random() * 10000 + 1000).toString();
        
        await setDoc(doc(db, "texts", docId), {
            content: text,
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // ✅ 24-hour expiration
        });

        alert("Text saved!");
    }
</script>

<main class="container">
    <h1>Save Text</h1>
    <button class="fullBtn">see full</button>
    <textarea bind:value={text} placeholder="Enter your text here..."></textarea>
    <button on:click={save}>Save</button>
    {#if docId.length>0}
    <h1>{docId}</h1>
    {/if}
</main>

