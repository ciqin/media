<template>
    <div class="title">
        <h3>
            {{title}}      
        </h3>
    </div>
</template>

<script>
// import { Button, Table } from "iview";
export default {
  props:{
    title:{
		// type:Number,
		// default:0
	},
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
    margin-bottom: 20px;
}
.title h3 {
    border-left: 6px solid #3aa2eb;
    padding-left: 16px;
    color: #3aa2eb;
    font-size: 16px;
}

</style>
