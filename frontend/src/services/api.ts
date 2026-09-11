import axios from "axios";

const getBaseURL = () => {
  if (process.env.REACT_APP_API_ACADEMIA) return process.env.REACT_APP_API_ACADEMIA;
  if (process.env.REACT_APP_API_URL) return process.env.REACT_APP_API_URL;
  if (typeof window !== "undefined" && window.location?.origin && !window.location.origin.includes("localhost")) {
    return window.location.origin;
  }
  return "http://localhost:3001";
};

// Cria a instância do Axios com base na URL do .env ou origem atual
const api = axios.create({
  baseURL: getBaseURL(),
});

// Interceptor para anexar o token JWT em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (erro) => Promise.reject(erro)
);

export default api;
