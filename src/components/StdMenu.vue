<template>
  <div align="center" v-if="checkLogin()">
    <div v-if="!$vuetify.breakpoint.xsOnly">
      <v-app-bar
          app
          color="black"
          dark>
        <div class="d-flex align-baseline">
          <h1>WD-Mall</h1>
        </div>
        <v-spacer></v-spacer>
        <div v-if="isLogin">
          <v-btn text @click="$router.push('/order')" >
            <v-icon>mdi-playlist-plus</v-icon>
            <span>{{$i18n.t('label.order')}}</span>
          </v-btn>
          <v-btn text @click="$router.push('/stock')" >
            <v-icon>mdi-playlist-check</v-icon>
            <span>{{$i18n.t('label.stock')}}</span>
          </v-btn>
          <v-btn text  @click="$router.push('/product')">
            <v-icon>mdi-playlist-star</v-icon>
            <span>{{$i18n.t('label.product')}}</span>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon v-on:click="logout" v-if="isLogin">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <div v-else>
      <v-app-bar
          app
          color="black"
          dark>
        <v-menu
            offset-y
            bottom left
            v-model="menu"
            :close-on-content-click="true">
          <template v-slot:activator="{ on }" >
            <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
          </template>

          <v-list>
            <v-list-item to="/order" @click="menu = false" dense>
              <v-list-item-icon><v-icon>mdi-playlist-plus</v-icon></v-list-item-icon>
              <v-list-item-title>{{$i18n.t('label.order')}}</v-list-item-title>
            </v-list-item>
            <v-list-item to="/stock" @click="menu = false" dense>
              <v-list-item-icon><v-icon>mdi-playlist-check</v-icon></v-list-item-icon>
              <v-list-item-title>{{$i18n.t('label.stock')}}</v-list-item-title>
            </v-list-item>
            <v-list-item to="/product" @click="menu = false" dense>
              <v-list-item-icon><v-icon>mdi-playlist-star</v-icon></v-list-item-icon>
              <v-list-item-title>{{$i18n.t('label.product')}}</v-list-item-title>
            </v-list-item>
            <v-list-item to="/product" @click="menu = false" dense>
              <v-list-item-icon><v-icon>mdi-playlist-star</v-icon></v-list-item-icon>
              <v-list-item-title>{{$i18n.t('label.product')}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <div align="left" style="max-width: 50px" v-if="false">
          <v-img
              class="mx-2"
              src="../assets/VisitKorea.png"
              max-height="35"
              contain
          ></v-img>
        </div>
        <div class="d-flex align-baseline">
          <h2>C</h2><h6>ross</h6><h2>B</h2><h6>order</h6><h2>M</h2><h6>anagement</h6>
        </div>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn icon v-on:click="logout" v-if="isLogin">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
  </div>
</template>

<script>
// import Login from "@/components/Login";
import Login from "@/components/Login2";
import i18n from '@/i18n'

export default {
  name: "StdMenu",
  components: {
    Login
  },
  data() { return {
    logined: false,
    menu: false,
  }},
  methods: {
    goPlan(){
      if(this.checkLogin())
        this.$router.push('/orderplan')
    },
    goOrder(){
      if(this.checkLogin())
        this.$router.push('/ordersvc')
    },
    logout() {
      this.logined = false
      this.$store.commit('removeAccessToken')
      localStorage.removeItem('userId')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('role')
      this.$emit('logined', false)
      this.$router.push('/login')
    },
    login() {
      this.$router.push('/login')
    },
    isLogin() {
      return this.$store.getters.getIsAuth
    },
    checkLogin() {
      if(localStorage.getItem('userId')){
        this.logined = true
        return true
      }
      return false
    },
    isMobile(){
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    },

  },
  created() {
    this.checkLogin()
  }
}
</script>

<style scoped>

</style>
