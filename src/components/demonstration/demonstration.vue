<template>
    <div style="height:100%;">
        <div class="product">
            <Icon :size="25" :color="'#959595'"  style="margin-left: 14px;font-weight: 700;" type="ios-arrow-back" @click="goBack"/>
            <div class="line"></div>
            <span>{{dataType.namePar}}</span>
            <Icon type="ios-arrow-forward" :size="18" :color="'#b8b8b8'" style="margin-top: .4px;"/>
            <span>{{dataType.name}}</span>
            <Button :size="buttonSize" icon="ios-download-outline" type="primary" class="download-btn" @click="download()">下载原文件</Button>
        </div>
        <div class="product_ys">
            <p>{{dataType.namePar}}{{dataType.name}}</p>
            <iframe :src="dataType.url" v-if="dataType.type==1" frameborder="0"></iframe>
            <video :src="dataType.url" v-if="dataType.type==2" controls="controls"></video>
        </div>
    </div>  
</template>

<script>
import {getDownloadLink} from '@/http/api'
export default {
    data() {
        return {
            msgNum: 5,
            dataType:'',
            downloadUrl:''
        };
    },
    methods:{
        goBack(){
            this.$router.back(-1)
        },
        download(){
            let url = this.downloadUrl;
            if(url){
                window.open(url);
            }else{
                this.$message("请稍后下载")
            }
        }
    },
    mounted() {
        
        this.dataType = this.$store.state.dataType;
        // if(!this.dataType){
            let strObj = localStorage.getItem("demonstration");
            if(strObj){
                this.dataType = JSON.parse(strObj);
                // let dataType = this.dataType;
                let param = {};
                param.name = this.dataType.fileName;
                param.type = this.dataType.fileType;
                console.log(param)
                getDownloadLink(param).then(res=>{
                    if(res){
                        this.downloadUrl = res;
                    }
                })
            }

        // }
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
       position: relative;
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
       .download-btn{
           position: absolute;
           top:10px;
           right: 20px;
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
