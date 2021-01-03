<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="auth-form-sheet">
          <v-card-subtitle
            class="text-sm-center justify-center auth-card-subtitle"
          >
            <b>SWIMEXP</b>
          </v-card-subtitle>
          <v-card-title
            class="justify-center auth-card-title"
            color="secondary"
          >
            {{ title }}
          </v-card-title>
          <v-card-text>
            <slot></slot>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AuthLayout',

  props: {
    title: String,
  },
};
</script>

<style>
.auth-form-sheet {
  box-shadow: none !important;
  margin-bottom: 15px;
}

.form-links {
  margin-top: 25px;
}

.auth-card-title {
  color: var(--v-secondary-lighten1);
}

.auth-card-subtitle{
  display: flex;
  color: var(--v-primary-base) !important;
}
</style>
