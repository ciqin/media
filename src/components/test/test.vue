<template>

<div class="content">
    <h1>闻思报告上传</h1>
    <form >
        文件：<input type="file"  @change="handleChange" ref='inputer'/><br/><br/>
        名称：<input type = "text" v-model="name"><br>
        pid：<input type = "text" v-model="pid"><br>
        <button type = "button" @click="mySubmit()">提交</button>

    </form>
    <div style="color:red">{{msg}}</div>
</div>
</template>

<script>

import {uploadFile} from "@/http/api"
export default {
    name:'seller',
  data(){
      return{
          name:'',
          file:null,
          pid:'',
          msg:''
    }
  },
  methods:{
      handleChange(e){
          let inputDOM = this.$refs.inputer;
          // 通过DOM取文件数据
        this.file    = inputDOM.files[0];
        // console.log(this.name);
        //   console.log(this.pid);
      },
      mySubmit(){
          let data = new FormData();
        //   console.log(this.name);
        //   console.log(this.pid);
          data.append('disName',this.name)
          data.append('files',this.file)
          data.append('pid',this.pid)
          uploadFile(data).then(res=>{
              
                this.name = ''
                this.pid= ''
                this.file=null
                this.msg = '添加成功'
          }).catch(()=>{
              this.msg="添加失败"
          })
      }
  }
};
</script>

<style lang="less" scoped>
    .content{
        width: 960px;
        height: 1000px;
        margin:10px auto;
    }
</style>

