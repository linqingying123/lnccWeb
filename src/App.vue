<template>

  <router-view ></router-view>
</template>

<script>


import apis from "@/apis";
import {useStore} from 'vuex'

export default {
  name: 'App',
  components: {},
  created(){
    console.log("创建app")
  },
  data() {
    return {
      // isShow: false
    }
  },
  setup() {

  },


}
</script>

<style>

</style>
