<template>
  <v-form @submit.prevent="login">
    <v-text-field
      label="Имя пользователя"
      color="secondary"
      name="username"
      type="text"
      outlined
      v-model="$v.form.username.$model"
      :error-messages="usernameErrors"
    ></v-text-field>
    <v-text-field
      label="Пароль"
      color="secondary"
      name="password"
      type="password"
      outlined
      v-model="$v.form.password.$model"
      :error-messages="passwordErrors"
    ></v-text-field>
    <v-btn
      class="auth-button"
      color="primary"
      type="submit"
      depressed
      block
    >Войти</v-btn>
    <v-layout justify-center align-center class="form-links">
      <router-link to="/register">Регистрация</router-link>
      <v-spacer></v-spacer>
      <router-link to="/auth">Забыли пароль?</router-link>
    </v-layout>
  </v-form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { GET_ACCOUNT, LOGIN } from '@/store/actions.type';
import router from '@/router';

const FIELD_REQUIRED_MESSAGE = 'Это поле обязательно для заполнения';

export default {
  name: 'AuthForm',
  methods: {
    login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch(LOGIN, this.form)
          .then(() => {
            this.wrongCredentials = false;
            router.push({ name: 'Home' });
            this.$store.dispatch(GET_ACCOUNT);
          })
          .catch((status) => {
            if (status === 401) this.wrongCredentials = true;
          });
      }
    },
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.form.username.$dirty) return errors;
      if (!this.$v.form.username.required) errors.push(FIELD_REQUIRED_MESSAGE);
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      if (!this.$v.form.password.required) errors.push(FIELD_REQUIRED_MESSAGE);
      return errors;
    },
  },
  validations: {
    form: {
      username: { required },
      password: { required },
    },
  },
  data: () => ({
    form: {
      username: '',
      password: '',
    },
    wrongCredentials: false,
  }),
};
</script>

<style scoped>

</style>
