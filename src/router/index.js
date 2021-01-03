import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '@/views/Register.vue';
import Home from '@/views/Home.vue';
import { isAuthenticated, isNotAuthenticated } from '@/router/guards';
import Auth from '../views/Auth.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isAuthenticated,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    beforeEnter: isNotAuthenticated,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: isNotAuthenticated,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
