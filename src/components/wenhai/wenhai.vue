<template>
    <div class="company_box">
         <Row type="flex">
            <Col span="12" order="4" v-for="item in sisurlArr" :key="item.name">
                <div class="address_box">
                    <img :src="item.relevantInfo">
                    <!-- <a :href="item.url" target="_blank"><span>{{item.name}}</span></a> -->
                    <a :href="item.url" target="_blank"><span>{{item.name}}</span></a>
                    <div class="langchange" v-if="item.children">
                        <a v-for="cItem in item.children" :href="cItem.url" :key="cItem.name" target="_blank">
                           {{cItem.name}}
                        </a>
                    </div>  
                </div>
            </Col>
        </Row>
    </div>
    
</template>

<script>
import { getSisurl,getContentList } from "@/http/api";
import qs from 'qs';
export default {
  name: "seller",
  data() {
    return {
        id:this.$route.params.id,
        sisurlArr:''
    };
  },
   methods:{
      linksis(){
          window.open("http://wxservice.wengetech.com/wenhaiFt/login.html")
      }
  },
  mounted () {
      //    univeral api to get second title data
    let fid = parseInt(this.id);
    let param = qs.stringify({'fid':fid});
    getContentList(param).then(res => {
        this.sisurlArr  = res.obj;    
    });
    //    getSisurl().then(res => {
    //       this.sisurlArr = res
    //   })
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .company_box {
        margin: 12px;
        margin-top: 0px;
    }
    .address_box {
        width: calc(100% - 12px);
        height: 100px;
        background: #fff;
        margin-bottom: 12px;
        border-radius: 2px;
        box-shadow: 0 0px 6px rgba(0, 0, 0, 0.15);
        padding: 30px 0 0 50px;
        
        img{
            float:left;
            margin-top: 1px;
            margin-right: 20px;
        }
        a {
            color:#414141;
             span {
                font-size: 24px;
                font-weight: 700;
                cursor: pointer;
            }
        }
       
    }
    .ivu-row-flex>div:nth-child(2n){
        .address_box {
            width: 100%;
            position: relative;
            .langchange {
                position:absolute;
                left: 94px;
                top:66px;
                a {
                    font-size: 16px;
                    color:#747474;
                    border-right: 1px solid #c5c5c5;
                    padding:0 12px;
                }
                a:last-child{
                    border-right: 0;
                }
            }
        }
    }
</style>
