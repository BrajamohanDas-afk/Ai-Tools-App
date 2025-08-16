const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://ai-tools-backend-m520.onrender.com'
    : 'http://localhost:3000'
};

export default API_CONFIG;