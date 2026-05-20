# ✨ Lens AI — Intelligent Reading Copilot

Lens AI is a modern AI-powered Chrome Extension that helps users understand, summarize, and interact with webpage content directly inside a beautiful side panel interface.

Built with:

* Chrome Extension Manifest V3
* Vanilla JavaScript
* Gemini API
* Modern dark UI/UX

---

# 🚀 Features

## 🧠 AI Reading Modes

Lens AI supports multiple AI-powered reading actions:

* **Summarize** → concise summaries
* **Explain** → beginner-friendly explanations
* **Notes** → converts text into study notes
* **Key Points** → extracts important takeaways

---

## 🎨 Modern Side Panel UI

* Premium dark theme
* AI-inspired design
* Responsive side panel layout
* Smooth interactions
* Modern typography & animations

---

## ⚡ Real-Time AI Processing

* Uses Gemini API
* Instant AI responses
* Async architecture
* Non-blocking extension workflow

---

## 🔍 Webpage Text Selection

Select any text on a webpage and instantly process it with AI.

---

# 🏗️ Architecture Overview

```text
User Selects Text
        ↓
Content Script Extracts Selection
        ↓
Side Panel UI Sends Request
        ↓
Background Service Worker
        ↓
Gemini API
        ↓
AI Response Returned
        ↓
Rendered Inside Side Panel
```

---

# 🛠 Tech Stack

## Frontend

* HTML
* CSS
* Vanilla JavaScript

## Extension Architecture

* Chrome Extension Manifest V3
* Content Scripts
* Background Service Worker
* Chrome Side Panel API

## AI

* Google Gemini API

---

# 📂 Project Structure

```text
lens-ai/
│
├── manifest.json
├── background.js
├── content.js
│
├── sidepanel.html
├── sidepanel.css
├── sidepanel.js
│
├── popup.html
├── popup.js
│
└── icons/
```

---

# ✨ How It Works

## 1. Text Selection

Users select text from any webpage.

## 2. Content Script

The content script captures selected text using:

```js
window.getSelection().toString()
```

## 3. Messaging System

The side panel communicates with the background service worker using:

```js
chrome.runtime.sendMessage()
```

## 4. AI Processing

The background service worker sends prompts to Gemini API dynamically based on the selected AI mode.

## 5. AI Response

Gemini returns:

* summaries
* explanations
* notes
* key takeaways

which are rendered inside the side panel.

---

# 🧠 Dynamic AI Modes

Lens AI dynamically changes prompts depending on the selected mode.

### Example Prompts

## Summarize

```text
Summarize this text clearly and concisely.
```

## Explain

```text
Explain this text in very simple beginner-friendly words.
```

## Notes

```text
Convert this text into clean and organized study notes.
```

## Key Points

```text
Extract the key takeaways as bullet points.
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/lens-ai.git
```

---

## 2. Open Chrome Extensions

```text
chrome://extensions
```

---

## 3. Enable Developer Mode

Turn on:

```text
Developer Mode
```

---

## 4. Load Extension

Click:

```text
Load unpacked
```

and select the project folder.

---

# 🔑 Gemini API Setup

1. Create Gemini API key from Google AI Studio

2. Add your API key inside:

```js
background.js
```

```js
const apiKey = "YOUR_API_KEY";
```

---

# 🔮 Future Improvements

* Chat with webpage
* Full-page summarization
* Markdown rendering
* Conversation history
* Export notes
* Streaming AI responses
* Voice assistant integration
* Multi-language support

---

# 📚 Key Learnings

This project helped explore:

* Chrome Extension architecture
* Service workers
* Content scripts
* Async message passing
* API integrations
* AI-powered UX design
* Modern frontend UI design

---

# 🤝 Contributing

Contributions, suggestions, and feature ideas are welcome.

---

# 📄 License

MIT License

---

# 👨‍💻 Author

Ayush Varun
IIT Indore
