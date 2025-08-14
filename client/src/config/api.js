const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://backend-lu0w6v7sn-brajamohandas-afks-projects.vercel.app'
    : 'http://localhost:3000'
};

export default API_CONFIG;