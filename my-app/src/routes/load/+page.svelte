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
    let qrUrl = "";
  
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


    

  let showPopup = false;

  function togglePopup() {
    qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${get(page).url}&size=15000x15000`;
    showPopup = !showPopup;
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
    
    <!-- <button on:click={makeQr} class="copyBtn">Qr code</button> -->
    <pre class="retrieved">{retrievedText}</pre>

    
    <button on:click={togglePopup}>Show Popup</button>

    {#if showPopup}
      <div class="popup-overlay" role="button" tabindex="0" on:click={togglePopup} on:keydown={(e) => e.key === 'Enter' && togglePopup()}>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_interactive_supports_focus -->
        <div class="popup-content" role="dialog" aria-modal="true" on:click|stopPropagation>
          <h2>Hello!</h2>
          <p>This is a popup window.</p>
          <img src={qrUrl} alt="s"class="qr">
          <p></p>
          <button class="close-button" on:click={togglePopup}>Close</button>
        </div>
      </div>
    {/if}

  </main>
  