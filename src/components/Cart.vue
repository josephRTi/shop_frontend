<template>
  <div>
    <Banner text="Корзина"></Banner>
    <div class="cart">
        <table>
          <thead>
            <tr>
              <th style="padding-left: 15px;">Товар</th>
              <th class="price">Цена</th>
              <th>{{quantity}}</th>
              <th>Всего</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
                v-bind:key="index"
                v-for="(item, index) in items">
              <td class="title" style="display: flex; align-items: center">
                <div class="img">
                  <img :src="item.image ? item.image : require('@/assets/item.png')">
                </div>
                <p class="title2" @click="goToShopItem(item)">{{item.name}}</p>
              </td>
              <td>{{item.price}}</td>
              <td>
                <div class="quantity">
                  <input class="quantity-number" min="1" type="number" v-model="item.quantity">
                  <div class="quantity-nav">
                    <div @click="quantityUp(index)" class="quantity-button quantity-up">+</div>
                    <div @click="quantityDown(index)" class="quantity-button quantity-down">-</div>
                  </div>
                </div>
              </td>
              <td>{{item.price*item.quantity}}</td>
              <td class="delete" @click="deleteShopItem(item)">{{deleteText}}</td>
            </tr>

            <tr>
              <td v-for="(e,i) in 5" :key="i"><hr></td>
            </tr>
            <tr>
              <td v-for="(e,i) in totalTh" :key="i"></td>
              <td>Всего:</td>
              <td>{{total}}</td>
            </tr>
          </tbody>
        </table>

        <v-btn @click.prevent="create_order">Оформить заказ</v-btn>

        <p v-if="process" class="process">{{process}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Banner from './Banner'

export default {
  name: 'Cart',
  components: { Banner },
  props: {
    text: String,
  },
  data () {
    return {
      items: [],
      items2: [],
      navItems: [],
      price: '',
      title: '',
      description: '',
      quantity: '',
      path: "",
      name: '',
      phone: '',
      email: '',
      address: '',
      deleteText: '',
      windowWidth: 0,
      totalTh: '',
      process: '',
    }
  },
  created(){
    this.windowWidth = window.innerWidth;
    let shopItems = this.$store.getters.getCart;
    console.log(shopItems)
    shopItems.forEach(item => {
      console.log(item)
      axios.get('http://127.0.0.1:8080/product/get_by_id', { params: {id: item.item.id}}).then(response => {
        this.items.push({...response.data, quantity: item.item.quantity})
        console.log(this.items)
      })
    })
    // shopItems.forEach(s => {
    //   axios.post(path+'/api/product', {id: s.id})
    //   .then(response => {
    //     let sRes = response.data;
    //     sRes.quantity = s.quantity;
    //     this.items.push(sRes);
    //     axios.get(path+'/api/productCategories')
    //     .then(respon => {
    //       let resp = respon.data;
    //       resp.forEach(r => {
    //         this.navItems.push(r);
    //       });
    //       this.items.forEach((el,i) => {
    //         let n = this.navItems.find(x => x.id === el.category);
    //         this.items[i].category = n.category;
    //       })
    //       console.log(this.items);
    //       this.navItem = resp[0];
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    // })
    // this.items2 = this.$store.getters.getShopItems2;
  },
  watch: {
    windowWidth(newHeight, oldHeight) {
      if(newHeight > 600) {
        this.deleteText = 'Удалить';
        this.quantity = 'Количество';
        this.totalTh = 3;
      } else {
        this.deleteText = 'Х';
        this.quantity = 'Кол-во';
        this.totalTh = 2;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      });
    })
  },
  computed: {
    total() {
      let t = 0;
      this.items.forEach(s => {
        t += s.quantity*s.price;
      })
      this.items2.forEach(s => {
        t += s.quantity*s.price;
      })
      return t;
    },
  },
  methods: {
    goToShopItem(item){
      let id = item.id.toString();
      this.$router.push({ name: 'ShopItem', params: { id: id } });
    },
    deleteShopItem(item){
      this.$store.commit('deleteShopItem', item.id);
      this.items = this.items.filter(e => e.id != item.id);
    },
    deleteShopItem2(item){
      this.$store.commit('deleteShopItem2', item.id);
      this.items2 = this.items2.filter(e => e.id != item.id);
    },
    quantityUp(i){
      this.items[i].quantity=Number(this.items[i].quantity)+1;
      this.$store.commit('setShopItemQuantity', this.items[i]);
    },
    quantityDown(i){
      this.items[i].quantity>1 ? this.items[i].quantity-=1 : '';
      this.$store.commit('setShopItemQuantity', this.items[i]);
    },
    quantityUp2(i){
      this.items2[i].quantity=Number(this.items2[i].quantity)+1;
      this.$store.commit('setShopItem2Quantity', this.items2[i]);
    },
    quantityDown2(i){
      this.items2[i].quantity>1 ? this.items2[i].quantity-=1 : '';
      this.$store.commit('setShopItem2Quantity', this.items2[i]);
    },

    create_order(){
      console.log(this.items)
      let p = {
        'user_id': parseInt(this.$store.state.user.id),
        'products': []
      }

      this.items.forEach(function(item) {
        p['products'].push({'id': parseInt(item.id), 'count': parseInt(item.quantity)})
      })

      console.log(p)
      axios.post('http://127.0.0.1:8080/order/', p).then(response => {
        this.items = []
      })
    },
    goToConfirmation(){
      this.process = 'Обработка...'
      axios.get(path+'/api/contacts')
      .then(response => {
        let resp = response.data.filter(d => d.parameter == 'email');
        console.log(resp[0].description);
        axios.post(path+'/api/cart',{
          name: this.name,
          phone: this.phone,
          email: this.email,
          email_where: resp[0].description,
          address: this.address,
          cart: this.items,
          cart2: this.items2,
          total: this.total
        })
        .then(response => {
          console.log(response);
          this.name = this.phone = this.email = this.address = '';
          this.items = this.items2 = [];
          this.$store.commit('deleteAllShopItems');
          this.$store.commit('deleteAllShopItems2');
          this.process = `
            Заказ принят. На почту отправлен список того, что вы заказали. Вскоре
            с вами свяжутся для дальнейшего обсуждения заказа.`;
        })
        .catch(error => {
          console.log(error)
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/quantity.css';
@import '../assets/css/button.css';

button{
  margin-bottom: 50px;
}
.cart{
  padding: 0;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 10px;
  width: 100%;
}
tr > *{
  margin: auto 0;
}
.img{
  margin: 15px;
  display: inline-block;
}
tr img{
  object-fit: cover;
  width: 80px;
  height: 80px;
}
tr p{
  padding: 7px 15px;
  text-align: left;
  color: black;
  margin: 0;
}
thead th{
  text-align:left;border-top: 0px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  color: #777777;
  border-bottom: 1px rgb(233, 230, 230) solid;
  padding: .75rem;
  padding-left: 0;
}
table {
  border-collapse: collapse;
  width: 100%;
}
tr{
  border: 0;
  padding: 15px;
}
td{
  text-align: left;
}
td p:hover{
  cursor: pointer;
}
.title{
  color: #777777;
  word-wrap: break-word;
}
.title2{
  font-size: 16px;
  display: inline-block;
  color: #777777;
  max-width: 400px;
  word-wrap: break-word;
}
.delete{
  color: #777777;
}
.delete:hover, .title:hover{
  cursor: pointer;
  color: #007CB7;
}
.contacts{
  text-align: left;
  padding-left: 25px;
}
.contacts p{
  margin: 10px;
  margin-left: 0;
  margin-top: 20px;
}
.contacts input, .contacts textarea{
  min-width: 250px;
  border: rgb(202, 201, 201) 1px solid;
  padding: 7px 12px;
}
button{
  margin-top: 20px;
  margin-left: 0;
}
.price{
  padding-right: 40px;
}
.process{
  margin-top: 10px;
  margin-bottom: 40px;
}
@media screen and (max-width: 600px){
  .cart{
    font-size: 13px;
  }
  tr img{
    /* height: 40px; */
    margin: 10px;
  }
  .title2{
    padding-left: 25px;
    display: flex;
    align-items: center;
  }
  .img{
    display: block;
  }
  .price{
    padding-right: 15px;
  }
  .delete{
    padding-right: 10px;
  }
  .quantity{
    width: 52px;
    height: 40px;
    margin-right: 10px;
  }
  .quantity-number{
    font-size: 12px;
    padding: 9px 5px 0;
    width: 25px;
  }
  .quantity-nav{
    height: 40px;
    width: 20px;
  }
  .contacts input, .contacts textarea{
    min-width: 180px;
  }
}
</style>
