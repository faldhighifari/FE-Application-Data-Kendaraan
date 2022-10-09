export const API = () => {
    const baseUrl =
      process.env.REACT_APP_SERVER_URL ||
      'http://localhost:8080/api';
  
    const executeAPI = async (endpoint, config) => {
      const response = await fetch(baseUrl + endpoint, config);
      const data = await response.json();
      return data;
    };
  
    return {
      get: executeAPI,
      post: executeAPI,
      patch: executeAPI,
      delete: executeAPI,
    };
  };

// import axios from 'axios';

// // Create base URL API
// export const API = axios.create({
//   baseURL: 'http://localhost:8080/api/',
// });