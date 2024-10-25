<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><strong>TPortal</strong></router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <template v-if="$store.state.isAuthenticated">
            <div class="navbar-item"><div class="buttons">
              <router-link to="/dashboard/my-account" class="button is-light">حساب کاربری</router-link>
              </div></div>
            <router-link to="/dashboard" class="navbar-item">کارتابل</router-link>
          </template>
          <template v-else>
            <router-link to="/" class="navbar-item"><strong>خانه</strong></router-link>
            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/sign-up" class="button is-success"><strong>ثبت نام</strong></router-link>
                <router-link to="/log-in" class="button is-light"><strong>ورود</strong></router-link>

              </div>
            </div>
          </template>
        </div> 
      </div>
    </nav>
  <section class="section">
    <router-view/>
  </section>
  <footer class="footer">
    <p class="has-text-centered">Copyright (c) 2024 - Tportal</p>
  </footer>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  beforeCreate() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if(token) {
      axios.defaults.headers.common['Authorization'] = "Token "+ token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
}
</script>

<style lang="scss">
@import '../node_modules/bulma';
@font-face {
  font-family: 'Vazir';
  src: url('../public/fonts/vazir/Farsi-Digits/Vazir-Medium-FD.eot');
  src: url('../public/fonts/vazir/Farsi-Digits/Vazir-Medium-FD.ttf'),
  url('../public/fonts/vazir/Farsi-Digits/Vazir-Medium-FD.woff'),
  url('../public/fonts/vazir/Farsi-Digits/Vazir-Medium-FD.woff2'),
}

* {
  font-family: 'Vazir' !important;
}
</style>
