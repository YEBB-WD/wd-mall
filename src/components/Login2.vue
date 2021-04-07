<template>
  <div align="center" style="min-height: 1800px" :style="headerStyle">
    <br/>
    <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
        ></v-progress-linear>
      </template>

      <v-img
          height="250"
          src="../assets/Korea-palace2.jpg"
      ></v-img>
      <div align="center"><H2>LOGIN</H2></div>

      <v-divider class="mx-4"></v-divider>
      <v-container fluid>
        <v-row dense justify="center" align="baseline">
          <v-col cols="10" >
            <v-text-field dense label="ID *" required v-model="loginId"></v-text-field>
          </v-col>
          <v-col cols="10">
            <v-text-field
                dense
                label="Password *"
                required v-model="password"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                v-on:keyup.enter="login"
                @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="mx-4"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn
            color="deep-purple lighten-2"
            text
            @click="reserve"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Login2",
  data() { return {
    loading: false,
    selection: 1,
    title: '',
    loginId: '',
    password: '',
    show1: false,
    test: true
  }},
  props: {
    header: {
      type: String,
      default: require("@/assets/profile_city.jpg")
    }
  },
  methods: {
    reserve () {
      this.loading = true
      this.getAuth()

      setTimeout(() => (this.loading = false), 2000)
    },
    login () {
      // this.$router.go(-1);
      this.getAuth()
    },
    cancel () {
      this.$store.commit('removeAccessToken')
      this.$router.go(-1);
    },
    getAuth() {
      console.log("login start....")
      let payload = {
        loginId: this.loginId,
        password: this.password
      }
      console.log('login called')

      if(this.test) {
        let payload2 = {
          userId: this.loginId,
          role: 'SuperAdmin',
          name: 'TESTER'
        }
        this.$store.commit('setUserId', payload2)
        this.$store.commit('setAccessToken', "aaaaabbbbccccddddeee")
        this.$emit('login', payload2)
        this.$router.push('/')
        return
      }

      this.$axios.post('/api/login', payload).then((response) => {
        if(response.data.ok){
          let payload2 = {
            userId: response.data.loginId,
            role: response.data.role,
            loc: response.data.loc,
            name: response.data.name
          }
          this.$store.commit('setUserId', payload2)
          this.$store.commit('setAccessToken', response.data.access_token)
          let loginPg = {
            loginId: payload2.userId,
            logined: true
          }
          this.$emit('login', payload2)
          this.$router.push('/')
          // location.reload()
        }else{
          alert('login failed! : '+response.data.error)
        }
      })
          .catch(function (error) {
            console.log(error);
          });
      console.log("login end....")
    },
    updateTitle() {
      let url = location.href
      console.log(url)
      // url = "http://erp.wd.wdplatform.com/"
      let idx = url.indexOf('.wdplatform.com')
      if(idx > 0){
        this.title = url.substring(7,idx).toUpperCase()
      } else {
        this.title = 'WD ICP'
      }
      console.log(this.title)
    },
    checkLoginStatus() {
      if(this.$store.getters.getIsAuth){
        this.logined = false
        this.loginId = ''
        this.$store.commit('removeAccessToken')
        this.$router.push('/')
      }
    },
    cleardata() {
      localStorage.removeItem('userId')
      localStorage.removeItem('accessToken')
      this.$store.commit('removeAccessToken')
    },
    isDgType() {
      let url = location.href
      console.log(url)
      let idx = url.indexOf('://') + 3
      let surl = url.substring(idx)
      if(surl.toLowerCase().startsWith('d')){
        return true
      } else if(surl.toLowerCase().startsWith('m')){
        return false
      }

      return true ;
    },
    isBest() {
      let url = location.href
      console.log(url)
      let idx = url.indexOf('://') + 3
      let surl = url.substring(idx)
      if(surl.toLowerCase().startsWith('b')){
        return true
      }
      return false
    }
  },
  created() {
    // this.updateTitle()
    this.checkLoginStatus()
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
}
</script>

<style scoped>

</style>
