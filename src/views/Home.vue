<template>
  <div class="home">
    <div align="center">
      <br/>
      <br/>
      <v-card max-width="70%" flat>
        <v-img src="../assets/CrossBorder.jpg" contains  />
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
