const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies (with a limit for base64 images) and serve static files
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// --- Google Generative AI Setup ---
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error('Error: GOOGLE_API_KEY is missing in .env file');
  process.exit(1); // Exit if the API key is not found
}
const genAI = new GoogleGenerativeAI(apiKey);

// --- API Endpoints ---

// Endpoint for Text Summarization
app.post('/summarize', async (req, res) => {
  try {
    const inputText = req.body.text;
    if (!inputText || inputText.trim() === '') {
      return res.status(400).json({ error: 'No text provided.' });
    }
    
    // UPDATED: Changed model from 'gemini-pro' to 'gemini-1.5-flash'
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Summarize the following text:\n\n${inputText}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    res.json({ summary: summary });
  } catch (error) {
    console.error('Summarization error:', error);
    res.status(500).json({ error: 'Failed to summarize text.' });
  }
});

// Endpoint for Image Captioning
app.post('/caption', async (req, res) => {
  try {
    const { image, mimeType } = req.body;
    if (!image || !mimeType) {
        return res.status(400).json({ error: 'No image data provided.' });
    }

    // UPDATED: Changed model from 'gemini-pro-vision' to 'gemini-1.5-flash'
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = "Describe this image in detail.";
    
    const imagePart = {
      inlineData: {
        data: image,
        mimeType: mimeType,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const caption = response.text();
    
    res.json({ caption: caption });
  } catch (error) {
    console.error('Captioning error:', error);
    res.status(500).json({ error: 'Failed to generate caption.' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});