import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:6001/'
});

export default api;