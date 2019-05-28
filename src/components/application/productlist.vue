<template>
    <div class="container">
        <div class="product_ys">
            <p>标题</p>
            <iframe src="" frameborder="0"></iframe>
        </div>
    </div>  
</template>

<script>
export default {
    data() {
        return {
            applicationList:[
                {
                    text:"produt1",
                },
                 {
                    text:"product2",
                },
                 {
                    text:"product3",
                },
                 {
                    text:"product4",
                },
                 {
                    text:"product5",
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
   .container {
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
   }
</style>
