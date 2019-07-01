<template>
  <div class="company_box">
    <div style="padding:18px 18px 0 18px;">
      <Row>
        <Col span="3">
          <Title :title="guanli+'管理'"></Title>
        </Col>
        <Col span="19">
          <select class="MaterialList" @change="changeTable">
            <option value>政务舆情分析</option>
            <option value>城市形象品牌监测</option>
            <option value>影响力评估</option>
            <option value>商务智能情报</option>
            <option value>一带一路特色服务</option>
          </select>
        </Col>
        <Button class="btnMedal" @click="addModalShow" type="primary" style="margin-left: 70px;">添加</Button>
      </Row>
    </div>
    <Table :data="data1" :columns="tableColumns1" stripe>
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
  getapplicationList
} from "@/http/api";
import { mapState } from "vuex";
import "../../../assets/css/system.css";
export default {
  data() {
    return {
      data1: [
        {
          name: "报告1",
          leader: "张三",
          createTime: "2019-06-30 03:06:55"
        },
        {
          name: "报告2",
          leader: "张三",
          createTime: "2019-06-30 03:06:55"
        },
        {
          name: "报告3",
          leader: "张三",
          createTime: "2019-06-30 03:06:55"
        },
        {
          name: "报告4",
          leader: "张三",
          createTime: "2019-06-30 03:06:55"
        }
      ],
      data: [],
      value3: false,
      modal1:false,
      removeid:null,
      addchangeType:1,
      dataName: "闻思报告添加",
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        padding: "210px 80px 0 80px",
        position: "static"
      },
      num: 1,
      formData: {
        address: "",
        contacter: null,
        createTime: "",
        email: null,
        fax: "",
        id: "",
        instId: null,
        leader: "",
        name: "",
        note: null,
        status: "",
        telephone: null,
        userDep: null
      },
      tableColumns1: [
        {
          title: "文件名称",
          key: "name"
        },
        {
          title: "操作人",
          key: "leader"
        },
        {
          title: "更改时间",
          key: "createTime"
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
    getapplicationList().then(res => {
      this.data = res;
    });
  },
  methods: {
    cleardata() {
      for (let key in this.formData) {
        this.formData[key] = "";
      }
    },
    changeTable() {},
    addModalShow() {
      this.cleardata();
      this.dataName = "闻思报告添加";
      this.value3 = true;
      this.addchangeType = 1;
    },
    changePage() {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.mockTableData1();
    },
    addRole() {
      if(this.addchangeType === 1) {
          this.data1.push({
              name:this.formData.name
          })
          this.value3 = false
      }else {
          this.data1[this.num].name = this.formData.name;
          this.value3 = false;
      }
    },
    modifyParent(row, index) {
      this.value3 = true;
      this.dataName = "闻思报告修改"
      this.addchangeType = 2;
      //this.value3 = true;
      this.formData = row;
      this.num = index;
    },
    ok(){
        this.data1.splice(this.removeid, 1);
    },
    removeParent(row, index) {
       this.modal1 = true;
      this.removeid = this.index;
    }
  },
  components: {
    Title
  }
};
</script>

