<style scoped>
    .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
<template>
    <div>
        <Headers></Headers>
        <Sidebar></Sidebar> 
        <div class="main">
            <router-view/>
        </div>
    </div>
</template>
<script>
    import Head from '@/components/header/header'
    import Sidebar from '@/components/sidebar/sidebar'
    export default {
        components:{
            Headers:Head,
            Sidebar
        }
    }
</script>

<style lang="less">
.main {
  width: calc(100% - 300px);
  margin-left: 300px;
   height: calc(100vh - 75px);
  color: #000;
  background: #f5f5f5;
  overflow: auto;
  padding-top: 16px;
}
</style>
