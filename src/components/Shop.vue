<template>
  <div>
    <Banner text="Товары"></Banner>
    <div class="shop">
      <nav>
        <p
          @click="getItems(item)"
          :class="navItem === item ? 'active' : ''"
          v-bind:key="index"
          v-for="(item, index) in navItems">
          {{ item.name }}
        </p>
      </nav>
      <div class="right-part">
        <v-text-field
            prepend-icon="search"
            id="search"
            name="search"
            label="Поиск"
            type="text"
            @change="getSearched"
        ></v-text-field>
        <div
          class="card"
          v-bind:key="index"
          v-for="(item, index) in items"
          @click="goToShopItem(item)">
          <img :src="item.image ? item.image : require('@/assets/item.png')">
          <!--          <img :src="path+'/static/'+item.img">-->
          <p>{{ item.name }}</p>
          <p>₽{{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Banner from './Banner'

export default {
  name: 'Shop',
  components: {Banner},
  props: {
    text: String,
  },
  data() {
    return {
      navItems: [],
      navItem: {id: 1, category: "Окна и двери"},
      items: [],
      price: '',
      title: '',
      description: '',
    }
  },
  created() {
    this.get_categories()
    axios.get('http://127.0.0.1:8080/product/', { params: {category_id: this.navItem.id}}).then(response => {
      console.log(response)
      this.items = response.data
    })
  },
  computed: {
    itemsFilter() {
      return this.items.filter(i => i.category == this.navItem.category)
    }
  },
  methods: {
    async getSearched() {
      let search = document.getElementById('search').value
      await axios.get(`http://127.0.0.1:8080/product/get_by_str?search=${search}&category_id=${this.navItem.id}`).then(response => {
        this.items = response.data
      })
    },
    async get_categories() {
      await axios.get('http://127.0.0.1:8080/category/').then(response => {
        this.navItems = response.data
      })
    },
    goToShopItem(item) {
      let id = item.id.toString()
      this.$router.push({name: 'ShopItem', params: {id: id}})
    },
    getItems(item) {
      this.navItem = item;
      axios.get('http://127.0.0.1:8080/product/', { params: {category_id: this.navItem.id}}).then(response => {
        this.items = response.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
