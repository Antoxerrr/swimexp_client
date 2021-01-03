import store from '@/store';

export const isAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    return next();
  }
  return next({ name: 'Auth' });
};

export const isNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    return next();
  }
  return next({ name: 'Home' });
};

export default { isAuthenticated, isNotAuthenticated };
