const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://aitools-api-fresh.vercel.app'
    : 'http://localhost:3000'
};

export default API_CONFIG;