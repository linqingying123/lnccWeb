<template>
  <a v-if="/^(http|https):\/\//.test(to)" :href="to" target="_blank">
    <slot></slot>
  </a>
  <router-link v-else-if="/\/home/.test(to)" to="/home">
    <slot></slot>
  </router-link>
  <router-link v-else :to="{name:'NavContent',params:{id:to,parentId:parentId}}">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "MyRouterLink",
  props: {
    to: {
      type: String,
      required: true
    },
    parentId: {
      type: String,
      default: null
    }
  },
  methods: {}
}


</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
  width: 100%;


}
</style>
