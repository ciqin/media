<template>
    <div class="container">
         <Row>
            <Col span="19">
                <div class="product_ys">
                    <p>{{title}}</p>
                    <video :src="changeurl" v-if="showVideo" controls="controls"></video>
                </div>
            </Col>
            <Col span="5" style="border-left:1px solid #dddddd;height:100%;">
                <div class="videoList">
                    <h3>视频列表</h3>
                    <div class="item" :class="item.isActive?'active':''" v-for="item in applicationList" :key="item.displayName" @click="changeUrl(item)">{{item.displayName}}</div>
                </div>
            </Col>
        </Row>
    </div>  
</template>

<script>
export default {
    data() {
        return {
            changeurl:"",
            title:'',
            showVideo:true,
            applicationList:[
                // {
                //     text:"video1",
                //     url:"/static/images/yansi/video/YL.mp4"
                // },
                //  {
                //     text:"video2",
                //     url:""
                // },
                //  {
                //     text:"video3",
                //     url:"/static/images/yansi/video/YL.mp4"
                // },
                //  {
                //     text:"video4",
                //     url:"/static/images/yansi/video/YL.mp4"
                // },
                //  {
                //     text:"video5",
                //     url:"/static/images/yansi/video/YL.mp4"
                // }
            ]
        };
    },
    methods:{
        changeUrl(item) {
           this.changeurl = item.url;
           this.titile = item.displayName;
           item.isActive = 1;
        }
    },
    mounted() {
     // let param = {
        //     'productType': this.$store.state.dataType.name,
        //     'productItem': this.$store.state.dataType.namePar,
        //     'fileType': 'video'
        // };
        // getPPTList(param).then(res => {
        //     this.applicationList =  res;
        // });

        let dataStr = localStorage.getItem('showData');
        let dataStr2 = localStorage.getItem('demonstration');
        if(dataStr2){
            let data2 = JSON.parse(dataStr2);
            this.title = data2.namePar;
            this.title = this.title+data2.name;
        }
        if(dataStr){
            let data = JSON.parse(dataStr);
            let fileList = data.demonstrationArr;
            if(fileList&&fileList.length){
                fileList = fileList.filter(function(v){
                    if(v.titile=="视频资料"){
                        return v;
                    }
                });
                if(fileList.length&&fileList[0].data&&fileList[0].data.length){
                    
                    this.applicationList = fileList[0].data;
                    this.applicationList = this.applicationList.map(function(v){
                        v.isActive = 0;
                        return v;
                    });
                    this.applicationList[0].isActive = 1;
                    this.changeurl = this.applicationList[0].url;
                    this.showVideo = true;
                }else{
                    this.showVideo = false;
                }
            }else{
                this.showVideo = false;
            }
        }else{
            this.showVideo = false;
        }
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
                     padding:3px;
                }
                .active{
                    color:#2d8cf0;
                    background-color: #F1F6FF;
                }
            }
       }
       
   }
</style>
