<template>
    <div style="height:100%;margin-top:-16px;">
        <Menu mode="horizontal" active-name="active0" >
            <div v-for="(application,index) in applicationList" :key="application.text">
                <MenuItem :name="'active'+index" :to="application.url">
                    <img :src="application.icon" :alt="application.text">
                    {{application.text}}
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
            dataType:'',
            applicationList:[
                {
                    text:"PPT",
                    icon:"/static/images/icon/ppt_icon.png",
                    url:'/ppt'
                },
                 {
                    text:"word",
                    icon:"/static/images/icon/ppt_icon.png",
                     url:'/word'
                },
                 {
                    text:"产品册",
                    icon:"/static/images/icon/ppt_icon.png",
                     url:'/prodect'
                },
                 {
                    text:"视频",
                    icon:"/static/images/icon/ppt_icon.png",
                     url:'/video'
                },
                 {
                    text:"地址",
                    icon:"/static/images/icon/ppt_icon.png",
                     url:'/useurl'
                }
            ]
        };
    },
    methods:{
        
    },
    mounted() {
     
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
