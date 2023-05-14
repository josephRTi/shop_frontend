<template>
  <div class="mt-16">
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
                      <v-toolbar-title>Регистрация</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-form>
                        <v-text-field
                            prepend-icon="person"
                            id="email"
                            name="email"
                            label="Почта"
                            type="text"
                        ></v-text-field>
                        <v-text-field
                            prepend-icon="person"
                            id="surname"
                            name="surname"
                            label="Фамилия"
                            type="text"
                        ></v-text-field>
                        <v-text-field
                            prepend-icon="person"
                            id="name"
                            name="name"
                            label="Имя"
                            type="text"
                        ></v-text-field>
                        <v-text-field
                            prepend-icon="person"
                            id="middleName"
                            name="middleName"
                            label="Отчество"
                            type="text"
                        ></v-text-field>

                        <v-text-field
                            id="password"
                            prepend-icon="lock"
                            name="password"
                            label="Пароль"
                            type="password"
                        ></v-text-field>
                        <v-text-field
                            id="password2"
                            prepend-icon="lock"
                            name="password2"
                            label="Пароль"
                            type="password"
                        ></v-text-field>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click.prevent="$router.back()" color="secondary" style="float: left">Back</v-btn>
                      <v-btn @click.prevent="register" color="primary" >Register</v-btn>
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
</template>

<script>
import axios from "axios";

export default {
  name: "Registration",
  methods: {
    async register() {
      await axios.post('http://127.0.0.1:8080/users', {
        email: document.getElementById('email').value,
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        middleName: document.getElementById('middleName').value,
        password: document.getElementById('password').value,
        password2: document.getElementById('password2').value,
      }).then(response => {
        console.log(response)
        this.$router.push({path: '/account/profile'})
      })
    }
  }
}
</script>

<style scoped>
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