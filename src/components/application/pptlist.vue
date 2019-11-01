<template>
    <div class="container">
        <ul>
            <li class="item" v-for="item in applicationList" :key="item.displayName" @click="dataType(item)"> {{ item.displayName}}</li>
        </ul>
    </div>  
</template>

<script>
export default {
    data() {
        return {
            applicationList:[
                // {
                //     text:"PPT1",
                // },
                //  {
                //     text:"PPT2",
                // },
                //  {
                //     text:"PPT3",
                // },
                //  {
                //     text:"PPT4",
                // },
                //  {
                //     text:"PPT5",
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
            window.open("/wgproductbate/#/index/demonstration/","_self")
            
        }
        
    },
    mounted() {
        //  console.log(this.$store.state.dataType.name); 
        //  console.log(this.$store.state.dataType.namePar);
        // load ppt list api and just de-comment those codes below then api can be run well
        // let param = {
        //     'productType': this.$store.state.dataType.name,
        //     'productItem': this.$store.state.dataType.namePar,
        //     'fileType': 'ppt'
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
                    if(v.titile=="PPT"){
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
