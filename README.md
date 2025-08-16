# 🚀 AI Tools App

> A comprehensive suite of AI-powered tools built with React and Google's Generative AI

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://ai-tools-frontend-iota.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend-API-blue?style=for-the-badge)](https://ai-tools-backend-m520.onrender.com)

## ✨ Features

This AI Tools App provides five powerful AI-driven features:

### 📝 **Text Summarizer**
- Summarizes long texts into concise, readable summaries
- Perfect for articles, documents, and research papers

### 🖼️ **Image Captioner** 
- Generates detailed descriptions of uploaded images
- Supports multiple image formats (JPG, PNG, WebP, etc.)

### 🌍 **Language Translator**
- Translates text between multiple languages
- Powered by Google's advanced translation capabilities

### 💻 **Code Explainer**
- Explains code snippets in simple, understandable terms
- Supports multiple programming languages
- Line-by-line code analysis

### 🔍 **Visual Q&A**
- Ask questions about uploaded images
- Get intelligent answers based on image content
- Interactive image analysis

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Icons** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Google Generative AI** - AI/ML capabilities
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Deployment
- **Frontend**: Deployed on [Vercel](https://vercel.com)
- **Backend**: Deployed on [Render](https://render.com)

## 🌐 Live Demo

**Frontend**: [https://ai-tools-frontend-iota.vercel.app](https://ai-tools-frontend-iota.vercel.app)

**Backend API**: [https://ai-tools-backend-m520.onrender.com](https://ai-tools-backend-m520.onrender.com)

### 🚀 Deployment Status
- ✅ **Frontend**: Successfully deployed on Vercel
- ✅ **Backend**: Successfully deployed on Render
- ✅ **API Integration**: All endpoints working correctly
- ✅ **CORS**: Properly configured for cross-origin requests

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Google AI Studio API Key** ([Get one here](https://makersuite.google.com/app/apikey))

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/BrajamohanDas-afk/Ai-Tools-App.git
cd Ai-Tools-App
```

### 2. Set Up the Backend
```bash
cd Backend
npm install

# Create .env file
echo "GOOGLE_API_KEY=your_google_api_key_here" > .env

# Start the server
npm start
# or
node server.js
```

### 3. Set Up the Frontend
```bash
cd ../client
npm install

# Start the development server
npm run dev
```

### 4. Open Your Browser
Visit `http://localhost:5173` to see the app in action!

## 📁 Project Structure

```
Ai-Tools-App/
├── Backend/
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── client/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Summarizer.jsx
│   │   │   ├── ImageCaptioner.jsx
│   │   │   ├── Translator.jsx
│   │   │   ├── CodeExplainer.jsx
│   │   │   ├── VisualQA.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── config/
│   │   │   └── api.js      # API configuration
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── README.md
```

## 🔧 Environment Variables

Create a `.env` file in the `Backend` directory:

```env
GOOGLE_API_KEY=your_google_generative_ai_api_key
PORT=3000
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/summarize` | Summarize text |
| POST | `/caption` | Generate image captions |
| POST | `/translate` | Translate text |
| POST | `/explain-code` | Explain code snippets |
| POST | `/visual-qa` | Visual question answering |


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Brajamohan Das**
- GitHub: [@BrajamohanDas-afk](https://github.com/BrajamohanDas-afk)
- Email: brajamohandas0390@gmail.com

## 🙏 Acknowledgments

- [Google AI](https://ai.google/) for the Generative AI API
- [React](https://reactjs.org/) for the amazing frontend framework
- [Vercel](https://vercel.com/) for frontend hosting
- [Render](https://render.com/) for backend hosting

---

⭐ If you found this project helpful, please give it a star!