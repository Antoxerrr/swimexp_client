<template>
  <v-app-bar color="primary" dense>
    <div id="logout-btn-wrap">
      <v-btn
        text
        color="white"
        @click.prevent="logout"
      >
        <v-icon class="mr-1">mdi-exit-to-app</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { LOGOUT } from '@/store/actions.type';

export default {
  name: 'Header',
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT)
        .then(() => this.$router.push({ name: 'Auth' }))
        .catch(() => this.$router.push({ name: 'Auth' }));
    },
  },
};
</script>

<style scoped>
#logout-btn-wrap{
  margin-left: auto;
}
</style>
