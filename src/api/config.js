import axios from 'axios';

const BASE_URL = 'http://3.35.125.66:8000/api/v1';  // 배포용
// const BASE_URL = 'http://localhost:8000/api/v1'; // 개발용
export const baseInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL, // 기본 URL 설정
});
