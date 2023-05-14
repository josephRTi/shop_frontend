<template>
  <div class="shop-item0">
    <h2 class="ml-10 mt-5 mb-5">Добавление товара</h2>
    <div style="height: 500px; width: 1000px; justify-content: center; display: flex; align-items: center; margin: 150px auto" v-if="isLoading">
      <PulseLoader :loading="isLoading"></PulseLoader>
    </div>

    <v-row class="ml-0 pl-0">
      <v-col cols="5">
        <v-text-field class=""
                      prepend-icon="pen"
                      id="name"
                      name="name"
                      label="Наименование"
                      type="text"
        ></v-text-field>
        <v-text-field class=""
                      prepend-icon="pen"
                      id="description"
                      name="description"
                      label="Описание"
                      type="text"
        ></v-text-field>
        <v-select class="ml-8"
            v-model="selected_category"
            label="Категория"
            :items=this.categories
            id="category_id"
            item-text="name"
            item-value="id"
            return-object
        ></v-select>
        <v-text-field class=""
                      prepend-icon="pen"
                      id="url"
                      name="url"
                      label="URL изображения"
                      type="text"
        ></v-text-field>
        <v-text-field class=""
                      prepend-icon="pen"
                      id="price"
                      name="price"
                      label="Цена"
                      type="integer"
        ></v-text-field>
        <v-btn class="ml-15" @click.prevent="$router.back()">Назад</v-btn>
        <v-btn class="ml-15" @click.prevent="create_item">Создать</v-btn>
      </v-col>


    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddItem",

  data() {
    return {
      categories: [],
      selected_category: null
    }
  },
  created() {
    this.get_categories()
    console.log(this.categories)
  },
  methods: {
    async get_categories() {
      await axios.get('http://127.0.0.1:8080/category/').then(response => {
        this.categories = response.data
      })
    },
    async create_item() {
      await axios.post('http://127.0.0.1:8080/product/', {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: parseInt(document.getElementById('price').value),
        category_id: parseInt(this.selected_category.id),
        image: document.getElementById('url').value
      }).then(response => {
        this.$router.back()
      })
    }
  }
}
</script>

<style scoped>

</style>