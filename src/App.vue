<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {getPerm} from './http/api'
  document.title = '闻歌演示分享云系统';
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
