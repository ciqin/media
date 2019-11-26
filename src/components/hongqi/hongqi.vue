<template>
    <div class="company_box">
        
        <Input v-model="value" placeholder="请输入检索报告..." style="width: 180px;margin-left:18px;" search/>
        <Button type="primary" style="margin-left:16px;" @click="searchWord">搜索</Button>
        <Row v-if="notLoaded">
            <Col span="24" class="spin-fix">
                <Spin fix class="spin-col">
                    <Icon type="ios-refresh" size='27' class="demo-spin-icon-load"></Icon>
                    <div style="font-size:24px;">加载中...</div>
                </Spin>
            </Col>
        </Row>
        <Menu :open-names="['1']" width="auto" accordion active-name="0-1" style="margin-top:22px;"> 
                    <div v-for="(data,index) in datas" :key="data.text">
                            <MenuItem :name="index+'-1'" v-if="!data.demonstrationArr[0].length && !data.show" class="itempar">
                                <div class="no_bk" @click="changeImg(data,index)"></div>
                                <!-- <img src="/static/images/icon/pdf_icon.png"> -->
                                {{data.name}}
                            </MenuItem>
                            <Submenu :name="'child-'+index" v-if="data.demonstrationArr[0].length && !data.show" :key="data.text" class="itempar">
                                <template slot="title">
                                    <!-- <Icon type="ios-people" /> -->
                                    {{data.name}}
                                </template>
                                <MenuItem v-for="(datachild,index) in data.demonstrationArr[0].data" :key="datachild.displayName" :name="'child-'+index" class="childItem" @click.native="dataType(data,datachild)" >
                                    <img src="/wgproduct/images/icon/pdf_icon.png" style="float:left;margin-top:2px;margin-right:16px;">
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
        notLoaded:true,
        tempData:null,
        route:this.$route.path,
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
        this.datas = this.datas.filter(function(o){
            if(o.demonstrationArr[0].length){
                let index = _.findIndex(o.demonstrationArr[0],(o2)=>{
                    let value = that.value;
                    var p = new RegExp('\\w*'+value+'\\w*')
                    return (p.test(o2.displayName))
                })
            
                if(index!=-1){
                    return true
                }else{
                    return false
                }
            }else{ return false}
        })
        
        // this.datas.forEach(function ( val , ind) {
        //    let  showItem  = null;
        // //    val.secondPerm?val.secondPerm.find((value, index, arr) =>{
        // //         if(value.name ===that.value){
        // //            return  showItem = 1
        // //         }
        // //     }):""; 
        //     val.demonstrationArr[0].length?val.demonstrationArr[0].find((value, index, arr) =>{
        //             if(value.displayName ===that.value){
        //             return  showItem = 1
        //             }
        //         }):""; 
        //     showItem ===1 ?val.show = 0:val.show = 1;
        // })
      },
      dataType(item,demonstration){
          let obj = new Object();
          obj.namePar = item.name;
          obj.name = demonstration.displayName;
          obj.type = '1'
          obj.fileType = demonstration.type;
          obj.fileName = demonstration.fileName;
          obj.url = demonstration.url;
         
        //   if(demonstration.url){
        //       obj.url = demonstration.url;
        //     // obj.url = '';
        //   }
        //   if(obj.url){
        //       this.route = '/index/demonstration/'
        //   }
          let strObj = JSON.stringify(obj)
          localStorage.setItem('demonstration',strObj)
          this.$store.commit("commonDataType",obj);
           if(obj.url){
              window.open('/wgproduct/#/index/demonstration/','_self');

          }else{
              window.open(route,'_self');
          }
      },
  },
  mounted(){
      //    univeral api to get second title data
    getProductDemo({'fid':this.id}).then(res => {
        this.datas  = res;
        this.tempData = this.datas; 
        this.notLoaded = false;   
    });
  },
  watch:{
      value(newVal){
          if(!newVal){
              this.datas = this.tempData;
          }
      }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.company_box{
    margin-top: 12px;
}
.spin-fix{
    position: relative;
    height: 100px;
    background-color: #f5f5f5;

}

.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    // from { color:#fff}
    // 50%  { color:#3aa2eb}
    // to   { color:#2d8cf0;}
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
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
