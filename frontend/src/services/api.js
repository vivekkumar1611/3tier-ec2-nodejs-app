import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getUsers = () => API.get('/users');
export const createUser = (data) => API.post('/users', data);
