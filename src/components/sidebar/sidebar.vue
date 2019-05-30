<template>
  <div class="color-list">
   
     <Menu :open-names="['1']" width="auto" accordion active-name="0-1" > 
          <div v-for="(data,index) in datas" :key="data.text">
                  <MenuItem :name="index+'-1'" v-if="!data.secondPerm" :to="data.url">
                    <div class="no_bk" @click="changeImg(data,index)"></div>
                    <img :src="data.img">
                    {{data.text}}
                  </MenuItem>
                 <Submenu name="2" v-if="data.secondPerm" :key="data.text">
                      <template slot="title">
                          <Icon type="ios-people" />
                          {{data.text}}
                      </template>
                      <MenuItem v-for="(datachild,index) in data.secondPerm" :key="datachild.name" :name="'child-'+index" :to="datachild.url">{{datachild.name}}</MenuItem>
                </Submenu>
          </div>
                <!-- <MenuItem :name="index+'-1'" v-for="(data,index) in datas" v-if="!data.secondPerm" :key="data.text" :to="data.url"><Icon type="ios-stats"/>{{data.text}}</MenuItem>
                <Submenu name="2" v-for="data in datas" v-if="data.secondPerm" :key="data.text">
                    <template slot="title">
                        <Icon type="ios-people" />
                        {{data.text}}
                    </template>
                    <MenuItem v-for="(datachild,index) in data.secondPerm" :key="datachild.name" :name="'child-'+index" :to="datachild.url">{{datachild.name}}</MenuItem>
                </Submenu> -->
          </Menu>
         
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';

// import list from '../../../static/';
  export default {
    data () {
      return {
        theme2: 'light',
        datas: [
          {
          "autoId": 1,
          text: '产品物料',
          img:"/static/images/yinyong/s_icon1_active.png",
          url:"/index/company",
        }, {
          "autoId": 2,
          text: '产品演示地址',
          img:"/static/images/yinyong/s_icon2.png",
          url:"/index/wenhai",
        //   secondPerm: [
        //     {
        //         "autoId": 1,
        //         "name": "文字介绍",
        //         "url": "11",
        //         "icon": null,
        //         "secondPerm": null
        //     },
        //     {
        //         "autoId": 2,
        //         "name": "演示文稿",
        //         "url": "222",
        //         "icon": null,
        //         "secondPerm": null
        //     },
        //     {
        //         "autoId": 3,
        //         "name": "演示地址",
        //         "url": "333",
        //         "icon": null,
        //         "secondPerm": null
        //     }
        // ]
        }, {
          "autoId": 3,
          text: '应用案例',
           img:"/static/images/yinyong/s_icon3.png",
            url:"/index/qingtian"
        }, {
          "autoId": 4,
          text: '闻思报告',
          img:"/static/images/yinyong/s_icon4.png",
           url:"/index/hongqi"
        }, {
          "autoId": 5,
          text: '权限管理',
          img:"/static/images/yinyong/s_icon5.png",
           url:"/index/system"
        }
        ],
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
        window.localStorage.setItem("path",index)
        this.$store.dispatch('modifySName',newArr);
        this.$store.dispatch('modifyId',item.autoId);
        this.$router.push({ path:item.url})
      },
      changeImg ( data ,index) {
        var oldData = this.datas;
        oldData.forEach(function ( v , i ) {
          v.img = "/static/images/yinyong/s_icon"+(i+1)+".png"
        })
        oldData[index].img = '/static/images/yinyong/s_icon'+(index+1)+'_active.png';
        this.datas = oldData
      }
    },
    computed:{
      ...mapGetters(['resturantSidebar','resturantName']),
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
    padding-left: 42px;
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
    width: 300px;
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
