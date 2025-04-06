<script>
    import { goto } from "$app/navigation";
    import { db } from "$lib/firebase";
    import { doc, getDoc } from "firebase/firestore";

    let docId = "";
    let retrievedText = "";
    let copybutton = "copy text"

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

    function copytext() {
    // Select the text field

    // Copy the text inside the text field
    try {
        navigator.clipboard.writeText(retrievedText);
        copybutton = "text copied";
    } catch (error) {
        copybutton = "error";
    }
}
</script>

<main class="containerload">
    <h1>Load Text</h1>
    <input type="text" bind:value={docId} placeholder="Enter text ID">
    <button on:click={load}>Load</button>
    <button on:click={() => goto('/')}>Back</button>
    <p>Retrieved Text </p>
    <button on:click={copytext} class="copyBtn"> {copybutton}</button>
    <pre>{retrievedText}</pre>
</main>

