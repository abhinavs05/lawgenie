// src/config.js

// This is the base URL for your backend server.
// Note: ngrok URLs are temporary. You will need to replace this with your permanent backend URL when you deploy your application.
const BASE_URL = "https://pollenlike-tenorless-clemmie.ngrok-free.app/api";

// Using "export const" makes this a "named export".
// This allows you to import it with curly braces {} in other files.
export const ENDPOINTS = {
  upload: `${BASE_URL}/upload`,          // Endpoint for file uploads
  summarize: `${BASE_URL}/analyze`,      // Endpoint for summarization
  ask: `${BASE_URL}/question`,           // Endpoint for Q&A
  keyterms: `${BASE_URL}/keyterms`,      // Endpoint for extracting key terms
  issues: `${BASE_URL}/issues`,          // Endpoint for identifying issues
  compare: `${BASE_URL}/compare`,        // Endpoint for comparing documents
  clauses: `${BASE_URL}/clauses`,        // Endpoint for explaining clauses
  comprehensive: `${BASE_URL}/comprehensive`, // Endpoint for comprehensive analysis
  translate: `${BASE_URL}/translate/document`, // Endpoint for translation
};

// Note: We do not need "export default" at the end when using "export const" above.