<template>
  <v-stepper v-model="stage">
    <v-stepper-header>
      <v-stepper-step
        step="1"
        :complete="stage > 1"
      />

      <v-divider></v-divider>

      <v-stepper-step
        step="2"
        :complete="stage > 2"
      />

      <v-divider></v-divider>

      <v-stepper-step
        step="3"
      />
    </v-stepper-header>
    <v-stepper-items>
      <v-form @submit.prevent="register">
        <v-stepper-content step="1">
          <div class="form-items-wrapper">
            <v-text-field
              label="Имя пользователя"
              color="secondary"
              type="text"
              name="username"
              v-model="$v.form.firstStage.username.$model"
              :error-messages="usernameErrors"
              outlined
            ></v-text-field>
          </div>
          <v-btn
            color="primary"
            @click="toSecondStage"
            depressed
            block
          >
            Продолжить
          </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div class="form-items-wrapper">
            <v-text-field
              label="Пароль"
              color="secondary"
              type="password"
              name="password"
              v-model="$v.form.secondStage.password.$model"
              :error-messages="passwordErrors"
              hint="Минимум 8 символов"
              outlined
            ></v-text-field>
            <v-text-field
              label="Подтверждение пароля"
              color="secondary"
              type="password"
              name="password_confirmation"
              v-model="$v.form.secondStage.password_confirmation.$model"
              :error-messages="passwordConfirmationErrors"
              outlined
            ></v-text-field>
          </div>
          <v-btn
            color="primary"
            @click="toThirdStage"
            depressed
            block
          >
            Продолжить
          </v-btn>
          <v-btn
            text
            block
            @click="stage = 1"
          >
            Назад
          </v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <div class="form-items-wrapper">
            <v-text-field
              label="Email"
              color="secondary"
              type="email"
              name="email"
              v-model="$v.form.thirdStage.email.$model"
              :error-messages="emailErrors"
              outlined
            ></v-text-field>
            <v-text-field
              label="Имя"
              color="secondary"
              type="text"
              name="first_name"
              v-model="$v.form.thirdStage.first_name.$model"
              :error-messages="firstNameErrors"
              outlined
            ></v-text-field>
            <v-text-field
              label="Фамилия"
              color="secondary"
              type="text"
              name="last_name"
              v-model="$v.form.thirdStage.last_name.$model"
              :error-messages="lastNameErrors"
              outlined
            ></v-text-field>
          </div>
          <v-btn
            color="primary"
            type="sumbit"
            depressed
            block
          >
            Зарегистрироваться
          </v-btn>
          <v-btn
            text
            block
            @click="stage = 2"
          >
            Назад
          </v-btn>
        </v-stepper-content>
        <v-layout justify-center align-center class="form-links">
          <router-link to="/auth">Авторизация</router-link>
        </v-layout>
      </v-form>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import {
  required, email, minLength, sameAs,
} from 'vuelidate/lib/validators';
import router from '@/router';
import { REGISTER } from '@/store/actions.type';

const FIELD_REQUIRED_MESSAGE = 'Это поле обязательно для заполнения';
const passwordMinLength = 8;
const usernameMinLength = 6;
const allowedSymbols = (value) => !value.match(/[^A-zА-я]/g);

