import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://kim-sun-woo.com", // 기본 URL 설정
  timeout: 10000, // 요청 타임아웃(ms)
});

export default axiosInstance;
