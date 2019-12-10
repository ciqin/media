<template>
    <div class="wrap" id="wrap">
        <div class="header">
            <img src="../../assets/images/login/logo.png" alt="">
            <span>闻歌演示分享云系统</span>
        </div>
        <div class="logGet">
            <div class="lofin-right">
                    <!-- 头部提示信息 -->
                <!-- <div class="logD logDtip">
                    <p class="p1">Hi，欢迎来到中科闻歌</p>
                </div> -->
                <!-- 输入框 -->
                <div class="lgD">
                    <!-- <img src="/static/images/loginIcon1.png" alt="" > -->
                    <input type="text" placeholder="请输入用户名" v-model="userName">
                    <!-- <Input v-model="username" placeholder="Enter something..." class="input" clearable style="width: 100%;padding-left:30px;" /> -->
                </div>
                <div class="lgD">
                     <!-- <img src="/static/images/loginIcon2.png" alt=""> -->
                     <input type="password" placeholder="请输入密码" v-model="password">
                </div>
                <div class="lgD" style="margin-bottom:20px;line-height:18px;">
                     <!-- <img src="/static/images/loginIcon2.png" alt=""> -->
                     <input style="width:62%;" @focus="tip=''" type="text" placeholder="请输入动态码" v-model="dynamicCode" @keyup.enter="login">
                     <button class="qscode" @click="getQscode">绑定帐号获得动态码</button>
                     <img style="position:absolute;left:480px;top:0px;" v-if="showQscode" src="@/assets/images/qscode.png">
                </div>
                <div class="lgD" style="margin-top:0;margin-bottom:20px;">
                    <a href="http://123.139.57.172:8008/gluster/yunfenxiangjiaocheng.pdf" target="_blank">绑定帐号的详细操作说明</a>
                    <span class="tip" v-if="tip">{{tip}}</span>
                </div>
                <div class="logC">
                    <a><button @click="login">登 录</button></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getLogin } from '@/http/api'



export default {
  name: "seller",
  data() {
    return {
      showQscode:false,
      userName:"",
      password:"",
      tip:"",
      dynamicCode:''
    };
  },
  methods: {
        getQscode(){
            this.showQscode = !this.showQscode;
        },
        login() {
　　　　　　  // 假设登陆成功，则跳转到 index 组件
            let param = new Object();
            param.username = this.userName;
            param.password = this.password;
            if(!this.dynamicCode){
                this.tip = "请输入动态码";
                return
            }
            param.code = this.dynamicCode;
            param.ContentType = true;
            
            this.taplogin(param)
        },
        async taplogin (param) {
            try {
                let res = await  getLogin(param);
                //  校验登陆是否正确
                // if(res ==="login") {
                // console.log(res.success);
                if(res.success) {
                    debugger;
                    let nickName = res.obj.personname;
                    let userId = res.obj.id;
                    this.$store.commit("commonLogin",res.msg);
                    this.$store.commit("commonUser",nickName);
                    sessionStorage.setItem("islogin","login");
                    sessionStorage.setItem('expire',1000*60*30)
                    sessionStorage.setItem('userId',userId);
                    sessionStorage.setItem('user',nickName); // 改成昵称
                    this.$router.push({path: '/index/company/1'});
                }else {
                    this.userName='';
                    this.password='';
                    this.tip=res.msg;
                }
            } catch (e) {

            }
        },
        
    },
     components:{

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .qscode{
        height:42px;
        border-radius:3px;
        background-color:#2fa9e8;
        color:#fff;
        box-shadow: none;
        border:1px solid #2fa9e8;
        padding:12px;
        font-size:14px;
        margin-left:11px;
    }
    .checkSuc{
        width:30px !important;
        height:30px !important;
        background-color:#00CD00;
        color:#fff;
        font-size:30px;
        font-weight: bolder;
        line-height: 26px;
        border-radius: 50%;
        border:none;
        padding:0;
        margin-bottom:4px;
        &:hover{
            background-color: #00CD00;
        }
    }
    .isActive{
        background-color: #ccc !important;
        color:#fff !important;
    }
    ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color:    #cdcecf;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #cdcecf;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #cdcecf;
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:    #cdcecf;
    }
    #wrap {
        height: 100%;
        width: 100%;
        position: relative;
        background: url("../../assets/images/login/bk.png");
        .logGet {
            height: 440px;
            width: 514px;
            position: absolute;
            top: 25%;
            left: 60%;
            border-radius: 20px;
            box-shadow: 0 0px 6px rgba(0,0,0,.15);
            background: #fff;
            .lofin-right {
                 margin-top: 90px;
            }
            .lgD {
                 width: 86%;
                position: relative;
                margin-bottom: 38px;
                margin-right: auto;
                margin-left: auto;
                img {
                    position: absolute;
                    top: 6px;
                    left: 8px;
                    color:#2a384d;
                    z-index: 2;
                }
                // .ivu-input-group{

                //     .ivu-input{
                //         height:42px;
                //     }
                // }
                div{
                    input{
                        height:42px;
                    }
                }
                input {
                     width: 100%;
                    height: 42px;
                    /* border-bottom: 1px solid #dddddd; */
                    text-indent: 1rem;
                    font-size: 14px;
                    color:#000;
                    border-radius: 4px;
                    border:1px solid #b8b8b8;
                    outline-style: none;
                }
            }
            .logC {
                 width: 86%;
                margin-top: 0px;
                margin-right: auto;
                margin-bottom: 0px;
                margin-left: auto;
                margin-top: 16px;
                a {
                    button {
                        width: 100%;
                        height: 52px;
                        line-height: 52px;
                        background-color: #2fa9e8;
                        border: none;
                        color: white;
                        font-size: 18px;
                        letter-spacing: 0.5rem;
                        border-radius:2px;
                    }
                }
            }
        }
        .logD.logDtip  {
            width: 86%;
            margin-bottom: 30px;
            margin-top: 0px;
            margin-right: auto;
            margin-left: auto;
            .p1 {
                display: inline-block;
                font-size: 28px;
                margin-top: 30px;
                width: 86%;
                text-decoration: none;
                color: #2a384d;
            }
        }
    }
    .tip {
        color:#ff6464;
        font-size: 12px;
        margin: 42px;
        

    }
    .header {
        color:#000;
        padding:40px 0 0 40px;
        span {
             position: relative;
            font-size: 36px;
            font-weight: 700;
            display: inline-block;
            top: -9px;
            color:#414141;
            margin-left: 16px;
        }
    }
    #head {
        height: 120px;
        width: 100;
        background-color: #66CCCC;
        text-align: center;
        position: relative;
    }
</style>