export default {
  name: 'RegisterForm',
  methods: {
    pushToAuth() {
      router.push({ name: 'Auth' });
    },
    cleanResponseErrors(key) {
      if (key) {
        this.responseErrors[key] = [];
      } else {
        this.responseErrors = {};
      }
    },
    register() {
      this.cleanResponseErrors();
      this.$v.$touch();
      console.log(this.$store);
      if (!this.$v.$invalid) {
        this.$store.dispatch(REGISTER, this.form)
          .then(() => {
            this.pushToAuth();
          })
          .catch((error) => {
            if (error.response.status === 400) {
              this.responseErrors = error.response.data;
              this.$v.$touch();
            }
          });
      }
    },
    toSecondStage() {
      this.$v.form.firstStage.$touch();
      if (!this.$v.form.firstStage.$invalid) {
        this.stage = 2;
      }
    },
    toThirdStage() {
      this.$v.form.secondStage.$touch();
      if (!this.$v.form.secondStage.$invalid) {
        this.stage = 3;
      }
    },
  },
  data: () => ({
    stage: 1,
    form: {
      firstStage: {
        username: '',
      },
      secondStage: {
        password: '',
        password_confirmation: '',
      },
      thirdStage: {
        email: '',
        first_name: '',
        last_name: '',
      },
    },
    responseErrors: {},
    responseNonFieldErrors: {},
  }),
  validations: {
    form: {
      firstStage: {
        username: {
          required,
          minLength: minLength(usernameMinLength),
        },
      },
      secondStage: {
        password: {
          required,
          minLength: minLength(passwordMinLength),
        },
        password_confirmation: {
          required,
          // eslint-disable-next-line func-names
          sameAs: sameAs(function () { return this.$v.form.secondStage.password.$model; }),
        },
      },
      thirdStage: {
        email: { required, email },
        first_name: {
          allowedSymbols,
        },
        last_name: {
          allowedSymbols,
        },
      },
    },
  },
  computed: {
    usernameErrors() {
      let errors = [];
      if (!this.$v.form.firstStage.username.$dirty) return errors;
      if (!this.$v.form.firstStage.username.required) errors.push(FIELD_REQUIRED_MESSAGE);
      if (!this.$v.form.firstStage.username.minLength) {
        errors.push(`Минимальная длина для имени пользователя - ${usernameMinLength} символов`);
      }
      if (this.responseErrors.username) {
        errors = errors.concat(this.responseErrors.username);
        this.cleanResponseErrors('username');
      }
      return errors;
    },
    emailErrors() {
      let errors = [];
      if (!this.$v.form.thirdStage.email.$dirty) return errors;
      if (!this.$v.form.thirdStage.email.required) errors.push(FIELD_REQUIRED_MESSAGE);
      else if (!this.$v.form.thirdStage.email.email) errors.push('Введите корректный email');
      if (this.responseErrors.email) {
        errors = errors.concat(this.responseErrors.email);
        this.cleanResponseErrors('email');
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.secondStage.password.$dirty) return errors;
      if (!this.$v.form.secondStage.password.required) errors.push(FIELD_REQUIRED_MESSAGE);
      else if (!this.$v.form.secondStage.password.minLength) {
        errors.push(`Минимальная длина пароля - ${passwordMinLength} символов`);
      }
      return errors;
    },
    passwordConfirmationErrors() {
      const errors = [];
      if (!this.$v.form.secondStage.password_confirmation.$dirty) return errors;
      if (!this.$v.form.secondStage.password_confirmation.required) {
        errors.push(FIELD_REQUIRED_MESSAGE);
      }
      if (!this.$v.form.secondStage.password_confirmation.sameAs) errors.push('Пароли не совпадают');
      return errors;
    },
    firstNameErrors() {
      let errors = [];
      if (!this.$v.form.thirdStage.first_name.$dirty) return errors;
      if (!this.$v.form.thirdStage.first_name.allowedSymbols) {
        errors.push('Введены недопустимые символы');
      }
      if (this.responseErrors.first_name) {
        errors = errors.concat(this.responseErrors.first_name);
        this.cleanResponseErrors('first_name');
      }
      return errors;
    },
    lastNameErrors() {
      let errors = [];
      if (!this.$v.form.thirdStage.last_name.$dirty) return errors;
      if (!this.$v.form.thirdStage.last_name.allowedSymbols) {
        errors.push('Введены недопустимые символы');
      }
      if (this.responseErrors.last_name) {
        errors = errors.concat(this.responseErrors.last_name);
        this.cleanResponseErrors('last_name');
      }
      return errors;
    },
  },
};
</script>

<style scoped>
.v-stepper__header {
  box-shadow: none;
}
.v-stepper {
  box-shadow: none;
}

.form-items-wrapper {
  margin-top: 5px;
}
</style>
