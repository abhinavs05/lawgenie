import React, { useEffect } from "react";
import { motion } from "framer-motion";

// Replace this with your Google OAuth client ID
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
// Replace this with your backend endpoint for uploads
const UPLOAD_ENDPOINT = "/api/upload";

function App() {
  useEffect(() => {
    // Load Google Identity script dynamically
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

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("document", file);

    try {
      const res = await fetch(UPLOAD_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert("File uploaded successfully: " + JSON.stringify(data));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Check console for details.");
    }
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
          Simplify complex contracts and agreements into clear, accessible
          guidance — empowering you to make informed decisions.
        </motion.p>
        <div className="mt-8 flex gap-4">
          <button className="bg-white text-blue-900 font-semibold hover:bg-gray-200 rounded-xl px-6 py-3">
            Get Started
          </button>
          <button className="border border-white text-white hover:bg-white hover:text-blue-900 rounded-xl px-6 py-3">
            Learn More
          </button>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 md:px-20 py-20 bg-gray-50">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl shadow-md p-6 text-center bg-white">
            <h4 className="text-xl font-semibold mb-2">Summarization</h4>
            <p className="text-gray-600">Get clear, concise summaries of complex contracts.</p>
          </div>
          <div className="rounded-2xl shadow-md p-6 text-center bg-white">
            <h4 className="text-xl font-semibold mb-2">Clause Explanation</h4>
            <p className="text-gray-600">Understand key terms and obligations in plain language.</p>
          </div>
          <div className="rounded-2xl shadow-md p-6 text-center bg-white">
            <h4 className="text-xl font-semibold mb-2">Interactive Q&A</h4>
            <p className="text-gray-600">Ask questions about your document and get instant answers.</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 md:px-20 py-20 bg-white text-center">
        <h3 className="text-3xl font-bold text-blue-900 mb-6">About LawGenie</h3>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          LawGenie leverages Google Cloud's Generative AI to bridge the gap
          between complex legal jargon and everyday understanding. Our mission
          is to make law accessible, transparent, and empowering for everyone.
        </p>
      </section>

      {/* Upload */}
      <section id="upload" className="px-6 md:px-20 py-20 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold text-blue-900 mb-6">Upload Your Document</h3>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleUpload}
          className="block mx-auto mt-4"
        />
        <p className="mt-4 text-gray-600">
          Upload your contract or agreement, and let AI simplify it for you.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-20 bg-blue-900 text-white text-center">
        <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
        <p className="max-w-xl mx-auto mb-8 text-lg opacity-90">
          Have questions or feedback? Reach out to the LawGenie team today.
        </p>
        <button className="bg-white text-blue-900 font-semibold hover:bg-gray-200 rounded-xl px-8 py-3 text-lg">
          Email Us
        </button>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-20 py-6 bg-gray-100 text-center text-gray-600">
        <p>© {new Date().getFullYear()} LawGenie. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;


