<template>
  <div id="wrapper">
    <Header />
    <v-container
      class="cont"
    >
      <DistCard />
      <DistCard />
      <DistCard />
    </v-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import DistCard from '@/components/DistCard.vue';

export default {
  name: 'Home',
  components: { Header, DistCard },
  data: () => ({
    user: null,
  }),
  created() {
    this.user = this.$store.getters.user;
  },
};
</script>

<style scoped>
.cont {
  padding: 0 15px;
}
#wrapper {
  margin: 0;
  padding: 0;
}
</style>
