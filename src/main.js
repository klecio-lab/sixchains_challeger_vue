import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App); // Cria a instância da aplicação Vue

axios.defaults.baseURL = 'http://localhost:8000/api'; // Define a URL base da API

app.config.globalProperties.$axios = axios; // Faz o axios disponível globalmente
app.use(router);
app.mount('#app'); // Monta a aplicação Vue na div com id 'app'

