import { ENDPOINTS } from "./config";

// Generic POST request helper
async function postRequest(url, body, isFormData = false) {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
      headers: isFormData ? {} : { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}

// API wrappers
export const uploadDocument = (file) => {
  const formData = new FormData();
  formData.append("document", file);
  return postRequest(ENDPOINTS.upload, formData, true);
};

export const summarizeDoc = (text) =>
  postRequest(ENDPOINTS.summarize, { text });

export const askQuestion = (text, question) =>
  postRequest(ENDPOINTS.ask, { text, question });

export const extractKeyTerms = (text) =>
  postRequest(ENDPOINTS.keyterms, { text });

export const findIssues = (text) =>
  postRequest(ENDPOINTS.issues, { text });

export const compareDocs = (doc1, doc2) =>
  postRequest(ENDPOINTS.compare, { doc1, doc2 });

export const explainClauses = (text) =>
  postRequest(ENDPOINTS.clauses, { text });

export const comprehensiveAnalysis = (text) =>
  postRequest(ENDPOINTS.comprehensive, { text });

export const translateDoc = (text, lang) =>
  postRequest(ENDPOINTS.translate, { text, lang });

export const uploadToStorage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return postRequest(ENDPOINTS.storage, formData, true);
};
