import axios from 'axios';

const BASE_URL = 'http://207.180.223.113:8975/api/v1/';

export default axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
