<script>
    import { goto } from "$app/navigation";
    import { db } from "$lib/firebase"; 
    import { collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
    async function checkDocs() {


        if (typeof window !== "undefined" && localStorage.getItem("visited") === "true") {
            return;
        }
        if (typeof window !== "undefined") {
            localStorage.setItem("visited", "true");
        }
        const colRef = collection(db, "texts");
        const querySnapshot = await getDocs(colRef);

        const now = new Date();

        querySnapshot.forEach(async (docSnap) => {
            const data = docSnap.data();
            if (data.expires_at) {
                const expiresAt = data.expires_at.toDate();
                
                if (now > expiresAt) {
                    console.log(`Document ${docSnap.id} expired.`);
                    await deleteDoc(docSnap.ref);
                } else {
                    console.log(`Document ${docSnap.id} is still valid.`);
                }
            }
        });
    }

    checkDocs();

</script>

<main class="container"id="home-page">
  <header class="top-bar">
    <div class="logo">
      ⚡ QuickTransfer <span class="version">v1.0</span>
    </div>
    <nav class="nav-links">
      <a href="https://example.com/sponsor">How it works</a>
      <a href="https://example.com/sponsor">GitHub</a>
      <a href="https://example.com/sponsor" target="_blank" rel="noopener noreferrer">Sponsor</a>
    </nav>
  </header>

  <main class="hero">
    <div class="hero-text">
      <h1>Share text across devices</h1>
      <p>Using just a web browser to any device on the Internet!</p>
      <div class="btns">
        <button on:click={() => goto('/save')}>Go to Save Page</button>
        <button on:click={() => goto('/load')}>Go to Load Page</button>
      </div>
    </div>
    <div class="hero-image">
      <img src="https://i.imgur.com/h6PMVEx.png" alt="network graphic" />
    </div>
  </main>

  <footer class="footer-wave"></footer>
</main>