<template>
  <div class="header">
    <div class="logo">
      <img data-v-dd7a443a src="../../assets/images/login/logo.png" style="width:76px;">
      <span>闻歌演示分享云系统</span>
    </div>
    <ul class="nav navbar-nav navbar-right clearfix">
      <li class="user_box">
        <Dropdown trigger="click">
          <a href="javascript:void(0)">
            <span class="m10" style="color:#383838;font-size:14px;">
              Hi,
              <font>{{userName}}</font>
            </span>
          </a>
        </Dropdown>
        <img class="m10" src="../../assets/images/user.png" style="width:36px;position: relative;top: 15px;">
      </li>
    
      <li>
        <a href="javascript:" target style="margin-right:30px;">
          <Icon type="ios-power-outline" :color="'#f65959'" :size="28" @click="showModal"/>
        </a>
          
      </li>
    </ul>
     <Modal
        v-model="modal5"
        title=""
        width="250" @on-ok="SignOut">
        <p>确定退出吗？</p>
    </Modal>
  </div>
</template>

<script>
import { Dropdown, Icon } from "iview";
export default {
  name: "seller",
  data() {
    return {
      // userName: "Marry",
      userName: '',
      modal5:false
    };
  },
  methods: {
    SignOut() {
      // 筛选状态
      sessionStorage.setItem("islogin","")
      this.$router.replace("/")
      sessionStorage.removeItem("expire")
      sessionStorage.clear()
    },
    showModal(){
      this.modal5 = true;
    }
  },
  mounted(){
    // this.userName = this.$store.state.user;
    this.userName = sessionStorage.getItem("user");
    let expire = sessionStorage.getItem('expire');
    if(expire){
      setTimeout(()=>{
        this.SignOut();
      },expire)
    }else{
      this.SignOut();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/* @import '../../assets/fonts/iconfont.css'; */

.header {
  height: 75px;
  width: 100%;
  top: 0px;
  background: #e9e9e9;
  .logo > span{
    position: relative;
    font-size: 24px;
    font-weight: 700;
    display: inline-block;
    top: -7px;
    color: #414141;
    margin-left: 16px;
  }
  .logo {
    float: left;
    padding: 7px 40px;
  }
}

.navbar-right {
  float: right;
}

.nav > li {
  position: relative;
  display: block;
  float: left;
}

.navbar-nav > li > a {
  padding: 0 20px;
  line-height: 75px;
  position: relative;
  display: block;
}

.navbar-nav > li > a .num {
  position: absolute;
  right: 15px;
  width: 12px;
  height: 12px;
  line-height: 12px;
  top: 24px;
  text-align: center;
  background: red;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
}
.iconfont {
  color: #b7c6de;
}

.user_box {
  display: inline-block;
  line-height: 75px;
}
.m10 {
  margin-left: 10px;
}

.down {
  height: 5px;
  width: 16px;
  display: inline-block;
  background: url("../../assets/img/down.png") no-repeat;
}
</style>
