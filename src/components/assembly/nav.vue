<template>
    <div class="nav clearfix">
        <ul class="clearfix">
            <li :class="{'active':navArr[index]}" v-for="(item,index)  in itemArr" :key="item" @click="clickActive(item,index)">
               {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
// import { Button, Table } from "iview";
import {mapActions, mapState,mapGetters} from 'vuex'
export default {
  name: "seller",
  props:{
    itemArr:'',
    itemhei:''
  },
  data() {
    return {
      navArr:[1,0,0]
    };
  },
 computed:{
     ...mapGetters([
        'resturantId'
    ])
  },
  watch: {
    resturantId: function(li) { //li就是改变后的wifiList值
      // this.getAllId(li); //调用别的函数
       if(li<=this.itemhei[0]) {
            this.navArr= [1,0,0]
          }else if(li<=this.itemhei[1]){
            this.navArr= [0,1,0]
          }else {
            this.navArr= [0,0,1]
          }
      
    }
  },
  methods:{
      clickActive ( item,index) {  
        var newArr = [];
        this.navArr.forEach(function ( v , i ) {
          if(index == i) {
              newArr.push(1)
          }else {
              newArr.push(0)
          }
        })
        this.navArr = newArr;
        if(this.itemhei) {
           document.querySelector(".main").scrollTop = this.itemhei[index]
        }
        //this.$router.push({ path:item.url})
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .nav {
      position: fixed;
      right: -61px;
      padding-right: 60px;
      z-index: 20;
      background: rgb(52, 66, 90,0);
    }
    .nav ul {
        float: right;
    }
    .nav ul li{
        padding: 4px 4px;
        width: 24px;
        font-size: 15px;
        margin: 0 12px;
        border: 1px solid #098be6;
        color:#098be6;
        border-radius: 4px;
        cursor: pointer;
    }

    .nav ul li:last-child {
        margin-right: 0px;
    }
    .nav ul li.active{
        background: #098be6;
        color: #fff;
    }
</style>
