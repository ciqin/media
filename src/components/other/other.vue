<template>
    <div class="company_box">
        <div class="comMsg">
            <Steps :current="9" direction="vertical">
                <Step title="已完成“闻海”" content=""></Step>
                <Step title="已完成“晴天”" content=""></Step>
                <Step title="已完成“红旗”" content=""></Step>
                <Step title="已完成“云际”" content=""></Step>
                <Step title="已完成“雅意”" content=""></Step>
                <Step title="已完成“闻思”" content=""></Step>
                <Step title="已完成“智图”" content=""></Step>
                <Step title="已完成“金准线”" content=""></Step>
                <Step title="已完成“天湖”" content=""></Step>
                <Step title="进行中" content=""></Step>
            </Steps>
        </div>
    </div>
    
</template>

<script>
// import Nav from "@/components/assembly/nav";
// import Title from "@/components/assembly/title";
// import ImgMsg from "@/components/assembly/imgmsg";
export default {
  name: "seller",
  data() {
    return {
      msgNum: 5,
      userName:"Marry",
      content1:"",
      content2:"",
      content3:""
    };
  },
//   created(){
//       var that = this;
//       this.axios({
//           method: 'get',
//           url:'/static/data.json',
//       }).then(function(result){
//           that._data.content1 = result.data[0].content1;
//           that._data.content2 = result.data[0].content2
//           that._data.content3 = result.data[0].content3
//       })
//   },
//   components:{
//       Nav,
//       Title,
//       ImgMsg
//   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.company_box {
    margin: 50px;
    margin-top: 0px;
}
.comMsg {
    background: #fff;
    padding:24px;
    margin-bottom: 20px;
}

.comMsg p {
    text-indent: 2em;
    font-size: 16px;
    color: #000;
    line-height: 36px;
    margin-bottom: 40px;
}
.comMsg .imgText {
    text-align: center;
    color: #3aa2eb;
    font-size: 16px;
}
</style>
