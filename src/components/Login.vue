<template>
  <div>
    <v-img
        src="../assets/Korea-palace2.jpg"
        contains
        height="900"
    >
      <br/>
      <br/>
      <br/>
      <v-row
          align="center"
          justify="center"
      >
        <v-col
            class="text-center"
            cols="12"
        >
          <h1 style="color: blue" class="display-1 heading mb-4">
            Cross Border Management
          </h1>
        </v-col>
        <v-card>
          <v-container fluid>
            <div align="center"><H2>LOGIN</H2></div>
            <v-row dense justify="center" align="baseline">
              <v-col cols="10" >
                <v-text-field dense outlined label="ID *" required v-model="loginId"></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
                    dense
                    outlined
                    label="Password *"
                    required v-model="password"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    v-on:keyup.enter="login"
                    @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense align="center" justify="center">
              <v-col align="end">
                <v-btn text v-on:click="login" color="green">Submit</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-row>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

    </v-img>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() { return {
      title: '',
      loginId: '',
      password: '',
      show1: false,
      test: true
  }},
  methods: {
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
  props: {
    header: {
      type: String,
      default: require("@/assets/profile_city.jpg")
    }
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
