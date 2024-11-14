import axios from 'axios';

// Definindo a URL base para as requisições
axios.defaults.baseURL = 'http://localhost:8000/api'; // Coloque o endereço da sua API

// Interceptor para adicionar o token ao cabeçalho das requisições
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Obtendo o token do localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Adiciona o token ao cabeçalho
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axios;
