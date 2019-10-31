<template>
    <div class="container">
        <ul>
            <li class="item" v-for="item in applicationList" :key="item.name" @click="dataType(item)"> {{ item.name}}</li>
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
        dataType(item){
            
            let url = item.url
            window.open(url,"_blank")
            
        }
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
           }
           .item:hover{
               background: #f1f6ff;
               color:#2fa9e8;
           }
       }
   }
</style>
