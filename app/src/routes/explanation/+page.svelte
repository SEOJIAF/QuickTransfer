<script>
    let showDetails = false;
  </script>
  
  <main class="container">
    <h1>Welcome to QuickShare</h1>
    <p>A simple way to transfer text and images between your computer and phone!</p>
  
    <button on:click={() => showDetails = !showDetails}>
      {showDetails ? 'Hide Details' : 'Learn How It Works'}
    </button>
  
    {#if showDetails}
      <div class="info">
        <h2>How It Works:</h2>
        <ul>
          <li>1. Open QuickShare on your computer and phone.</li>
          <li>2. Enter the same code on both devices to link them.</li>
          <li>3. Send text or upload images easily between devices.</li>
          <li>4. All transfers are private and fast!</li>
        </ul>
      </div>
    {/if}
  </main>
  
  <style>
    .container {
      max-width: 600px;
      margin: 2rem auto;
      text-align: center;
      font-family: 'Kanit', sans-serif;
      padding: 2rem;
      background: #222;
      border-radius: 12px;
      color: #eee;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
  
    h1 {
      font-size: 2.5rem;
      color: #00cfe8;
      margin-bottom: 1rem;
    }
  
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
  
    button {
      background: #00cfe8;
      color: #111;
      border: none;
      padding: 0.8rem 1.5rem;
      font-size: 1.1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s;
    }
  
    button:hover {
      background: #0097a7;
    }
  
    .info {
      margin-top: 2rem;
      text-align: left;
    }
  
    ul {
      list-style: none;
      padding: 0;
    }
  
    li {
      margin: 1rem 0;
      font-size: 1.1rem;
    }
  </style>
  