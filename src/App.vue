<template>
  <v-app>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100%;
  font-family: "Roboto", sans-serif !important;
}

.v-application a {
  text-decoration: none;
  font-weight: 500;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity .1s ease;
}
.fade-leave-active {
  transition: opacity .1s ease;
  opacity: 0;
}
</style>
