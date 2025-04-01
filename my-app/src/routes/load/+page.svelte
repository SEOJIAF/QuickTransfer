<script>
    import { goto } from "$app/navigation";
    import { db } from "$lib/firebase";
    import { doc, getDoc } from "firebase/firestore";

    let docId = "";
    let retrievedText = "";

    async function load() {
        if (!docId) {
            alert("Enter a text ID.");
            return;
        }

        const docRef = doc(db, "texts", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            retrievedText = docSnap.data().content;
        } else {
            alert("No text found.");
        }
    }
</script>

<main class="containerload">
    <h1>Load Text</h1>
    <input type="text" bind:value={docId} placeholder="Enter text ID">
    <button on:click={load}>Load</button>
    <button on:click={() => goto('/')}>Back</button>
    <p>Retrieved Text: <pre>{retrievedText}</pre>
</main>
