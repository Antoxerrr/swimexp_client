<template>
  <v-card
    elevation="7"
    class="distcard rounded-lg"
    href="https://vk.com/betchi9"
  >
    <v-row
      class="row"
      justify="space-between"
    >
      <v-card-title
        class="card-title"
      >
        100м вольный стиль,  25м
      </v-card-title>
      <v-card-actions>
        <v-icon
          class="icon primary--text"
        >
          mdi-pencil
        </v-icon>
      </v-card-actions>
    </v-row>
    <v-progress-linear
      class="prog-bar"
      value="15"
      rounded
      height="20"
    >
      <i class="fas fa-thumbs-up fa-5x"></i>
    </v-progress-linear>
    <v-card-text
      class="card-more"
    >
      Нажмите для просмотра истории результатов
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DistCard',
};
</script>

<style lang="scss" scoped>
.distcard {
  margin-top: 25px;
  .row {
    padding: 0;
    margin: 0;
    .card-title {
      padding-left: 25px;
    }
    .icon {
      margin-right: 5px;
    }
  }
  .prog-bar {
    border-radius: 15px;
    margin: 0 25px;
    width: auto;
  }
  .card-more {
    text-align: center;
  }
}
</style>
