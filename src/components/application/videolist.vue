<template>
    <div class="container">
         <Row>
            <Col span="19">
                <div class="product_ys">
                    <p>标题</p>
                    <video :src="changeurl" controls="controls"></video>
                </div>
            </Col>
            <Col span="5" style="border-left:1px solid #dddddd;height:100%;">
                <div class="videoList">
                    <h3>视频列表</h3>
                    <div class="item"  v-for="item in applicationList" :key="item.text" @click="changeUrl(item)">{{item.text}}</div>
                </div>
            </Col>
        </Row>
    </div>  
</template>

<script>
export default {
    data() {
        return {
            changeurl:"/static/images/yansi/video/YL.mp4",
            applicationList:[
                {
                    text:"video1",
                    url:"/static/images/yansi/video/YL.mp4"
                },
                 {
                    text:"video2",
                    url:""
                },
                 {
                    text:"video3",
                    url:"/static/images/yansi/video/YL.mp4"
                },
                 {
                    text:"video4",
                    url:"/static/images/yansi/video/YL.mp4"
                },
                 {
                    text:"video5",
                    url:"/static/images/yansi/video/YL.mp4"
                }
            ]
        };
    },
    methods:{
        changeUrl(item) {
           this.changeurl = item.url
        }
    },
    mounted() {
     
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
   .container {
       height: 100%;
       .product_ys {
            height: 100%;
            padding: 0 16px 16px 16px;
            margin-top: 3px;
            p{
                font-size: 24px;
                font-weight:700;
                height: 60px;
                color:#5c5c5c;
                line-height: 60px;
            }
            iframe,video{
                width: 100%;
                height: calc(100% - 94px);
            }
        }
       .ivu-row {
           height: 100%;
           .videoList {
               margin-left: 24px;
               margin-top: 20px;
               h3 {
                   font-size: 18px;
                   font-weight: 700;
                   color:#5c5c5c;
                   margin-bottom: 10px;
               }
                .item {
                    margin-top: 25px;
                    font-size: 16px;
                     color:#5c5c5c;
                     cursor: pointer;
                }
            }
       }
       
   }
</style>
