<template>
  <div class="shop-item0">
    <div style="height: 500px; width: 1000px; justify-content: center; display: flex; align-items: center; margin: 150px auto" v-if="isLoading">
      <PulseLoader :loading="isLoading"></PulseLoader>
    </div>

    <div class="shop-item" v-else>
      <img :src="item.image ? item.image : require('@/assets/item.png')">
      <div class="info1">
        <h2 style="margin: 0 0 10px 0;color:black"><strong>{{ item.name }}</strong></h2>
        <h4 style="color:#007CB7;margin: 0 0 20px 0;">₽{{ item.price }}</h4>
        <hr>
        <p style="margin: 25px 0 0">{{ item.description }}</p>
        <p style="margin: 55px 10px 0 0;display:inline-block">Количество:</p>
        <div class="quantity">
          <input class="quantity-number" min="1" type="number" v-model="quantity">
          <div class="quantity-nav">
            <div @click="quantity=Number(quantity)+1" class="quantity-button quantity-up">+</div>
            <div @click="quantity>1 ? quantity-=1 : ''" class="quantity-button quantity-down">-</div>
          </div>
        </div>
        <button @click="addToCart()">В КОРЗИНУ</button>
        <p v-if="added">{{ added }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Banner from './Banner'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


export default {
  name: 'Shop',
  components: {Banner, PulseLoader},
  props: {
    id: String,
  },
  data() {
    return {
      item: {title: "Title", price: 1500, category: "category", description: "lorem25"},
      path: "",
      quantity: 1,
      added: '',
      isLoading: true,
    }
  },
  created() {
    // axios.post(path+'/api/product', {id: this.id})
    // .then(response => {
    //   this.item = response.data;
    //   axios.get(path+'/api/productCategories')
    //   .then(response => {
    //     let resp = response.data;
    //     let n = resp.find(x => x.id === this.item.category);
    //     this.item.category = n.category;
    //   })
    // })
    // .catch(error => {
    //   console.log(error)
    // })
    axios.get('http://127.0.0.1:8080/product/get_by_id', { params: {id: this.id}}).then(response => {
      this.item = response.data
      this.isLoading = false
    })
  },
  methods: {
    addToCart() {
      this.$store.commit('addToCart', { item: {
          id: this.item.id,
          quantity: this.quantity
        }
      });
      setTimeout(() => {
        this.added = '';
      }, 3000);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/button.css';

.shop-item0 {
  background-image: url("../assets/common-banner2.jpg");
  background-position: right -65px;
  background-size: 1200px 200px;
  background-repeat: no-repeat;
}

.shop-item {
  max-width: 1150px;
  margin: 200px auto 50px;
  width: 100%;
  display: grid;
  grid-template-columns: max-content auto;
  color: #777777;
}

img {
  height: 340px;
  margin: 0 15px;
}

.info1 {
  text-align: left;
  margin: auto 0;
  margin-left: 60px;
}

.info1 > p {
  margin: 15px 0;
}

/**/
.quantity {
  width: 68px;
  border: rgb(202, 201, 201) 1px solid;
  vertical-align: middle;
  display: inline-block;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.quantity-number {
  display: inline-block;
  padding: 9px 10px 0;
  vertical-align: top;
  width: 35px;
  border: 0;
  font-size: 13px;
}

.quantity-nav {
  display: inline-block;
  height: 42px;
}

.quantity-button {
  cursor: pointer;
  border-left: 1px solid #eee;
  width: 24px;
  text-align: center;
  color: #333;
  font-size: 13px;
  font-family: "Trebuchet MS", Helvetica, sans-serif !important;
  line-height: 1.7;
  user-select: none;
}

.quantity-button.quantity-up {
  height: 50%;
  top: 0;
  border-bottom: 1px solid #eee;
}

.quantity-button.quantity-down {
  bottom: -1px;
  height: 50%;
}

@media screen and (max-width: 700px) {
  .shop-item {
    grid-template-columns: auto;
    grid-template-rows: max-content auto;
  }

  img {
    margin: 0 auto;
  }

  .info1 {
    margin: 35px;
    margin-bottom: 0;
  }
}

@media screen and (max-width: 400px) {
  img {
    max-height: 200px;
  }

  button {
    margin-top: 30px;
    margin-left: 0;
  }
}
</style>
