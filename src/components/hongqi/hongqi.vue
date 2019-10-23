<template>
    <div class="company_box">
        <Input v-model="value" placeholder="请输入检索报告..." style="width: 180px;margin-left:18px;" search/>
        <Button type="primary" style="margin-left:16px;" @click="searchWord">搜索</Button>
        <Menu :open-names="['1']" width="auto" accordion active-name="0-1" style="margin-top:22px;"> 
                    <div v-for="(data,index) in datas" :key="data.text">
                            <MenuItem :name="index+'-1'" v-if="!data.demonstrationArr[0].length && !data.show" class="itempar">
                                <div class="no_bk" @click="changeImg(data,index)"></div>
                                <!-- <img :src="data.img"> -->
                                {{data.name}}
                            </MenuItem>
                            <Submenu :name="'child-'+index" v-if="data.demonstrationArr[0].length && !data.show" :key="data.text" class="itempar">
                                <template slot="title">
                                    <!-- <Icon type="ios-people" /> -->
                                    {{data.name}}
                                </template>
                                <MenuItem v-for="(datachild,index) in data.demonstrationArr[0]" :key="datachild.displayName" :name="'child-'+index" class="childItem">
                                    <img :src="datachild.icon" style="float:left;margin-top:2px;margin-right:16px;">
                                     {{datachild.displayName}}
                                </MenuItem>
                            </Submenu>
                    </div>
        </Menu>
        </div>
</template>

<script>
import {getProductDemo} from "@/http/api"
export default {
  name: "seller",
  data() {
    return {
        id:this.$route.params.id,
        value:"",
        datas: [
        //   {
        //   "autoId": 1,
        //   text: '政务舆情分析',
        // //   img:"/static/images/yinyong/s_icon1_active.png",
        //   url:"/index/company",
        //    secondPerm: [
        //     {
        //         "autoId": 1,
        //         "name": "标题1",
        //         "url": "11",
        //         "icon": "/static/images/icon/pdf_icon.png",
        //         "secondPerm": null
        //     },
        //     {
        //         "autoId": 2,
        //         "name": "标题2",
        //         "url": "222",
        //         "icon": "/static/images/icon/pdf_icon.png",
        //         "secondPerm": null
        //     },
        //     {
        //         "autoId": 3,
        //         "name": "标题3",
        //         "url": "333",
        //         "icon": "/static/images/icon/pdf_icon.png",
        //         "secondPerm": null
        //     }
        // ]
        // }, {
        //   "autoId": 2,
        //   text: '城市形象品牌监测',
        // //   img:"/static/images/yinyong/s_icon2.png",
        //   url:"/index/wenhai",
        //   secondPerm: [
        //     {
        //         "autoId": 1,
        //         "name": "标题1",
        //         "url": "11",
        //         "icon": "/static/images/icon/pdf_icon.png",
        //         "secondPerm": null
        //     },
        //     {
        //         "autoId": 2,
        //         "name": "标题2",
        //         "url": "222",
        //         "icon": "/static/images/icon/pdf_icon.png",
        //         "secondPerm": null
        //     },
        //     {
        //         "autoId": 3,
        //         "name": "标题3",
        //         "url": "333",
        //         "icon": "/static/images/icon/pdf_icon.png",
        //         "secondPerm": null
        //     }
        // ]
        // }, {
        //   "autoId": 3,
        //   text: '影响力评估',
        // //    img:"/static/images/yinyong/s_icon3.png",
        //     url:"/index/qingtian",
        //      secondPerm: [
        //     {
        //         "autoId": 1,
        //         "name": "标题1",
        //         "url": "11",
        //         "icon": "/static/images/icon/pdf_icon.png",
        //         "secondPerm": null
        //     },
        //     {
        //         "autoId": 2,
        //         "name": "标题2",
        //         "url": "222",
        //         "icon": "/static/images/icon/pdf_icon.png",
        //         "secondPerm": null
        //     },
        //     {
        //         "autoId": 3,
        //         "name": "标题123456",
        //         "url": "333",
        //         "icon": "/static/images/icon/pdf_icon.png",
        //         "secondPerm": null
        //     }
        // ]
        // }, {
        //   "autoId": 4,
        //   text: '商务智能情报',
        //    url:"/index/hongqi"
        // }, {
        //   "autoId": 5,
        //   text: '一带一路特色服务',
        //    url:"/index/hongqi"
        // }
        ]
    };
  },
  methods :{
      searchWord( ) {
        let that = this;
        this.datas.forEach(function ( val , ind) {
           let  showItem  = null;
        //    val.secondPerm?val.secondPerm.find((value, index, arr) =>{
        //         if(value.name ===that.value){
        //            return  showItem = 1
        //         }
        //     }):""; 
            val.demonstrationArr[0].length?val.demonstrationArr[0].find((value, index, arr) =>{
                    if(value.name ===that.value){
                    return  showItem = 1
                    }
                }):""; 
            showItem ===1 ?val.show = 0:val.show = 1;
        })
      }
  },
  mounted(){
      //    univeral api to get second title data
    getProductDemo({'fid':this.id}).then(res => {
        this.datas  = res;    
    });
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.company_box{
    margin-top: 12px;
}
.itempar {
    font-size: 18px;
    color:#000;
    font-weight: 700;
    background: #f1f5ff;
    border:1px solid #b8b8b8;
    margin-top: -1px;
    margin-left: -1px;
}
.ivu-input-wrapper{
    border: 1px solid #dcdee2;
    border-radius: 4px;
}
.childItem {
    background: #fff;
    font-size:16px;
    color:#414141;
    border: 1px solid #e5e5e5;
    font-weight: 400;
}
// .ivu-menu {
//     
// }

</style>
