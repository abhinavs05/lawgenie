# LawGenie Frontend

LawGenie frontend provides a user interface to upload, analyze, and translate legal documents. It is built using **React.js**, and communicates with the backend via **Ngrok** or a deployed API.

---
Deployment link :- https://lawgenie-frontend.web.app/

## 🚀 Features

* File upload (PDF/DOCX)
* Document summarization
* Key terms & issues extraction
* Contract comparison
* Clause identification
* Translation of documents
* Simple and modern UI

---

## 📦 Prerequisites

* [Node.js](https://nodejs.org/) v18+
* A running LawGenie Backend (local or via Ngrok)
* Backend API URL set in `config.js`

---

## 🔧 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/lawgenie-frontend.git
cd lawgenie-frontend
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Running the Frontend

Start the frontend development server:

```bash
npm start
```

By default, the app runs at:

```
http://localhost:3000
```

---

## 🌐 Connecting Frontend to Backend via Ngrok

1. Start your backend:

   ```bash
   npm run dev
   ```

2. Expose backend with Ngrok:

   ```bash
   ngrok http 5000
   ```

3. Copy the ngrok HTTPS URL (e.g. `https://pollenlike-tenorless-clemmie.ngrok-free.app`).

4. Update **frontend/src/config.js**:

   ```js
   const BASE_URL = "https://pollenlike-tenorless-clemmie.ngrok-free.app/api";

   const ENDPOINTS = {
     upload: `${BASE_URL}/upload`,
     summarize: `${BASE_URL}/summarize`,
     ask: `${BASE_URL}/ask`,
     keyterms: `${BASE_URL}/keyterms`,
     issues: `${BASE_URL}/issues`,
     compare: `${BASE_URL}/compare`,
     clauses: `${BASE_URL}/clauses`,
     comprehensive: `${BASE_URL}/comprehensive`,
     translate: `${BASE_URL}/translate/document`,
   };

   export default ENDPOINTS;
   ```

5. Restart the frontend:

   ```bash
   npm start
   ```

---

## 🌍 Deployment via Firebase Hosting

1. Install Firebase CLI:

   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:

   ```bash
   firebase login
   ```

3. Initialize Firebase Hosting inside the project:

   ```bash
   firebase init hosting
   ```

   * Choose your Firebase project.
   * Set `build` (or `dist`) as the public directory (depending on your build setup).
   * Configure as a single-page app: **Yes**.

4. Build the React app:

   ```bash
   npm run build
   ```

5. Deploy to Firebase:

   ```bash
   firebase deploy
   ```

Your frontend will now be available at:

```
https://your-project-id.web.app
```

---

## 📁 Project Structure

```
src/
│── components/        # UI Components
│── pages/             # Page-level components
│── config.js          # Backend API endpoints
│── App.js             # Main React component
│── index.js           # Entry point
public/                # Static assets
```

---

## ⚠️ Notes

* If ngrok URL changes, update `config.js` each time (unless you use a reserved domain).
* Ensure backend is running before frontend API calls.
* You can deploy this frontend to **Firebase Hosting.

---

## 🔮 Future Enhancements

* Voice-controlled commands for document interactions.
* Real-time translation with speech-to-text integration.
* AI-powered contract drafting assistance.
* Multi-user collaboration and annotation.
* Enhanced dashboard for document management.

---

## 📜 License

MIT License © 2025 LawGenie
