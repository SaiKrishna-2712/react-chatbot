import axios from 'axios';

// Create an Axios instance with a base URL
const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000',  // Base URL of your Flask backend
});

export default instance;
