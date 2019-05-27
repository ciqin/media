<template>
    <div class="imgswt">
        <img :src="imgUrl" alt="" >
        <p>{{msg}}</p>
    </div>
</template>

<script>
// import { Button, Table } from "iview";
export default {
  props: {
    msg:{},
    imgUrl:{},
    width:{}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.imgswt {
    text-align: center;
}
.imgswt img {
    margin-bottom: 16px;
}

.imgswt p {
    text-align: center;
    color: #3aa2eb;
    font-size: 16px;

}
</style>
