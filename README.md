# QuickTransfer 🚀

**QuickTransfer** is a fast, file-sharing web app built with **Svelte**, powered by **Firebase**, and hosted on **Vercel**. 


**no accounts, no clutter. Just paste, and send text.**

---


## ⚡ Features

- ☁️ **Firebase-Powered** – Fast uploads with scalable, secure cloud storage.
- 🌐 **Fully Online** – Works anywhere with internet access.
- 🕶️ ** Dark Mode** – Because light mode is terrible.
- 🧹 **Auto-Cleanup** – Expiring links to keep storage clean.

---

## 🛠 Tech Stack

| Layer        | Tech              |
|--------------|-------------------|
| Frontend     | [Svelte](https://svelte.dev/)         |
| Hosting      | [Vercel](https://vercel.com/)         |
| Backend/DB   | [Firebase](https://firebase.google.com/) (Storage, Firestore,) |
| Styling      | [CSS](https://justpaste.it/gs38k) |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SEOJIAF/QuickTransfer
cd QuickTransfer
```
2. Install Dependencies
```
npm install
```
3. Set Up Firebase

  -  Create a Firebase project at console.firebase.google.com
  -  Enable Firebase Storage and Firestore
  - Grab your config keys and paste them into your environment file
 ```javascript   
// Example: src/lib/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "your-key",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "xxxxxxx",
  appId: "xxxxxxx"
};

export const app = initializeApp(firebaseConfig);
```
4. Run the App
```bash
npm run dev
```
Open http://localhost:5173 and start uploading text-based files.

📁 Project Structure
---
```
QuickTransfer/
├── src/
│   ├── lib/firebase.js       # Firebase config
│   ├── routes/+page.svelte   # Main upload/share page
│   ├── routes/save/+page.svelte # Download page
│   └── ...
├── static/                   # Public assets
├── .env                      # (if using env vars)
├── README.md
└── vercel.json               # Vercel config
```
📦 Deployment
---
This project is ready to deploy on Vercel.

Just push your repo to GitHub and import it in Vercel. Set Firebase config via environment variables or inline if you're going simple.

🛣 Roadmap
---


- Multi-file or zipped uploads

- Password-protected links


📬 Contact
---
Have questions ?

🌍 Site: quicktransfer.vercel.app

🐛 Report Issues: GitHub Issues
