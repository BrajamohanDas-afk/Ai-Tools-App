const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://ai-tools-backend-xnst.onrender.com'  // You'll update this after backend deployment
    : 'http://localhost:3000'
};

export default API_CONFIG;