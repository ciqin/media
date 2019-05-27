<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {getPerm} from './http/api'

  export default {

    mounted() {
      // this.getInit()
      // this.$store.commit('fetchRequest', {a:12313})
      // this.$store.dispatch('fetchRequest', {data : 12313})
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  #app {
    height: 100%;
  }
  .name{
    background: black;
    .tip{
      color: red;
    }
  }
</style>
