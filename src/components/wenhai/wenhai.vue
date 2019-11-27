<template>
    <div class="company_box">
        <Spin fix class="spin-col"  v-if="notLoaded">
            <Icon type="ios-refresh" size='27' class="demo-spin-icon-load"></Icon>
            <div style="font-size:24px;">加载中...</div>
        </Spin>
         <Row type="flex">
            <Col span="12" order="4" v-for="item in sisurlArr" :key="item.name">
                <div class="address_box">
                    <img :src="item.relevantInfo">
                    <!-- <a :href="item.url" target="_blank"><span>{{item.name}}</span></a> -->
                    <a :href="item.url" target="_blank"><span>{{item.name}}</span></a>
                    <div class="langchange" v-if="item.children">
                        
                            <a  v-for="cItem in item.children" :href="cItem.url" :key="cItem.name" target="_blank">
                            {{cItem.name}}
                            </a>
                        
                    </div>
                    <!-- <div class="login-info">
                        <span><strong>用户名：</strong></span><span>1234</span><br>
                        <span><strong>密码：</strong></span><span>1234</span>
                    </div>   -->
                    <div class="login-info">
                        <div class="login-item"><div class="label-name">用户名：</div><input disabled :value="item.logName" /></div>
                        <div class="login-item"><div class="label-name">密&nbsp;&nbsp;&nbsp;&nbsp;码：</div><input disabled :value="item.logPassword" /></div>
                    </div>

                </div>
            </Col>
        </Row>
    </div>
    
</template>

<script>
import { getSisurl,getProductDemo } from "@/http/api";
// import qs from 'qs';
export default {
  name: "seller",
  data() {
    return {
        notLoaded:true,
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
    // let param = qs.stringify({'fid':fid});
    let param = {'fid':fid};
    getProductDemo(param).then(res => {
        let data = res;
        data = data.filter(function(o){
            if(o.url){
                return o;
            }
        })
        // this.sisurlArr  = res;
        this.sisurlArr = data;
        this.notLoaded = false;    
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
        position: relative;
    }
    .spin-col{
    height: 100px;
    position: relative;
    margin-top: 100px;
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
        .form{
            width:80%;
            margin-top:0;
            float:right;
            height: 100px;
        }
        .login-info{
                float:right;
                font-size:12px;
                text-align: left;
                
                margin: 2px 2px 2px 5px;
                .login-item{
                    height: 40px;
                    // display: inline-block;
                    .label-name{
                        width:80px;
                        display: inline-block;
                        text-align: right;
                    }
                    input{
                        border-color:#ccc;
                        border-radius: 4px;
                        padding: 2px;
                        border:none;
                        display: inline-block;
                        background-color: #f3f3f3;
                        // background-color: #fff;
                    }
                }
       
            }
            
    }
    .langchange {
                position:absolute;
                left: 94px;
                top:66px;
                a {
                    font-size: 16px;
                    // font-size:14px;
                    color:#747474;
                    border-right: 1px solid #c5c5c5;
                    padding:0 12px;
                }
    }
    .ivu-row-flex>div:nth-child(2n){
    // .ivu-row-flex>div{
        .address_box {
            width: 100%;
            position: relative;
            .langchange {
                position:absolute;
                left: 94px;
                top:66px;
                a {
                    font-size: 16px;
                    // font-size:14px;
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
    // .langchange{
    //     height: 24px;
    //     width:100%;
    // }
    
</style>
