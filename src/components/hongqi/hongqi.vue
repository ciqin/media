<template>
    <div class="company_box">
        <Nav :itemArr='["文字介绍","演示文档","演示地址"]' :itemhei='[0,500,900]'></Nav>
        <div class="comMsg">
            <Title :title="'产品介绍'"></Title>
            <p>
               立足“新闻+政务+服务”的业务定位顶层设计为“物理空间、体制机制、业务平台”三层面的融合
            </p>
           <p>
               打造“一屏、五平台、N端” 的软件架构体系形成“策、采、编、播、发、管、控、馈”立体化内容生产体系实现“一次采集、多种生成、全媒传播”
            </p>
            <p>
               把握新闻传播信息可视化、移动优先化、活动直播化的新趋势建成形神兼备、软硬一体的融媒体平台建设解决方案。
            </p>
             <Row>
                <Col span="8">
                    <!-- <iframe src="/static/演示平台产品物料/01公司介绍/中科闻歌画册.pdf" frameborder="0" style="width:100%;height:360px;"></iframe>
                    <p class="imgText">宣传彩页下载</p> -->
                    <ImgMsg :msg="'宣传彩页下载'" :imgUrl="'./static/images/propaganda.jpg'"></ImgMsg>
                </Col>
                <Col span="8">
                    <ImgMsg :msg="'用户手册下载'" :imgUrl="'./static/images/user.jpg'"></ImgMsg>
                </Col>
                <Col span="8">
                    <ImgMsg :msg="'白皮书下载'" :imgUrl="'./static/images/book.jpg'"></ImgMsg>
                </Col>
            </Row>
        </div>
         <div class="comMsg" @mouseover="changeLoop($event)" @mouseout="removeLoop($event)">
             <Title :title="'演示文档'"></Title>
            <Carousel v-model="value3" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed"
                    :dots="setting.dots"
                    :trigger="setting.trigger" :arrow="setting.arrow" :loop="setting.loop">
                    <CarouselItem>
                        <div class="demo-carousel">
                            <iframe src="/static/演示平台产品物料/04红旗/闻歌县市级融媒体中心建设方案-20181022-已转档.pdf" frameborder="0" style="width:100%;height:600px;"></iframe>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div class="demo-carousel">
                            <iframe src="/static/演示平台产品物料/04红旗/融媒体平台介绍v7-20190308-已转档.pdf" frameborder="0" style="width:100%;height:600px;"></iframe>
                        </div>
                    </CarouselItem>
            </Carousel>
        </div>
        <div class="comMsg">
            <Title :title="'演示地址'"></Title>
            <Button type="primary" shape="circle" @click="linksis">查看系统</Button>
        </div>
    </div>
    
</template>

<script>
import Nav from "@/components/assembly/nav";
import Title from "@/components/assembly/title";
import ImgMsg from "@/components/assembly/imgmsg";
export default {
  name: "seller",
  data() {
    return {
      msgNum: 5,
      userName:"Marry",
      content1:"",
      content2:"",
      content3:"",
      value3: 0,
      setting:{
          autoplay: true,
          loop:true,
          arrow:'never',
          dots:'none'
      }
    };
  },
  methods :{
      changeLoop($event){
          this.$data.setting.autoplay = false
      },
      removeLoop($event){
          this.$data.setting.autoplay = true
      },
       linksis(){
          //window.open("http://www.wengegroup.com/")
      }
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
  components:{
      Nav,
      Title,
      ImgMsg
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

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
