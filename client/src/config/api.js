const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.up.railway.app'  // You'll update this after backend deployment
    : 'http://localhost:3000'
};

export default API_CONFIG;