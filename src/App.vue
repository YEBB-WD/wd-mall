<template>
  <v-app>
    <v-main>
      <div v-if="logined">
        <sadm-menu v-model="logined" @logined="check"
                   v-if="(getRole() == 'SuperAdmin')"/>
        <std-menu v-model="logined" @logined="check"
                  v-else/>
        <router-view />
      </div>
      <div v-if="!logined">
        <login @login="updateLogin"/>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Login from "@/components/Login2.vue";
import StdMenu from "@/components/StdMenu.vue";
import SadmMenu from "@/components/SadmMenu.vue";

export default Vue.extend({
  name: 'App',
  data: () => ({
    site: '',
    logined: false,
    role: ''
  }),
  components: {
    Login,
    StdMenu,
    SadmMenu
  },
  methods: {
    checkLogin() {
      if(localStorage.getItem('userId')){
        this.logined = true
        this.role = (localStorage.getItem('role') || '');
        console.log(this.role)
      }
      return this.logined
    },
    updateLogin() {
      this.logined = true
    },
    check() {
      this.logined = false
    },
    getRole() {
      return localStorage.getItem('role')
    },
  },
  mounted() {
    this.checkLogin()
  }
});
</script>
