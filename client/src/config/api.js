const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://backend-agewilv5m-brajamohandas-afks-projects.vercel.app'
    : 'http://localhost:3000'
};

export default API_CONFIG;