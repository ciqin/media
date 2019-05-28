<template>
    <div class="company_box">
        <div v-for="item in productArr"  :key="item.name" class="clearfix product">
            <div class="pro_msg">
                <img :src="item.icon">
                <span>{{item.name}}</span>
            </div>
            <Row>
                <Col span="6" v-for="demonstration in item.demonstrationArr" :key="demonstration.namechild"  class="itemBtn" style="float:left;">
                    <Button type="primary"  @click="dataType(item,demonstration)" to="/ppt">{{demonstration.namechild}}</Button>
                </Col>   
            </Row>
            </div>
        </div>
    </div>
    
</template>

<script>

import {mapActions, mapState,mapGetters} from 'vuex';

import { getUserurl } from '@/http/api'

export default {
  name: "seller",
  data() {
    return {
      msgNum: 5,
      conHtml:'',
      productArr:[],
      demonstrationArr:[]
    };
  },
  methods:{
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
          obj.name = demonstration.namechild;
          obj.type = demonstration.type;
          obj.url = demonstration.url;
          this.$store.commit("commonDataType",obj);
      },
  },

  mounted () {
       getUserurl().then(res => {
          this.productArr = res
      })
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
      //...mapGetters(['resturanModifyId','resturanModifydataType']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.company_box {
    margin: 12px;
    margin-top: 0px;
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
    padding: 0 30px 30px 46px;
    background: #fff;
    margin-bottom: 12px;
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.15);
}
.ivu-btn-primary {
    height:45px;
    margin-right:30px;
    width:calc(100% - 100px);
    background-color: #dcecff;
    border:0;
    color:#414141;
    line-height: 36px;
    font-size: 18px;
}
.pro_msg {
    margin-bottom: 4px;
    height: 50px;
    line-height: 60px;
}    
.pro_msg span {
    font-size: 18px;
    font-weight: 700;
}
.pro_msg img {
    float: left;
    margin-right: 12px;
    width: 32px;
    margin-top: 12px;
}
.itemBtn {
    margin-top: 18px;
}
</style>
