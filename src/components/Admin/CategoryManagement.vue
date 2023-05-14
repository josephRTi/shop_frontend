<template>
  <div>
    <h2 class="pt-4 pb-2">Категории</h2>
    <v-row v-for="category in categories" class="mt-5 ml-2">
        <p style="width: 200px">{{ category.name }}</p> <v-btn @click.prevent="deleteCategory(category.id)">Удалить</v-btn>
    </v-row>

    <h2 class="mt-5">Добавить категорию</h2>
    <v-row class="ml-0 pl-0">
      <v-col cols="4">
        <v-text-field class=""
            prepend-icon="pen"
            id="category_name"
            name="category_name"
            label="Название"
            type="text"
        ></v-text-field>
      </v-col>
      <v-col cols="2"><v-btn class="mt-2" @click.prevent="createCategory">Добавить</v-btn></v-col>

    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoryManagement",
  data: () => ({
    categories: []
  }),
  methods: {
    async get_categories() {
      await axios.get('http://127.0.0.1:8080/category/').then(response => {
        this.categories = response.data
      })
    },

    async deleteCategory(id) {
      await axios.delete(`http://127.0.0.1:8080/category/delete?id=${id}`).then(response => {
        this.get_categories()
      })
    },

    async createCategory() {
      await axios.post(`http://127.0.0.1:8080/category`, {
        name: document.getElementById('category_name').value,
      }).then(response => {
        this.get_categories()
      })
    }
  },
  beforeMount() {
    this.get_categories()
  }
}
</script>

<style scoped>

</style>