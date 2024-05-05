import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://52.79.73.254:80/", // 기본 URL 설정
  timeout: 10000, // 요청 타임아웃(ms)
});

export default axiosInstance;
