import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';
// const BASE_URL = '/api/v1';
export const baseInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL, // 기본 URL 설정
});
