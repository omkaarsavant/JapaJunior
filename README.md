# Japanese Word Recognizer

A modern, high-performance Japanese handwriting recognition application powered by AI. Draw Hiragana, Katakana, or Kanji, and get instant multi-character recognition, word segmentation, and English translations.

## ✨ Features

- **Advanced Handwriting Recognition**: Support for Hiragana, Katakana, and complex Kanji.
- **Pixel-Perfect Canvas**: High-DPI (Retina) support with automatic resizing for precise, sharp drawing at any resolution.
- **Multi-Character Mode**: Draw entire words or sentences with automatic character boundary detection.
- **AI-Powered Translation**: Context-aware translations and Romaji generation using Gemini or OpenAI.
- **Premium UI**: Sleek, responsive design with smooth animations and a focus on user experience.

## 🚀 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Radix UI.
- **Backend**: Node.js, Express, tRPC.
- **AI Integration**: Vercel AI SDK (Gemini/OpenAI).

## 🛠️ Local Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/omkaarsavant/JapaJunior.git
    cd JapaJunior
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Setup Environment Variables**:
    Create a `.env` file in the root directory:
    ```env
    # AI SDK
    GOOGLE_GENERATIVE_AI_API_KEY="your-key"
    # OR
    OPENAI_API_KEY="your-key"
    ```

4.  **Start Development Server**:
    ```bash
    pnpm dev
    ```

## 🌐 Vercel Deployment

This project is optimized for deployment on Vercel as a lightweight, serverless application.

1.  **Push your code** to a GitHub repository.
2.  **Import the project** in the Vercel Dashboard.
3.  **Configure Environment Variables**:
    - `GOOGLE_GENERATIVE_AI_API_KEY` or `OPENAI_API_KEY`.
4.  **Deploy!** The project includes `vercel.json` for automatic routing and build configuration.

## 📄 License

MIT
