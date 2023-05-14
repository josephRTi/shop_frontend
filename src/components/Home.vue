<template>
  <div class="home0">
    <Banner text="Главная"></Banner>
    <div class="home">
      <div class="banner">
      </div>
      <p class="title">
        Строительные материалы от производителя
      </p>
      <div class="advantages">
        <div>
          <img src="../assets/icons-car.png">
          <p>Бесплатная доставка</p>
        </div>
        <div style="border-left:1px solid rgb(233, 230, 230)"></div>
        <div>
          <img src="../assets/icons-support.png">
          <p>Поддержка 24/7</p>
        </div>
        <div style="border-left:1px solid rgb(233, 230, 230)"></div>
        <div>
          <img src="../assets/icons-guarantee.png">
          <p>Гарантия на услуги</p>
        </div>
      </div>
      <div class="pictures">
        <div>
          <img src="../assets/w1.jpg">
          <p>
            Что-то от <strong>5000</strong>₽
          </p>
        </div>
        <div>
          <img src="../assets/w3.jpg">
          <p>Что-то от <strong>7000</strong>₽</p>
        </div>
        <div>
          <img src="../assets/w2.jpg">
          <p>Что-то от <strong>2000</strong>₽</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Banner from "@/components/Banner";

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  created(){
  },
  methods: {
  },
  components: {
    Banner
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home0{
  /*background-image: url("../assets/common-banner2.jpg");*/
  /*background-position: right -120px;*/
  /*background-size: 1200px 200px;*/
  /*background-repeat: no-repeat;*/
  text-align: center;
}
.home{
  max-width: 1150px;
  margin: -30px auto 0;
  width: 100%;
}
.banner{
  /*height: 420px;*/
  background-position: left 0px;
  background-size: auto 100%;
  background-repeat: no-repeat;
  margin: 30px;
}
.banner p{
  padding-left: 450px;
  padding-top: 60px;
  text-align: left;
  font-size: 18px;
}
.title{
  font-size: 30px;
  padding: 30px;
  margin-bottom: 0;
  padding-bottom: 0;
  text-align: center;
}
.advantages{
  display: table;
  width: 100%;
  box-shadow: 0px 0px 10px rgb(233, 230, 230);
  padding: 30px;
  margin: 50px 0;
}
.advantages > *{
  display: table-cell;
  vertical-align: middle;
}
.advantages img{
  width: 36px;
}
.advantages p{
  margin: 0;
  /* vertical-align: middle; */
  padding: 10px;
}
.pictures{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.pictures img{
  object-fit: cover;
  width: 250px;
  height: 200px;
}
.pictures p{
  padding: 15px;
  margin-bottom: 50px;
}
@media screen and (max-width: 1020px){
  .pictures img{
    object-fit: cover;
    width: 200px;
    height: 150px;
  }
}
@media screen and (max-width: 850px){
  .banner{
    height: 280px;
    margin: 20px;
  }
  .banner p{
    font-size: 14px;
    padding-left: 280px;
    padding-top: 20px;
  }
  .advantages{
    font-size: 14px;
  }
  .title{
    font-size: 22px;
    padding: 20px;
    padding-bottom: 0;
  }
  .pictures img{
    object-fit: cover;
    width: 150px;
    height: 150px;
  }
}
@media screen and (max-width: 600px){
  .banner{
    height: auto;
    margin: 20px;
    background-image: none;
  }
  .banner p{
    font-size: 14px;
    padding-left: 0px;
    padding-top: 20px;
  }
  .title{
    font-size: 18px;
  }
  .pictures img{
    object-fit: cover;
    width: 100px;
    height: 100px;
  }
  .pictures p{
    font-size: 12px;
  }
}
</style>
