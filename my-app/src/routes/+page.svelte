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

<main class="container">
    <h1>Welcome</h1>
    <button on:click={() => goto('/save')}>Go to Save Page</button>
    <button on:click={() => goto('/load')}>Go to Load Page</button>
    <h1>wow</h1>
    <h2>smaller wow</h2>
</main>
