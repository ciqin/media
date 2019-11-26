<template>
  <div class="company_box">
    <div style="padding:18px 18px 0 18px;">
      <Row>
        <Col span="3">
          <Title :title="guanli+'管理'"></Title>
        </Col>
        <Col span="19">
          <select class="MaterialList" v-model="dataId">
            <option v-for="(product,index) in data1" :key="index" :value="product.autoId">{{product.name}}</option>
            <!-- <option value>城市形象品牌监测</option>
            <option value>影响力评估</option>
            <option value>商务智能情报</option>
            <option value>一带一路特色服务</option> -->
          </select>
        </Col>
        <Button class="btnMedal" @click="addModalShow" type="primary" style="margin-left: 70px;">添加</Button>
      </Row>
    </div>
    <Table :data="data" :columns="tableColumns1" stripe>
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button shape="circle" icon="ios-create-outline" @click="modifyParent( row , index)"></Button>
        <Button shape="circle" icon="ios-trash-outline" @click="removeParent( row , index)"></Button>
      </template>
    </Table>
    <Drawer :title="dataName" v-model="value3" width="660" :mask-closable="false" :styles="styles">
      <Form :model="formData">
        <Row :gutter="32">
          <Col span="24">
            <FormItem
              label="文件名称:"
              label-position="left"
              calss="formitem"
              style="width:100%;margin:0 auto;">
            <Input placeholder="请输入文件名称" v-model="formData.name"/>
            </FormItem>
            <FormItem
                            label="报告文件:"
                            v-if="eidtFlag"
                            label-position="left"
                            calss="formitem"
                            style="width:100%;margin:0 auto;margin-top: 16px;">
                                <Upload :before-upload="handleUpload"
                                    :format="['pdf']"
                                    action="//jsonplaceholder.typicode.com/posts/" class="updata">
                                    <Button icon="ios-cloud-upload-outline" style="width:100%;">{{fileName}}</Button>
                                </Upload>
                            </FormItem>
                            <Progress v-if="progress" :percent="progress"></Progress>
                            <div v-if="fileExist" style="color:red;">上传文件不能为空</div>
          </Col>

        </Row>
      </Form>
      <div class="demo-drawer-footer">
        <Button type="primary" class="setW" @click="addRole()" style="margin-right:16px;">确定</Button>
        <Button class="setW" @click="value3 = false">关闭</Button>
      </div>
    </Drawer>
    <Modal v-model="modal1" title @on-ok="ok">确定删除吗？</Modal>
  </div>
</template>
<script>
import Title from "@/components/assembly/title";

