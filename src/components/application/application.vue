<template>
    <div style="height:100%;margin-top:-16px;">
        <Menu mode="horizontal" :active-name="activeName" >
            <div v-for="(application,index) in applicationList" :key="application.titile">
                <MenuItem :name="application.titile" @click.native="storeData(application.titile)" :to="application.url">
                    <img :src="application.icon" :alt="application.titile">
                    {{application.titile}}
                </MenuItem>
            </div>
        </Menu>
        <div style="height:calc(100% - 60px)">
            <router-view/>
        </div>
    </div>  
</template>

<script>
export default {
    data() {
        return {
            msgNum: 5,
            // dataType:'',
            activeName:'',
            applicationList:[
                {
                    titile:"PPT",
                    icon:"/static/images/icon/ppt_icon.png",
                    url:'/ppt'
                },
                 {
                    titile:"技术白皮书",
                    icon:"/static/images/icon/word_icon.png",
                     url:'/word'
                },
                 {
                    titile:"产品册",
                    icon:"/static/images/icon/user_icon.png",
                     url:'/prodect'
                },
                 {
                    titile:"视频资料",
                    icon:"/static/images/icon/video_icon.png",
                     url:'/video'
                },
                 {
                    titile:"地址",
                    icon:"/static/images/icon/url_icon.png",
                     url:'/useurl'
                }
            ]
        };
    },
    methods:{
        storeData(title){
            debugger;
            sessionStorage.setItem('activeName',title);
        }
    },
    mounted() {
        // let dataStr = localStorage.getItem('showData');
        // if(dataStr){
            
        //     let data = JSON.parse(dataStr);
        //     this.data
        // }
        let activeName = sessionStorage.getItem('activeName');
        if(activeName){
            this.activeName = activeName;
        }else{
            this.activeName = this.applicationList[0].titile;
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
   .product {
       height: 50px;
       background: #fff;
       line-height: 50px;
       border-bottom: 1px solid #dddddd;
       margin-top: -16px;
       .line {
            display: inline-block;
            width: 1px;
            background: #dddddd;
            height: 25px;
            position: relative;
            top: 10px;
            margin: 0 10px;
       }
       span:nth-child(3){
           font-size: 18px;
           color:#5c5c5c;
       }
       span:nth-child(5){
           font-size: 18px;
           color:#5c5c5c;
       }
   }
   .product_ys {
       height: 100%;
        padding: 0 16px 16px 16px;
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
</style>
