const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ULTIMATE CORS FIX - SET HEADERS BEFORE ANYTHING ELSE
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

app.use(express.json({ limit: '50mb' }));

// Google AI Setup
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error('Error: GOOGLE_API_KEY is missing');
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(apiKey);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Tools Backend is running!', 
    timestamp: new Date().toISOString(),
    cors: 'enabled'
  });
});

// CORS test endpoint
app.get('/test-cors', (req, res) => {
  res.json({ 
    message: 'CORS is working!', 
    origin: req.headers.origin,
    userAgent: req.headers['user-agent']
  });
});

// Text Summarization
app.post('/summarize', async (req, res) => {
  console.log('Received summarize request:', req.body);
  console.log('Request origin:', req.headers.origin);
  try {
    const inputText = req.body.text;
    if (!inputText || inputText.trim() === '') {
      return res.status(400).json({ error: 'No text provided.' });
    }
    
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

// Image Captioning
app.post('/caption', async (req, res) => {
  try {
    const { image, mimeType } = req.body;
    if (!image || !mimeType) {
        return res.status(400).json({ error: 'No image data provided.' });
    }

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

// Language Translation
app.post('/translate', async (req, res) => {
  try {
    const { text, language } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Translate the following text to ${language}: \n\n${text}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translation = response.text();

    res.json({ translation });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Failed to translate text.' });
  }
});

// Code Explanation
app.post('/explain-code', async (req, res) => {
  try {
    const { code } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Explain this code in a simple way, line by line: \n\n\`\`\`\n${code}\n\`\`\``;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const explanation = response.text();

    res.json({ explanation });
  } catch (error) {
    console.error('Code explanation error:', error);
    res.status(500).json({ error: 'Failed to explain code.' });
  }
});

// Visual Q&A
app.post('/visual-qa', async (req, res) => {
  try {
    const { image, mimeType, question } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const imagePart = { inlineData: { data: image, mimeType } };
    const promptParts = [question, imagePart];

    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const answer = response.text();
    
    res.json({ answer });
  } catch (error) {
    console.error('Visual Q&A error:', error);
    res.status(500).json({ error: 'Failed to get answer.' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});