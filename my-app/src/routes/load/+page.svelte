<script lang="ts">
    import { goto } from "$app/navigation";
    import { db } from "$lib/firebase";
    import { doc, getDoc } from "firebase/firestore";
  
    let code: string[] = ["", "", "", ""];
    let inputs: HTMLInputElement[] = [];
  
    let docId = "";
    let retrievedText = "";
    let copybutton = "copy text";
  
    async function load() {
      docId = code.join("");
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
      try {
        navigator.clipboard.writeText(retrievedText);
        copybutton = "text copied";
      } catch (error) {
        copybutton = "error";
      }
    }
  
    function handleInput(event: Event, index: number) {
      const input = event.currentTarget as HTMLInputElement;
      const value = input.value;
  
      if (/^\d$/.test(value)) {
        code[index] = value;
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      } else {
        code[index] = "";
      }
    }
  
    function handleKeydown(event: KeyboardEvent, index: number) {
      if (event.key === "Backspace" && !code[index] && index > 0) {
        inputs[index - 1].focus();
      }
    }
  </script>
  
  <main class="container">
    <h1>Load Text</h1>
  
    <div class="code-input">
      {#each code as digit, index}
        <input
          inputmode="numeric"
          bind:this={inputs[index]}
          type="text"
          maxlength="1"
          bind:value={code[index]}
          on:input={(e) => handleInput(e, index)}
          on:keydown={(e) => handleKeydown(e, index)}
        />
      {/each}
    </div>
  
    <p></p>
    <button on:click={load}>Load</button>
    <button on:click={() => goto("/")}>Back</button>
    <p>Retrieved Text</p>
    <button on:click={copytext} class="copyBtn">{copybutton}</button>
    <pre>{retrievedText}</pre>
  </main>
  