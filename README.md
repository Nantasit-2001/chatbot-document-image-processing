# Chatbot Document & Image Processing App

A React + Vite web application that allows users to upload images or PDF files and chat with an AI (Gemini 1.5 Flash) to extract and process information from those documents.

Live demo: [https://chatbot-document-image-processing.vercel.app/](https://chatbot-document-image-processing.vercel.app/)

---

## 🚀 Overview

This application allows users to upload a document (image or PDF), and then ask questions or request a summary based on the content.  
The AI used is **Gemini 1.5 Flash** from Google Generative AI, integrated using the `@google/generative-ai` SDK.

Users can also customize AI responses through toggle switches:

- 🌐 Choose response language (e.g., Thai)
- 📄 Choose between concise summary or detailed explanation
- 🎓 Choose tone: formal or informal

---

## 🛠️ Technologies Used

- [React.js](https://reactjs.org/) with [Vite](https://vitejs.dev/) for fast development
- CSS for styling
- [Google Generative AI](https://ai.google.dev/) (Gemini 1.5 Flash)
- Vanilla state management (`useState`, `useEffect`)

---

## 📸 Key Features

- 📤 Upload images or PDF files
- 💬 Chat with AI to ask about file content
- 📝 Generate summaries (short or detailed)
- 🌍 Switch response language (Thai/English)
- 🎓 Toggle formal tone


---


## 🧠 AI Integration: Technical Approach

This app uses **Gemini 1.5 Flash**, a high-speed, multi-modal large language model (LLM) from Google, integrated via the SDK:

```ts
const genAi = new GoogleGenerativeAI(import.meta.env.VITE_REACT_APP_GEMINI_API_KEY)
const model = genAi.getGenerativeModel({ model: 'models/gemini-1.5-flash' })
```


## 🤖 Types of AI Integration Approaches

There are several common approaches to integrating AI (especially large language models like Gemini or GPT) into applications:

### 1. **Zero-shot / Few-shot Prompting**
Send a question directly to the model, optionally with 1–2 examples. Useful for general tasks like writing, translation, summarization.

### 2. **Contextual Prompting (In-Context Learning)**
Injects custom content (e.g. user-provided text, documents, or images) into the prompt. The model answers *only* based on the given context.  
✅ *This is the approach used in this project.*

### 3. **Retrieval-Augmented Generation (RAG)**
Uses a vector database (like Pinecone or Weaviate) to search for relevant documents, then sends that context to the AI. Great for large knowledge bases.

### 4. **Fine-tuning**
Training a custom version of the model using specific data. Expensive and inflexible, but highly accurate for narrow domains.

### 5. **Tool-augmented Agents**
LLMs that can call external tools, APIs, or do calculations based on reasoning. Often used with frameworks like LangChain or AutoGPT.

---

## 🫀 AI Usage Approach (Used in This Project)

This app uses **Contextual Prompting with Multimodal Input**, where uploaded documents (PDFs or images) are passed directly to the Gemini 1.5 Flash model using `inlineData`.

Instead of relying on general knowledge or a pre-built database, the AI processes **only** the content the user provides, allowing for dynamic and relevant responses.

### ✅ Why this approach?

- No backend or vector database required
- Works entirely on the frontend using the `@google/generative-ai` SDK
- Gemini 1.5 Flash supports file-based inputs and responds quickly
- Keeps the app lightweight and scalable

This method is effective for user-driven, file-specific interactions without infrastructure overhead.

---