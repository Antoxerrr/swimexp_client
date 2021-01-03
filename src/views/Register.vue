<template>
  <AuthLayout title="Регистрация">
    <RegisterForm />
  </AuthLayout>
</template>

<script>
import AuthLayout from '@/components/auth/AuthLayout.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';

export default {
  name: 'Register',
  components: {
    RegisterForm,
    AuthLayout,
  },
};
</script>
