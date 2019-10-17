<template>
    <div class="container">
        <ul>
            <li class="item" v-for="item in applicationList" :key="item.text"> {{ item.text}}</li>
        </ul>
    </div>  
</template>

<script>
export default {
    data() {
        return {
            applicationList:[
                {
                    text:"word1",
                },
                 {
                    text:"word2",
                },
                 {
                    text:"word3",
                },
                 {
                    text:"word4",
                },
                 {
                    text:"word5",
                }
            ]
        };
    },
    methods:{
        
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
