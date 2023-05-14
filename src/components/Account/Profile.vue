<template>
  <div>
    <h2 class="pt-4 pb-2">Основная информация</h2>
    <v-row>
      <v-col cols="5">
        <h3>Фамилия</h3>
        <p>{{ this.$store.state.user.surname }}</p>
        <h3>Имя</h3>
        <p>{{ this.$store.state.user.name }}</p>
        <h3>Отчество</h3>
        <p>{{ this.$store.state.user.middleName }}</p>
      </v-col>
      <v-col cols="5">

      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Profile",
  computed: {

  }
}
</script>

<style scoped>

</style>
