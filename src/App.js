import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ENDPOINTS } from './config'; // Correct for a named export


const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

function App() {
  const [fileInfo, setFileInfo] = useState(null); // stores uploaded file metadata
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [results, setResults] = useState({
    summary: "",
    clauses: "",
    answer: "",
    keyterms: [],
    issues: [],
    compare: "",
    comprehensive: "",
    translation: { translatedText: "" }, 
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => {
            console.log("Google Sign-in Response:", response);
            alert("Signed in successfully!");
          },
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin"),
          { theme: "outline", size: "large" }
        );
      }
    };
  }, []);

  // helper wrapper for API calls
  const callApi = async (name, endpoint, payload) => {
    setLoading(name);
    setError("");
    try {
      console.log(`🚀 Calling ${endpoint} with payload:`, payload);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // ✅ FIXED: Added backticks for template literal
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      console.log(`✅ ${name} response:`, data);
      return data;
    } catch (err) {
      console.error(`❌ ${name} error:`, err);
      // ✅ FIXED: Added backticks for template literal
      setError(`Failed to ${name}. Please try again.`);
      return null;
    } finally {
      setLoading(null);
    }
  };

  // Upload handler
const handleUpload = async (e) => {
  console.log("📂 handleUpload triggered");
  const file = e.target.files[0];
  console.log("📂 Selected file:", file);
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  setLoading("upload");
  setError("");
  try {
    console.log("🚀 Sending upload request to:", ENDPOINTS.upload);
    const res = await fetch(ENDPOINTS.upload, { method: "POST", body: formData });
    

    if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);
    const data = await res.json();

    console.log("✅ Upload response JSON:", data);

    // ✅ Only keep necessary file info
    const fileMeta = {
      file_id: data.file_id,
      name: data.originalname,
      size: data.size,
      type: data.mimetype,
    };

    setFileInfo(fileMeta);
    console.log("📂 fileInfo set as:", fileMeta);

    alert("File uploaded successfully ✅");
  } catch (err) {
    console.error("❌ Upload error:", err);
    setError("Upload failed. Please try again.");
  } finally {
    setLoading(null);
  }
};





  // Action handlers
 // Action handlers
const handleSummarize = async () => {
  const data = await callApi("summarize", ENDPOINTS.summarize, {  
    file_id: fileInfo.file_id,
    mimetype: fileInfo.type,
  });
  // Support both data.data.summary and data.summary for flexibility
  const summary =
    (data?.data?.summary ?? data?.summary ?? data?.data) || "";
  setResults((prev) => ({ ...prev, summary }));
};

const handleAsk = async () => {
  const question = prompt("Enter your question:");
  if (!question) return;
  const data = await callApi("ask", ENDPOINTS.ask, { 
    file_id: fileInfo.file_id,
    mimetype: fileInfo.type,
    question,
  });
  // Support both data.data.answer and data.answer
  const answer =
    data?.data?.answer ??
    data?.answer ??
    "";
  setResults((prev) => ({ ...prev, answer }));
};

const handleKeyterms = async () => {
  const data = await callApi("keyterms", ENDPOINTS.keyterms, { 
    file_id: fileInfo.file_id,
    mimetype: fileInfo.type,
  });
  // Support both data.data.keyterms, data.keyterms, or data.data (if array)
  const keyterms =
    data?.data?.keyterms ??
    data?.keyterms ??
    (Array.isArray(data?.data) ? data.data : []);
  setResults((prev) => ({ ...prev, keyterms }));
};

const handleIssues = async () => {
  const data = await callApi("issues", ENDPOINTS.issues, { 
    file_id: fileInfo.file_id,
    mimetype: fileInfo.type,   // ✅ added
  });
  if (data?.data) setResults((prev) => ({ ...prev, issues: data.data.issues || [] }));
};

const handleCompare = async () => {
  alert("Compare requires two uploaded documents. Please upload a second file and pass both file IDs to the backend.");
};

const handleClauses = async () => {
  const data = await callApi("clauses", ENDPOINTS.clauses, { 
    file_id: fileInfo.file_id,
    mimetype: fileInfo.type,   // ✅ added
  });
  if (data?.data) setResults((prev) => ({ ...prev, clauses: data.data.analysis || "" }));
};

