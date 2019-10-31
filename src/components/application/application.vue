<template>
    <div style="height:100%;margin-top:-16px;">
        
        <Menu mode="horizontal" :active-name="activeName" >
            <Icon :size="25" :color="'#959595'"  style="margin-left: 14px;font-weight: 700;display:inline-block;margin-bottom:50px;" type="ios-arrow-back" @click="goBack"/>
            <div class="line"></div>
            <div v-for="(application,index) in applicationList" :key="application.titile" style="display:inline-block;overflow:hidden;">
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
            // p:this.$route.path,
            // dataType:'',
            activeName:'',
        
            applicationList:[
                {
                    titile:"PPT",
                    // icon:"/static/images/icon/ppt_icon.png",
                    icon:"/wgproduct/images/icon/ppt_icon.png",
                    url:'/ppt'
                },
                 {
                    titile:"技术白皮书",
                    // icon:"/static/images/icon/word_icon.png",
                    icon:"/wgproduct/images/icon/word_icon.png",
                     url:'/word'
                },
                 {
                    titile:"产品册",
                    // icon:"/static/images/icon/user_icon.png",
                    icon:"/wgproduct/images/icon/user_icon.png",
                     url:'/prodect'
                },
                 {
                    titile:"视频资料",
                    icon:"/wgproduct/images/icon/video_icon.png",
                    // icon:"/static/images/icon/video_icon.png",
                     url:'/video'
                },
                 {
                    titile:"地址",
                    // icon:"/static/images/icon/url_icon.png",
                    icon:"/wgproduct/images/icon/url_icon.png",
                     url:'/useurl'
                }
            ]
        };
    },
    methods:{
        storeData(title){
            // debugger;
            sessionStorage.setItem('activeName',title);
        },
        goBack(){
            this.$router.back(-1)
        },
    },
    computed:{
        url2Name(){
            let path = this.$route.path;
            let name;
            switch(path){
                case '/ppt':
                    name = 'PPT';
                    break;
                case '/word':
                    name = '技术白皮书';
                    break;
                case '/prodect':
                    name = '产品册';
                    break;
                case '/video':
                    name = '视频资料';
                    break;
                case '/useurl':
                    name = '地址';
                    break;
            }
            return name;
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
    watch:{
        // url2Name(newVal){
        //     sessionStorage.setItem('activeName',newVal);
        // }
        $route(to,from){
            let path = to.path;
            console.log(path)
            let name;
            switch(path){
                case '/ppt':
                    name = 'PPT';
                    break;
                case '/word':
                    name = '技术白皮书';
                    break;
                case '/prodect':
                    name = '产品册';
                    break;
                case '/video':
                    name = '视频资料';
                    break;
                case '/useurl':
                    name = '地址';
                    break;
            }
            sessionStorage.setItem('activeName',name);
            
            let activeName = sessionStorage.getItem('activeName');
            if(activeName){
                this.activeName = activeName;
            }else{
                this.activeName = this.applicationList[0].titile;
            }

        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .ivu-table th {
        text-align: center;
    }
    .line {
            display: inline-block;
            width: 1px;
            background: #dddddd;
            height: 25px;
            position: relative;
            top: 0px;
            margin-bottom: 15px;
    }
   .product {
       height: 50px;
       background: #fff;
       line-height: 50px;
       border-bottom: 1px solid #dddddd;
       margin-top: -16px;
       
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
