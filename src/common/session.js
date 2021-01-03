import Vue from 'vue';

const SESSION_KEY = 'savedsession';

export const saveSession = (data) => {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(data));
};

export const getToken = () => {
  const session = JSON.parse(window.localStorage.getItem(SESSION_KEY));
  if (session) {
    return session.token;
  }
  return null;
};

export const destroySession = () => {
  window.localStorage.removeItem(SESSION_KEY);
  Vue.axios.defaults.headers.common.Authorization = '';
};

export const setHeader = () => {
  Vue.axios.defaults.headers.common.Authorization = `Token ${getToken()}`;
};

export default {
  saveToken: saveSession, getToken, destroyToken: destroySession, setHeader,
};
