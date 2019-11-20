<template>
    <div class="container">
        <ul>
            <li class="item" v-for="item in applicationList" :key="item.name"> 
                <a :href="item.url" target="_blank">{{ item.name}}</a>
            <div class="login-info">
                        <div class="login-item"><div class="label-name">用户名：</div><input disabled :value="item.logName" /></div>
                        <div class="login-item"><div class="label-name">密&nbsp;&nbsp;&nbsp;&nbsp;码：</div><input disabled :value="item.logPassword" /></div>
            </div>
            </li>
        </ul>
    </div>  
</template>

<script>
export default {
    data() {
        return {
            applicationList:[
                // {
                //     text:"url1",
                // },
                //  {
                //     text:"url2",
                // },
                //  {
                //     text:"url3",
                // },
                //  {
                //     text:"url4",
                // },
                //  {
                //     text:"url5",
                // }
            ]
        };
    },
    methods:{
        // dataType(item){
            
        //     let url = item.url
        //     window.open(url,"_blank")
            
        // }
    },
    mounted() {
     // let param = {
        //     'productType': this.$store.state.dataType.name,
        //     'productItem': this.$store.state.dataType.namePar,
        //     'fileType': 'url'
        // }
        // getPPTList(param).then(res => {
        //     this.applicationList =  res;
        // })
        let dataStr = localStorage.getItem('showData');
        
        if(dataStr){
            let data = JSON.parse(dataStr);
            let fileList = data.demonstrationArr;
            if(fileList&&fileList.length){
                fileList = fileList.filter(function(v){
                    if(v.titile=="地址"){
                        return v;
                    }
                });
                if(fileList.length&&fileList[0].data&&fileList[0].data.length){
                    this.applicationList = fileList[0].data;
                }
            }
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
   .container {
       ul {
           margin-top:24px;
           .item {
               height: 50px;
               line-height: 50px;
               border-top:1px solid #d1d1d1;
               border-bottom:1px solid #d1d1d1;
               margin-top: -1px;
               font-size: 14px;
               color:#5b5b5b;
               background: #fff;
               padding-left: 28px;
               a{
                   text-decoration: underline;
                   cursor: pointer;
               }
           }
           .item:hover{
               background: #f1f6ff;
               color:#2fa9e8;
           }
       }
   }
.login-info{
                // float:right;
                display: inline-block;
                font-size:12px;
                text-align: left;
                
                margin: 2px 2px 2px 5px;
                .login-item{
                    height: 40px;
                    display: inline-block;
                    .label-name{
                        width:80px;
                        display: inline-block;
                        text-align: right;
                    }
                    input{
                        border-color:#ccc;
                        border-radius: 4px;
                        padding: 2px;
                        height:30px;
                        border:none;
                        display: inline-block;
                        background-color: #f3f3f3;
                        // background-color: #fff;
                    }
                }
       
            }
</style>
