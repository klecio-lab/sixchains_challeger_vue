import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import LogoutPage from '../components/LogoutPage.vue';

// Verificando se o usuário está autenticado
function isAuthenticated() {
  return localStorage.getItem('token') !== null;
}

const routes = [
  {
    path: '/', component: HomePage, beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        return next('/login'); // Redireciona para o login se não autenticado
      }
      next();
    }
  },
  {
    path: '/login', component: LoginPage, beforeEnter: (to, from, next) => {
      console.log(isAuthenticated());
      if (isAuthenticated()) {
        return next('/'); // Redireciona para o home se autenticado
      }
      next();
    }
  },
  {
    path: '/register', component: RegisterPage, beforeEnter: (to, from, next) => {
      console.log(isAuthenticated());
      if (isAuthenticated()) {
        return next('/'); // Redireciona para o home se autenticado
      }
      next();
    }
  },
  {
    path: '/logout', component: LogoutPage, beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        return next('/login'); // Redireciona para o login se não autenticado
      }
      next();
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