const handleComprehensive = async () => {
  const data = await callApi("comprehensive", ENDPOINTS.comprehensive, { 
    file_id: fileInfo.file_id,
    mimetype: fileInfo.type,   // ✅ added
  });
  if (data?.data) setResults((prev) => ({ ...prev, comprehensive: data.data.analysis || "" }));
};

const handleTranslate = async () => {
  const lang = prompt("Enter language code (e.g., 'es' for Spanish):");
  if (!lang) return;

  const data = await callApi("translate", ENDPOINTS.translate, {
    file_id: fileInfo.file_id,
    mimetype: fileInfo.type,
    targetLanguage: lang,
  });

  // Support both data.data.translatedText and data.translatedText
  const translatedText =
    data?.data?.translatedText ??
    data?.translatedText ??
    "";
  setResults((prev) => ({
    ...prev,
    translation: {
      ...prev.translation,
      translatedText,
    },
  }));
};


  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-900">LawGenie</h1>
        <nav className="hidden md:flex gap-6 text-base">
          <a href="#services" className="hover:text-blue-700">Services</a>
          <a href="#about" className="hover:text-blue-700">About</a>
          <a href="#contact" className="hover:text-blue-700">Contact</a>
          <a href="#upload" className="hover:text-blue-700">Upload</a>
        </nav>
        <div id="google-signin"></div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-col items-center text-center px-6 py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold max-w-3xl"
        >
          Generative AI for Demystifying Legal Documents
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 max-w-xl text-lg opacity-90"
        >
          Simplify complex contracts and agreements into clear, accessible guidance — empowering you to make informed decisions.
        </motion.p>
      </section>

      {/* Upload & Actions */}
      <section id="upload" className="px-6 md:px-20 py-20 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold text-blue-900 mb-6">Upload Your Document</h3>
        <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleUpload} className="block mx-auto mt-4" />
        {loading === "upload" && <p className="mt-4 text-blue-600">Uploading...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {fileInfo && (
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <button disabled={loading} onClick={handleSummarize} className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50">
              {loading === "summarize" ? "Summarizing..." : "Summarize"}
            </button>
            <button disabled={loading} onClick={handleAsk} className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50">
              {loading === "ask" ? "Answering..." : "Ask Q&A"}
            </button>
            <button disabled={loading} onClick={handleKeyterms} className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50">
              {loading === "keyterms" ? "Extracting..." : "Key Terms"}
            </button>
            <button disabled={loading} onClick={handleIssues} className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50">
              {loading === "issues" ? "Analyzing..." : "Issues"}
            </button>
            <button disabled={loading} onClick={handleCompare} className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50">
              {loading === "compare" ? "Comparing..." : "Compare"}
            </button>
            <button disabled={loading} onClick={handleClauses} className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50">
              {loading === "clauses" ? "Explaining..." : "Clauses"}
            </button>
            <button disabled={loading} onClick={handleComprehensive} className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50">
              {loading === "comprehensive" ? "Analyzing..." : "Comprehensive"}
            </button>
            <button disabled={loading} onClick={handleTranslate} className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50">
              {loading === "translate" ? "Translating..." : "Translate"}
            </button>
          </div>
        )}
      </section>

      {/* Results */}
      <section className="px-6 md:px-20 py-10 space-y-6">
        {results.summary && (
          <div>
            <h4 className="font-bold">Summary</h4>
            <p>{results.summary}</p>
          </div>
        )}
        {results.keyterms.length > 0 && (
          <div>
            <h4 className="font-bold">Key Terms</h4>
            <ul className="list-disc pl-6">{results.keyterms.map((k, i) => <li key={i}>{k}</li>)}</ul>
          </div>
        )}
        {results.answer && <div><h4 className="font-bold">Answer</h4><p>{results.answer}</p></div>}
        {results.issues.length > 0 && (
          <div>
            <h4 className="font-bold">Issues</h4>
            <ul className="list-disc pl-6">{results.issues.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
          </div>
        )}
        {results.compare && <div><h4 className="font-bold">Comparison</h4><p>{results.compare}</p></div>}
        {results.clauses && <div><h4 className="font-bold">Clauses</h4><p>{results.clauses}</p></div>}
        {results.comprehensive && <div><h4 className="font-bold">Comprehensive Analysis</h4><p>{results.comprehensive}</p></div>}
        {results.translation && <div><h4 className="font-bold">Translation</h4><p>{results.translation.translatedText}</p></div>}
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-20 py-6 bg-gray-100 text-center text-gray-600">
        <p>© {new Date().getFullYear()} LawGenie. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;