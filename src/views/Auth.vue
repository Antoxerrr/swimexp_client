<template>
  <AuthLayout title="Авторизация">
    <AuthForm />
  </AuthLayout>
</template>

<script>
import AuthLayout from '@/components/auth/AuthLayout.vue';
import AuthForm from '@/components/auth/AuthForm.vue';

export default {
  name: 'Auth',
  components: {
    AuthForm,
    AuthLayout,
  },
};
</script>
