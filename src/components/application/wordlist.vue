<template>
    <div class="container">
         <ul v-if="applicationList.length>0">
            <li class="item" v-for="item in applicationList" :key="item.displayName" @click="dataType(item)"> {{ item.displayName}}</li>
        </ul>
        <Nodata v-else></Nodata>
    </div>  
</template>

<script>
import Nodata from "@/components/fittings/nodata"
export default {
    data() {
        return {
            applicationList:[
                // {
                //     text:"word1",
                // },
                //  {
                //     text:"word2",
                // },
                //  {
                //     text:"word3",
                // },
                //  {
                //     text:"word4",
                // },
                //  {
                //     text:"word5",
                // }
            ]
        };
    },
    methods:{
        dataType(item){
            
            let dataType = this.$store.state.dataType;
            let dataStr = localStorage.getItem("demonstration");
            if(dataStr){
                let data = JSON.parse(dataStr);
                data.type = '1';
                data.url = item.url;
                data.fileName = item.fileName;
                data.fileType = item.type;
                dataStr = JSON.stringify(data);
                localStorage.setItem("demonstration",dataStr)
            }

            if(dataType){
                dataType.url = item.url;
                dataType.type = '1';
                this.$store.commit("commonDataType",dataType);
            }
            window.open("/wgproduct/#/index/demonstration/","_self")
            
        }
    },
    mounted() {
     // let param = {
        //     'productType': this.$store.state.dataType.name,
        //     'productItem': this.$store.state.dataType.namePar,
        //     'fileType': 'word'
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
                    if(v.titile=="技术白皮书"){
                        return v;
                    }
                });
                if(fileList.length&&fileList[0].data&&fileList[0].data.length){
                    this.applicationList = fileList[0].data;
                }
            }
        }

    },
    components:{Nodata}
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
