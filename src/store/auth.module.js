import { LOGIN, LOGOUT, REGISTER } from '@/store/actions.type';
import Vue from 'vue';
import {
  PURGE_AUTH, SET_AUTH, SET_ERROR,
  // START_LOADING, STOP_LOADING,
} from '@/store/mutations.type';
import {
  destroySession, getToken, saveSession, setHeader,
} from '@/common/session';
import { unpackForRequest } from '@/common/register';

const state = {
  user: {},
  isAuthenticated: !!getToken(),
};

const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  user(state) {
    return state.user;
  },
};

const actions = {
  [LOGIN](context, credentials) {
    // context.commit(START_LOADING);
    return new Promise((resolve, reject) => {
      Vue.axios.post('users/auth/base/login/', credentials)
        .then((response) => {
          context.commit(SET_AUTH, response.data);
          resolve(response);
          // context.commit(STOP_LOADING);
        })
        .catch((error) => {
          context.commit(SET_ERROR, error.response);
          reject(error.response.status);
          // context.commit(STOP_LOADING);
        });
    });
  },
  [REGISTER](context, data) {
    // context.commit(START_LOADING);
    const request = unpackForRequest(data);
    return new Promise((resolve, reject) => {
      Vue.axios.post('users/auth/base/register/', request)
        .then(() => {
          resolve();
          // context.commit(STOP_LOADING);
        })
        .catch((error) => {
          reject(error);
          // context.commit(STOP_LOADING);
        });
    });
  },
  [LOGOUT](context) {
    return new Promise((resolve, reject) => {
      Vue.axios.post('users/auth/base/logout/')
        .then(() => {
          resolve();
          context.commit(PURGE_AUTH);
        })
        .catch((error) => {
          context.commit(PURGE_AUTH);
          reject(error);
        });
    });
  },
};

const mutations = {
  [SET_AUTH](state, data) {
    state.isAuthenticated = true;
    state.wrongCredentials = false;
    state.user = data.user;
    saveSession(data);
    setHeader();
  },
  [SET_ERROR](state, response) {
    if (response.status === 401) {
      state.isAuthenticated = false;
      state.user = {};
    }
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.wrongCredentials = false;
    destroySession();
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