import {
  getDepartment,
  removeDepartment,
  getapplicationList,
  getProductDemo,
  uploadFile,
  updateCaseName,
  deleteFile
} from "@/http/api";
import { mapState } from "vuex";
import "../../../assets/css/system.css";
import {extFilter} from "@/mixin/filter"
export default {
  data() {
    return {
      id:this.$route.params.id,
      dataId:'',
      progress:0,
      fileExist:false,
      fileName:'选择文件',
      // wensiProduct:[
      //   {
      //     'autoId':'0',
      //     'name':'政务舆情分析'
      //     },
      //   {
      //     'autoId':'1',
      //     'name':'城市形象品牌监测'
      //     },
      //   {
      //     'autoId':'2',
      //     'name':'影响力评估'
      //     },
      //   {
      //     'autoId':'3',
      //     'name':'商务智能情报'
      //     },
      //   {
      //     'autoId':'4',
      //     'name':'一带一路特色服务'
      //     },
      // ],
      data1: [
        // {
        //   name: "报告1",
        //   leader: "张三",
        //   createTime: "2019-06-30 03:06:55"
        // },
        // {
        //   name: "报告2",
        //   leader: "张三",
        //   createTime: "2019-06-30 03:06:55"
        // },
        // {
        //   name: "报告3",
        //   leader: "张三",
        //   createTime: "2019-06-30 03:06:55"
        // },
        // {
        //   name: "报告4",
        //   leader: "张三",
        //   createTime: "2019-06-30 03:06:55"
        // }
      ],

      data: [],
      value3: false,
      value4: false,
      modal1:false,
      removeid:null,
      addchangeType:1,
      dataName: "",
    
      eidtFlag:false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        padding: "210px 80px 0 80px",
        position: "static"
      },
      num: 1,
      formData: {
        name: "",
        file:null
      },
      tableColumns1: [
        {
          title: "文件名称",
          key: "displayName"
        },
        {
          title: "操作人",
          key: "userName"
        },
        {
          title: "更改时间",
          key: "updateTime"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ]
    };
  },
  computed: {
    // cosnole.log(this.$store.state)
    // this.dataTypes = this.$store.state.guanli;
    // guanli(){
    //     return  this.$store.state.guanli
    // },
    ...mapState(["guanli"])
  },
  // watch:{
  //    guanli(newVal){
  //        console.log(newVal)
  //    }
  // },
  mounted() {
    // getapplicationList().then(res => {
    //   this.data = res;
    // });
      getProductDemo({'fid':this.id}).then(res => {
        this.data1 = res
        this.dataId = this.data1[0].autoId;
        this.data = this.data1[0].demonstrationArr[0].data;
      });
    
  },
  methods: {
    clearFileData() {
      // for (let key in this.formData) {
      //   this.formData[key] = "";
      // }
      this.formData = {
        name:'',
        file:null
      };
      this.fileExist = false;
      this.fileName = '选择文件';
    },
    changeTable() {},
    addModalShow() {
      this.clearFileData();
      // this.dataName = "闻思报告添加";
      let id = this.dataId;
      let index = _.findIndex(this.data1,(o)=>{return o.autoId == id});
      if(index!=-1){
        this.dataName = this.data1[index].name
        this.value3 = true;
        this.addchangeType = 1;
      }
      this.eidtFlag = true;
      // this.dataName = this.wensiProduct[id].name;
      

      
    },
    changePage() {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.mockTableData1();
    },
    handleUpload(file){
        if(file!=null){
              // this.files.push(file);
              // this.formData.file = file;
              // this.FormData.pdfName = file.name;
              this.fileName = file.name;
              let fileExt = ['pdf'];
              let flag = this.extFilter(file.name,fileExt);
               if(flag){
                  this.pdfName = file.name;
                  this.formData.file = file;
                  // this.formData.fileName = file.name;
              }else{
                  this.fileName = "格式不正确"
              }
          }
          // console.log(index);
          // console.log(file.name);
          return false;
    },
    addRole() {
      // if(this.addchangeType === 1) {
      //     this.data1.push({
      //         name:this.formData.name
      //     })
      //     this.value3 = false
      // }else {
      //     this.data1[this.num].name = this.formData.name;
      //     this.value3 = false;
      // }
      if(this.eidtFlag){
        
        let data = new FormData();
        if(!(this.formData.file)){
          this.fileExist = true;
          return;
        }
        let name = this.formData.name;
        if(!name&&this.formData.file){
          name = this.formData.file.name.split(".")[0];
        }
        let id = this.dataId;
        data.append('pid',id);
        data.append('disName',name);
        let files = this.formData.file;
        data.append('files',files);
        let config = {
          onUploadProgress: progressEvent => {
                  var complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
                  this.progress = Math.min(complete,95)
              }
        };
        uploadFile(data,config).then(res => {
          // 重新加载内容数据
          this.loadCasesContent();
          this.$message("添加成功");
          this.progress = 0;
          this.clearFileData();
          this.value3=false;
        });

      }else{
        updateCaseName({'id':this.formData.autoId,'newName':this.formData.name}).then(res =>{
          this.$message("修改成功");
          this.loadCasesContent();
          this.clearFileData();
          this.value3=false;
        })
      }
      
      
    },
    loadCasesContent(){
      let id = this.dataId;
      let index = _.findIndex(this.data1,(o)=>{return o.autoId==id});
      index= index==-1?0:index;
      getProductDemo({'fid':this.id}).then(res => {
        this.data1 = res
        this.dataId = this.data1[index].autoId;
        this.data = this.data1[index].demonstrationArr[0].data;
      });
      
    },

    modifyParent(row, index) {
      this.value3 = true;
      // this.dataName = "闻思报告修改"
      this.eidtFlag = false;
      this.addchangeType = 2;
      //this.value3 = true;
      // this.formData = row;
      this.formData = row;
      this.formData.name = row.displayName;
      this.num = index;

    },
    ok(){
        // this.data1.splice(this.removeid, 1);
        deleteFile({'id':this.removeid}).then(res=>{
          this.loadCasesContent();
          this.$message("删除成功");
        });
        this.clearFileData();
    },
    removeParent(row, index) {
       this.modal1 = true;
      this.removeid = row.autoId;
    }
  },
  mixins:[extFilter],
  components: {
    Title
  },
  watch:{
    dataId(newVal){
      let index = _.findIndex(this.data1,(o)=>{return o.autoId==newVal});
                // console.log(index);
          if(index!=-1){
            this.dataName = this.data1[index].name;
                    // this.data = this.wensiProduct[index].data;
            
            this.data = this.data1[index].demonstrationArr[0].data
          }
    }
  }
};
</script>

