const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://backend-brajamohandas-afks-projects.vercel.app'
    : 'http://localhost:3000'
};

export default API_CONFIG;