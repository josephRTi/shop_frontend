<template>

   <div class="right-part">
      <v-row>
        <v-col cols="9">
          <v-select
              v-model="selected_category"
              label="Категория"
              :items=this.categories
              id="category_id"
              item-text="name"
              item-value="id"
              @change="getItems"
              return-object
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-btn class="mt-2" :to="{name: 'addItem'}">Добавить</v-btn>
        </v-col>
      </v-row>

     <div
         class="card"
         v-bind:key="index"
         v-for="(item, index) in items"
         >
       <img @click="goToShopItem(item)" :src="item.image ? item.image : require('@/assets/item.png')">
       <!--          <img :src="path+'/static/'+item.img">-->
       <p>{{ item.name }}</p>
       <p>₽{{ item.price }}</p>
       <v-btn @click.prevent="delete_item(item.id)">Удалить</v-btn>
     </div>
 </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductManagement",
  data() {
    return {
      items: [],
      price: '',
      title: '',
      description: '',
      categories: [],
      selected_category: null
    }
  },
  created() {
    this.get_categories()
    console.log(this.categories)
  },
  computed: {
    itemsFilter() {
      return this.items.filter(i => i.category == this.navItem.category)
    }
  },
  methods: {
    delete_item(id) {
      axios.delete(`http://127.0.0.1:8080/product/delete?id=${id}`).then(response => {
        this.getItems()
      })
    },
    goToShopItem(item) {
      let id = item.id.toString()
      this.$router.push({name: 'ShopItem', params: {id: id}})
    },
    getItems(item) {
      this.navItem = item;
      axios.get('http://127.0.0.1:8080/product/', {
        params: {category_id: this.selected_category.id}}).then(response => {
        //
        this.items = response.data
      })
    },
    async get_categories() {
      await axios.get('http://127.0.0.1:8080/category/').then(response => {
        this.categories = response.data
      })
    },
  }
}
</script>

<style scoped>
.shop {
  padding: 0;
  max-width: 1200px;
  margin: 50px auto;
  width: 100%;
  display: grid;
  grid-template-columns: max-content auto;
}

nav {
  align-self: start;
  min-width: 200px;
  height: min-content;
  box-shadow: 0px 0px 10px rgb(233, 230, 230);
}

nav p {
  padding: 15px 10px;
  border-bottom: rgb(233, 230, 230) 1px solid;
  margin: 0 20px;
  text-align: left;
  color: black;
  font-size: 16px;
}

nav p:hover {
  cursor: pointer;
  color: #007CB7;
}

.right-part {
  margin-left: 50px;
}

.card {
  object-fit: contain;
  max-width: 200px;
  display: inline-block;
  justify-items: start;
  margin-right: 30px;
  margin-bottom: 60px;
  border: 1px solid;
  vertical-align: top;
}

.card:hover {
  background: rgb(213, 238, 156);
  cursor: pointer;
}

.card img {
  object-fit: cover;
  width: 200px;
  height: 200px;
  padding: 15px;
}

.card p {
  padding: 7px 15px;
  text-align: left;
  color: black;
  margin: 0;
}

.active {
  color: #007CB7;
}

@media screen and (max-width: 1300px) {
  nav {
    margin-left: 20px;
  }
}

@media screen and (max-width: 600px) {
  .shop {
    grid-template-columns: auto;
    grid-template-rows: auto;
  }

  nav {
    margin-bottom: 20px;
    margin-left: 0;
  }

  nav p {
    text-align: center;
  }
}
</style>