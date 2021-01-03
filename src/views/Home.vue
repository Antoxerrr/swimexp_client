<template>
  <div id="wrapper">
    <Header />
    {{ user }}
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'Home',
  components: { Header },
  data: () => ({
    user: null,
  }),
  created() {
    this.user = this.$store.getters.user;
  },
};
</script>

<style scoped>
#wrapper {
  margin: 0;
  padding: 0;
}
</style>
