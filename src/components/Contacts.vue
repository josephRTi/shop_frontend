<template>
  <div>
    <Banner text='Контакты'></Banner>
    <div class="contacts">
      <div class="other">
<!--        <GmapMap ref="mapRef"-->
<!--          :center="{lat:Number(latitude), lng:Number(longitude)}"-->
<!--          :zoom="11"-->
<!--          map-type-id="roadmap"-->
<!--          class="map"-->
<!--        >-->
<!--          <GmapMarker ref="myMarker"-->
<!--            :position="google && new google.maps.LatLng(latitude, longitude)"-->
<!--            @click="infoWinOpen=!infoWinOpen"-->
<!--          />-->

<!--          <gmap-info-window-->
<!--            :position="google && new google.maps.LatLng(latitude, longitude)"-->
<!--            :opened="infoWinOpen"-->
<!--            @closeclick="infoWinOpen=false"-->
<!--            :options="{ pixelOffset: {-->
<!--                width: 0,-->
<!--                height: -35-->
<!--            } }"-->
<!--          >-->
<!--            <div v-html="infoContent"></div>-->
<!--          </gmap-info-window>-->
<!--        </GmapMap>-->
        <yandex-map >
          <!--Markers-->
        </yandex-map>
        <div class="contacts-info">
          <div style="margin:0 auto;text-align: left;max-width:600px;">
            <h4>Режим работы:</h4>
            <p>Пн - Пт 9:00 - 20:00</p>
            <h4>Телефон:</h4>
            <p>7-(999)-000-11-22</p>
          </div>
          <form prevent-default>
            <h4 style="color: black;text-align: center">Обратная связь</h4>
            <p>Имя</p>
            <input required v-model="nameFeedback" placeholder="Введите имя">
            <p>Email</p>
            <input required v-model="email2" placeholder="Введите email">
            <p>Текст сообщения</p>
            <textarea required v-model="message" placeholder="Введите текст сообщения"></textarea>
            <button @click.prevent="feedback()" style="text-align: center">ОТПРАВИТЬ</button>
            <p v-if="response" style="padding-top: 20px; padding-bottom: 0">{{response}}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import {gmapApi} from 'vue2-google-maps'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

import Banner from './Banner'

export default {
  name: 'Contacts',
  components: { Banner, yandexMap, ymapMarker },
  data () {
    return {
      name: '',
      address: '',
      work_schedule: '',
      phone: '',
      email: '',
      email2: '',
      latitude: '',
      longitude: '',
      infoWinOpen: true,
      nameFeedback: '',
      message: '',
      response: '',
    }
  },
  created(){
    axios.get(path+'/api/contacts')
    .then(response => {
      console.log(response)
      let resp = response.data;
      resp.forEach(r => {
        this[r.parameter] = r.description;
      });
    })
    .catch(error => {
      console.log(error)
    })
  },
  computed: {
    // google: gmapApi,
    // infoContent(){
    //   return this.name + '<br>' + this.address
    // }
  },
  methods: {
    feedback(){
      this.response = 'Сообщение отправляется...';
      axios.post(path+'/api/mail', {
        name: this.nameFeedback,
        email: this.email2,
        message: this.message,
        email_where: this.email
      })
      .then(response => {
        let resp = response.data;
        console.log(resp)
        this.response = 'Сообщение отправлено.';
        this.nameFeedback = '';
        this.email2 = '';
        this.message = '';
        setTimeout(() => {
          this.response = '';
        }, 5000);
      })
      .catch(error => {
        this.response = 'Ошибка.';
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/button.css';

.contacts{
  padding: 0;
  color:white;
  max-width: 1200px;
  margin: 20px auto;
  width: 100%;
}
.other{
  color: black;
  padding: 50px;
  margin: 0;
  display: grid;
  grid-template-columns: max-content auto;
}
.map{
  width: 600px;
  height: 600px;
  z-index: 0;
  margin-top: 0px;
  margin-left: 0px;
  margin: 0 auto;
}
.contacts-info{
  margin-top: 0px;
  margin-bottom: 50px;
  margin-right: 0px;
  padding-left: 80px;
}
/* Обратная связь */
form{
  color: black;
  border: rgb(202, 201, 201) 2px solid;
  border-radius: 5px;
  padding: 30px 40px;
  max-width: 600px;
  margin: 40px auto 0px;
  font-size: 14px;
}
form p{
  margin-bottom: 5px;
  text-align: left;
}
input, textarea{
  border: rgb(202, 201, 201) 1px solid;
  padding: 7px 12px;
  width: 100%;
  margin-bottom: 20px;
}
@media screen and (max-width: 1150px){
  .other{
    grid-template-rows: max-content auto;
    grid-template-columns: auto;
  }
  .map{
    margin-bottom: 30px;
  }
  .contacts-info{
    padding: 0;
  }
}
@media screen and (max-width: 700px){
  .map{
    width: 450px;
    height: 500px;
  }
}
@media screen and (max-width: 550px){
  .map{
    width: 300px;
    height: 400px;
  }
}
@media screen and (max-width: 400px){
  .map{
    width: 250px;
    height: 300px;
  }
  .contacts-info h4{
    font-size: 18px;
  }
  .contacts-info h5{
    font-size: 12px;
  }
  form{
    font-size: 12px;
    padding: 20px;
  }
  form h2{
    font-size: 18px;
  }
}
</style>
