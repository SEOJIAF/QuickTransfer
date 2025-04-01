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

        const Id = Math.floor(Math.random() * 10000 + 1000).toString();
        await setDoc(doc(db, "texts", Id), { content: text });
        docId = Id;
        alert("Text saved!");
    }
</script>

<main class="container">
    <h1>Save Text</h1>
    <textarea bind:value={text} placeholder="Enter your text here..."></textarea>
    <button on:click={save}>Save</button>
    <button on:click={() => goto('/')}>Back</button>
    <p>Saved ID: {docId}</p>
</main>
