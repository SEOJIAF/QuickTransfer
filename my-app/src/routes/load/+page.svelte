<script>
    import { goto } from "$app/navigation";
    import { db } from "$lib/firebase";
    import { doc, getDoc } from "firebase/firestore";
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { page } from "$app/stores";
  
    let docId = "";
    let retrievedText = "";
    let copybutton = "copy text";
  
    onMount(async () => {
      const $page = get(page); // use get() to read the store synchronously
      const code = $page.url.searchParams.get('Id');
  
      if (code) {
        const docRef = doc(db, "texts", code);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          retrievedText = docSnap.data().content;
          docId = code; // Optional: fill in the input with the loaded ID
        } else {
          alert("No text found.");
        }
      } else {
        console.log("No 'Id' in URL");
      }
    });
  
    async function load() {
      if (!docId) {
        alert("Enter a text ID.");
        return;
      }
  
      const docRef = doc(db, "texts", docId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        retrievedText = docSnap.data().content;
        goto(`?Id=${docId}`, { replaceState: true });
      } else {
        alert("No text found.");
      }
    }
  
    function copytext() {
      try {
        navigator.clipboard.writeText(retrievedText);
        copybutton = "text copied";
      } catch (error) {
        copybutton = "error";
      }
    }
  </script>
  
  





  <main class="container">
    <h1>Load Text</h1>
    <form class="formField">
      <input bind:value={docId}/>
      <span>ID</span>
    </form>
    
    <p></p>
    <button on:click={load}>Load</button>
    <button on:click={() => goto("/")}>Back</button>
    <p>Retrieved Text</p>
    <button on:click={copytext} class="copyBtn">{copybutton}</button>
    <pre class="retrieved">{retrievedText}</pre>
  </main>
  