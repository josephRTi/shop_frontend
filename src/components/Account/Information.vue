<template>
  <div>
    <div class="account" v-if="this.$store.state.token !== ''" >
      <v-container class="ma-0">
        <v-row>
          <v-col cols="3" xs="6">
            <div class="pt-8 pb-8 pl-7 pr-6 col_style" >
              <img :src="require('@/assets/mountain.jpeg')" width="200" height="200" class="rounded-circle">
              <div class="pt-4 pl-2">
                <h2>{{ this.$store.state.user.surname }} {{ this.$store.state.user.name }}</h2>
                <h2>{{ this.$store.state.user.middleName }}</h2>
              </div>
            </div>
            <div class="col_style pt-4">
              <nav>
                <router-link style="text-decoration: none" v-for="(item, index) in navItems" :key="index" :to="{name: item.to}">
                  <p
                      @click="navItem = item;"
                      :class="navItem === item ? 'active' : ''"
                  >
                    {{ item.category }}
                  </p>
                </router-link>
              </nav>
            </div>
            <div v-if="this.$store.state.isAdmin" class="col_style pt-4">
              <nav>
                <router-link style="text-decoration: none" v-for="(item, index) in adminNavItems" :key="index" :to="{name: item.to}">
                  <p
                      @click="navItem = item;"
                      :class="navItem === item ? 'active' : ''"
                  >
                    {{ item.category }}
                  </p>
                </router-link>
              </nav>
            </div>
          </v-col>

          <v-col cols="9" class="pt-4 pl-6">
            <router-view/>
          </v-col>
        </v-row>
      </v-container>

    </div>
    <div v-else>
      <div class="account">
      <v-container class="ma-0">
        <v-row>
          <v-col cols="12" xs="6">
            <v-content style="margin-top: 50px; margin-bottom: 50px ">
              <v-container fluid fill-height>
                <v-layout align-center justify-center>
                  <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                      <v-toolbar dark color="primary">
                        <v-toolbar-title>Вход</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                        <v-form>
                          <v-text-field
                              prepend-icon="person"
                              id="login"
                              name="login"
                              label="Login"
                              type="text"
                          ></v-text-field>
                          <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Password"
                              type="password"
                          ></v-text-field>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click.prevent="login" color="primary" >Login</v-btn>
                        <v-btn @click.prevent="$router.push({path: '/registration'})" color="secondary" style="float: left">Register</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-content>

          </v-col>
        </v-row>
      </v-container>
      </div>
      </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "Information",
  data: () => ({
    alignments: [
      'start',
      'center',
      'end',
    ],
    navItems: [ {category: "Профиль", to: 'profile'}, {category: "Мои заказы", to: 'userOrders'}],
    adminNavItems: [ {category: "Управление категориями", to: "categoryManagement"}, {category: "Управление товарами", to: "productManagement"}, {category: "Управление заказами", to: 'orders'}]

  }),
  methods: {
    async login() {
      await axios.post('http://127.0.0.1:8080/auth/', {
        email: document.getElementById('login').value,
        password: document.getElementById('password').value,
      }).then(response => {
        console.log(response)
        this.$store.commit('setUser', response.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.account {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
}

.col_style {
  border-right: solid 1px #F2F2F2;
  border-bottom: solid 1px #F2F2F2;
}

nav {
  align-self: start;
  //min-width: 180px;
  max-width: 260px;
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

</style>
