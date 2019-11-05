<template>
    <div class="company_box">
        <Spin fix v-if="notLoaded">加载中...</Spin>
        <div v-for="item in productArr"  :key="item.name" class="clearfix product">
            <div class="pro_msg">
                <img :src="item.relevantInfo">
                <span>{{item.name}}</span>
            </div>
            <Row :gutter="211" justify="space-around">
                <Col span="6" v-for="demonstration in item.demonstrationArr" :key="demonstration.titile"  style="float:left;/*margin-top:18px;*/">
                    <Button type="primary"  @click="dataType(item,demonstration)" :to="(demonstration.data.length&&demonstration.data[0].url)?'/index/demonstration':route">{{demonstration.titile}}</Button>
                </Col>   
            </Row>
            </div>
        </div>
    </div>
    
</template>

<script>

//import {mapActions, mapState,mapGetters} from 'vuex';
import {mapState} from 'vuex'

import { getProduct,getProductDemo } from '@/http/api'

export default {
  name: "seller",
  
  data() {
    return {
      id:this.$route.params.id,
      notLoaded:true,
      msgNum: 5,
      conHtml:'',
      productArr:[],
      demonstrationArr:[],
      route: ''
    };
  },
  
  methods:{
      linksis(){
          window.open("http://www.wengegroup.com/")
      },
      searchText() {
          let params = new Object();
          params.permId=this.$store.getters.resturanModifyId;
          params.contentIntroduce = this.conHtml;
        //   this.axios.post('http://localhost:8096/show/saveIntroduce',qs.stringify(params)).then(function (result) {
              
        //   })
      },
      dataType(item,demonstration){
          
          let obj = new Object();
          obj.namePar = item.name;
          obj.name = demonstration.titile;
          if(demonstration.titile=='视频资料'){
              obj.type = '2';
          }else{
              obj.type = '1';
          }
          
          obj.url = '';
          obj.filename = '';
          obj.filetype = ''
          if(demonstration.data){
              obj.url = demonstration.data[0].url;
              obj.fileName = demonstration.data[0].fileName;
              obj.fileType = demonstration.data[0].type;
            // obj.url = '';
          }
        //   if(obj.url){
        //       this.route = '/index/demonstration/'
        //   }
          let strObj = JSON.stringify(obj)
          localStorage.setItem('demonstration',strObj)
          this.$store.commit("commonDataType",obj);
      },
  },

  mounted () {
    //    univeral api to get second title data
    // getContentList({'fid':this.id}).then(res => {
    //     this.productArr  = res.obj;    
    //});
    //    getProduct().then(res => {
    //       this.productArr = res
    //   })
    let fid = this.$route.params.id;
    this.route = this.$route.path;
    
        getProductDemo({'fid':fid}).then(res =>{
            // this.productArr = res;
            var data = res;
            data.forEach(function(v,i){
                v.demonstrationArr = v.demonstrationArr.filter(function(o){
                    return (o.titile!='地址');
                })
            });
            this.notLoaded = false;
            this.productArr = data;
        });
  },
  created(){
    
    //  console.log(getProduct())
    //   this.axios({
    //         method: 'get',
    //         url:'/static/company.json',
    //     }).then(function(result){
    //         that.productArr = result.data
    //     })
    //   let that = this,id=this.$store.getters.resturanModifyId;
    //   this.axios({
    //       method: 'get',
    //       url:'http://localhost:8096/show/getIntroduce/'+id,
    //   }).then(function(result){
    //       that.conHtml = result.data.obj.contentIntroduce
    //   })
  },
  computed:{

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.spin-col{
    height: 100px;
    position: relative;
    margin-top: 100px;
    // background-color: #fff;
}
.company_box {
    width:1679px;
    margin: 12px;
    margin-top: 0px;
    position: relative;
}

.comMsg {
    background: #fff;
    padding:24px;
    margin-bottom: 20px;
}

.comMsg .imgText {
    text-align: center;
    color: #3aa2eb;
    font-size: 16px;
}

.product {
    // padding: 0 30px 30px 46px;
    padding: 0 30px 24px 46px;
    height: 128px;
    background: #fff;
    margin-bottom: 12px;
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.15);
}
.ivu-btn-primary {
    height:45px;
    margin-right:30px;
    // width:calc(100% - 100px);
    width:239px;
    background-color: #dcecff;
    border:0;
    color:#414141;
    line-height: 36px;
    font-size: 18px;
}
.pro_msg {
    // margin-bottom: 24px;
    // margin-bottom:12px;
    // height: 50px;
    height:58px;
    line-height: 60px;
}    
.pro_msg span {
    font-size: 18px;
    font-weight: 700;
}
.pro_msg img {
    float: left;
    // margin-top: 16px;
    margin-top: 20px;
    margin-right: 12px;
}
// .pro_msg img:first-child {
//     margin-top: 10px;
// }
.product:first-child .pro_msg img{
    margin-top: 10px;
}
</style>
