<script>
	import { page } from '$app/stores';
	import { fly, fade } from 'svelte/transition';
  </script>
  
  <style>
  main {
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #181818;
	color: #e0e0e0;
	font-family: 'Kanit', sans-serif;
	text-align: center;
	padding: 2rem;
	overflow: hidden;
  }
  
  .error-code {
	font-size: 8rem;
	font-weight: 700;
	color: #00ffff;
	text-shadow: 0px 3px 20px #0090a0;
	animation: bounce 2s infinite;
	letter-spacing: 1rem;
  }
  
  .error-message {
	margin-top: 1rem;
	font-size: 1.5rem;
	color: #b1b1b1;
	max-width: 600px;
  }
  
  .home-link {
	margin-top: 3rem;
	background-color: #00cfe8;
	color: #181818;
	padding: 0.8rem 2rem;
	border-radius: 8px;
	text-decoration: none;
	font-weight: 600;
	transition: background-color 0.3s ease;
  }
  
  .home-link:hover {
	background-color: #00bcd4;
  }
  
  @keyframes bounce {
	0%, 100% {
	  transform: translateY(0);
	}
	50% {
	  transform: translateY(-20px);
	}
  }
  </style>
  
  <main>
	<div class="error-code" in:fade>
		{#if $page.status}
			<span>{ $page.status }</span>
		{/if}
	</div>
	<div class="error-message" in:fly={{ y: 20, duration: 500 }}>
	  { $page.error?.message || 'Oops! Something went wrong.' }
	</div>
	<a class="home-link" href="/">← Go back home</a>
  </main>
  