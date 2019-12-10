<template>
  <div class="color-list">
     <Menu :open-names="['1']" width="auto" accordion active-name="0-1" > 
          <div v-for="(data,index) in datas" :key="data.name">
                  <MenuItem :name="index+'-1'" v-if="!data.secondPerm" :to="data.url+'/'+data.autoId">
                    <div class="no_bk" @click="changeImg(data,index)"></div>
                    <img :src="data.icon">
                    {{data.name}}
                  </MenuItem>
                 <Submenu name="2" v-if="data.secondPerm" :key="data.text">
                      <template slot="title">
                          <Icon type="ios-people" />
                          {{data.name}}
                      </template>
                      <MenuItem v-for="(datachild,index) in data.secondPerm" :key="datachild.name" :name="'child-'+index" :to="datachild.url">{{datachild.name}}</MenuItem>
                </Submenu>
          </div>
      </Menu>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import {getSiderBar} from '@/http/api'
// import list from '../../../static/';
  export default {
    data () {
      return {
        theme2: 'light',
        datas: [],
        className:0
      }
    },
    methods:{
      clickActive ( item,index) { 
        var newArr = [];
        this.resturantSidebar.forEach(function ( v , i ) {
          if(index == i) {
              newArr.push(1)
               
          }else {
              newArr.push(0)
          }
        })
        window.sessionStorage.setItem("path",index);
        this.$store.dispatch('modifySName',newArr);
        this.$store.dispatch('modifyId',item.autoId);
        this.$router.push({ path:item.url})
      },
      changeImg ( data ,index) {
        let oldData = this.datas;
        let navData =JSON.stringify(data)
        window.sessionStorage.setItem("nav",navData)
        oldData.forEach(function ( v , i ) {
          v.icon = "/wgproduct/images/yinyong/s_icon"+(i+1)+".png"
        })
        oldData[index].icon = '/wgproduct/images/yinyong/s_icon'+(index+1)+'_active.png';
        this.datas = oldData
      }
    },
    computed:{
      ...mapGetters(['resturantSidebar','resturantName']),
    },
    mounted() {
      let userId = sessionStorage.getItem('userId');
      if(userId){
        getSiderBar({'id':userId}).then(res => {
            this.datas = res.obj;
        });
      }
    }
  }
</script>

<style lang="less" scoped>
.ivu-menu-light {
  background: #f7f9ff;
}

.ivu-menu-light.ivu-menu-vertical {
  .ivu-menu-item-active:not(.ivu-menu-submenu) {
     background: #d9e7ff;
    color:#21a3e6;
  }
}
.ivu-menu-light.ivu-menu-vertical{
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
        left: 2px;
        width: 4px
  }
}

.ivu-menu-item {
  font-size: 18px;
  i{
     margin-right: 20px;
  }
}

.ivu-menu-vertical {
  .ivu-menu-item{
    padding-left: 40px;
      img{
        position: relative;
        top: 8px;
        margin-right: 12px;
      }
  }
}
.no_bk {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
}
.color-list {
  position: absolute;
    left: 0px;
    overflow: auto;
    top: 75px;
    background: #f7f9ff;
    padding-top: 30px;
    height: calc(100% - 75px);
    // width: 300px;
    width: 216px;
}

.color-list>div {
  display: block;
  width: 100%;
  height: 70px;
  line-height: 70px;
  font-size: 24px;
  cursor: pointer;
  color: #5c5c5c;
}
.color-list>div.active {
  background: #d9e7ff;
  color: #21a3e6;
}
.color-list>div img ,.color-list>div i{
  margin-left: 34px;
  margin-right: 15px;
}
</style>
