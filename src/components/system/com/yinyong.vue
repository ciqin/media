<template>
    <div class="company_box">
        <!-- 应用案例添加-->
        <Drawer :title="dataName" v-model="value3" width="660" :mask-closable="false" :styles="styles">
            <Form :model="formData1">
                <Row :gutter="32">
                <Col span="24">
                    <FormItem
                        label="案例名称:"
                        label-position="left"
                        calss="formitem"
                        style="width:100%;margin:0 auto;">
                        <Input placeholder="请输入文件案例名称" v-model="formData1.name"/>
                    </FormItem>
                </Col>
                <Col span="24" style="margin-top: 16px;">
                         <FormItem label="所属领域:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                            <select class="MaterialList" style="width:100%;">
                                <option value="1">媒体行业应用案例</option>
                                <option value="2">政务领域应用案例</option>
                                <option value="3">舆情领域应用案例</option>
                                <option value="4">警务领域应用案例</option>
                            </select>
                        </FormItem>
                </Col>
                <Col span="24" style="margin-top: 16px;">
                         <FormItem label="PPT:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <!-- <Input   v-model="formData.email" /> -->
                             <Upload
                                multiple
                                action="//jsonplaceholder.typicode.com/posts/" class="updata">
                                <Button icon="ios-cloud-upload-outline" style="width:100%;">ppt上传(支持多个文件)</Button>
                            </Upload>
                        </FormItem>
                </Col>
                <Col span="24" style="margin-top: 16px;">
                         <FormItem label="word:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Upload
                                multiple
                                action="//jsonplaceholder.typicode.com/posts/" class="updata">
                                <Button icon="ios-cloud-upload-outline" style="width:100%;">word上传(支持多个文件)</Button>
                            </Upload>
                        </FormItem>
                </Col>
                <Col span="24" style="margin-top: 16px;">
                         <FormItem label="产品册:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Upload
                                multiple
                                action="//jsonplaceholder.typicode.com/posts/" class="updata">
                                <Button icon="ios-cloud-upload-outline" style="width:100%;">产品册上传(支持多个文件)</Button>
                            </Upload>
                        </FormItem>
                </Col>
                <Col span="24" style="margin-top: 16px;">
                         <FormItem label="视频:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Upload
                                multiple
                                action="//jsonplaceholder.typicode.com/posts/"  class="updata">
                                <Button icon="ios-cloud-upload-outline" style="width:100%;">视频上传(支持多个文件)</Button>
                            </Upload>
                        </FormItem>
                </Col>
                <Col span="24" style="margin-top: 16px;">
                         <FormItem label="地址名称:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input   v-model="formData.email" />
                        </FormItem>
                </Col>
                <Col span="24" style="margin-top: 16px;">
                         <FormItem label="链接:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input   v-model="formData.email" />
                        </FormItem>
                </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button type="primary" class="setW" @click="addCase()" style="margin-right:16px;">确定</Button>
                <Button class="setW" @click="value3 = false">关闭</Button>
            </div>
        </Drawer>
        <!-- 子文档添加 -->
        <Drawer :title="dataName" v-model="value4" width="660" :mask-closable="false" :styles="styles">
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="20">
                        
                        <FormItem
                        label="文件名称:"
                        label-position="left"
                        calss="formitem"
                        style="width:100%;margin:0 auto;"
                        v-for="n in fileItem" :key="n">
                        <Input placeholder="请输入文件名称" v-model="formData.name"/>
                        </FormItem>
                    </Col>
                    <!-- <Icon type="ios-add" size="24" @click=""/> -->
                    <Button icon="ios-add" @click="addFileItem()"></Button>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button type="primary" class="setW" @click="addRole()" style="margin-right:16px;">确定</Button>
                <Button class="setW" @click="value4 = false">关闭</Button>
            </div>
        </Drawer>
        <div style="padding:18px 18px 0 18px;border-bottom:1px solid #d1d1d1;">
             <Row>
                <Col span="3"><Title :title="guanli+'管理'"></Title></Col>
                <Col span="19"> 
                    <select class="MaterialList" @change="changeTable">
                        <option value="1">媒体行业应用案例</option>
                        <option value="2">政务领域应用案例</option>
                        <option value="3">舆情领域应用案例</option>
                        <option value="4">警务领域应用案例</option>
                    </select>
                     <select class="MaterialList" @change="changeTable" style="margin-left: 30px;">
                        <option :value="index" v-for="(item,index) in caseArr" :key="index">{{item.name}}</option>
                    </select>
                </Col>
                <Button  class="btnMedal" @click="addModalShow" type="primary" style="margin-left: 70px;">添加</Button>
            </Row>
        </div>
        
        <Modal
            v-model="modal1"
            title=""
            @on-ok="ok">
            确定删除吗？
        </Modal>
        <div v-for="(item,index) in data" :key="item.title">
            <div class="clearfix">
                <div class="titleChild">
                    <img src="/static/images/icon/ppt_icon.png" >
                    <span>{{item.title}}</span>
                </div>
                <Button  class="btnMedalChild" @click="addModalCase" type="primary" style="margin-right: 25px;">添加</Button>
            </div>
            <div>
                <Table :data="item.data" :columns="tableColumns1" stripe>
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template  slot="action">
                        <Button shape="circle" icon="ios-create-outline" @click="editItem(item)"></Button>
                        <Button shape="circle" icon="ios-trash-outline" @click="deleteItem(index)"></Button>
                    </template>
                </Table>
            </div>
        </div>
        
    </div>
</template>
<script>
    import Title from "@/components/assembly/title";

    import { getDepartment,removeDepartment,getapplicationList} from '@/http/api';
    import {mapState} from 'vuex'
    import "../../../assets/css/system.css";
    export default {
        data () {
            return {
                data1: [],
                data:[],
                value3: false,
                value4:false,
                value5:false,
                modal1:false,
                fileItem: 1,
                styles: {
                    height: "calc(100% - 55px)",
                    overflow: "auto",
                    padding: "210px 80px 0 80px",
                    position: "static"
                },
                caseArr:[{
                    name:'新华社'
                },{
                    name:'新华社1'
                },{
                    name:'新华社2'
                }],
                num:1,
                dataName: "应用案例添加",
                formData1: {
                    name: "",
                },
                formData: {
                    name: "",
                },
                itemData: {
                    
                },
                tableColumns1: [
                    {
                        title: '产品名称',
                        key: 'names'
                    },
                    {
                        title: '操作人',
                        key: 'operation'
                    },
                    {
                        title: '更改时间',
                        key: 'createtime',
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ]
            }
        },
        computed: {
            // cosnole.log(this.$store.state)
            // this.dataTypes = this.$store.state.guanli;
            // guanli(){
            //     return  this.$store.state.guanli
            // },
            ...mapState(['guanli'])
        },
        // watch:{
        //    guanli(newVal){
        //        console.log(newVal)
        //    } 
        // },
         mounted () {
            getapplicationList().then(res => {
                this.data = res
            })
        },
        methods: {
            cleardata() {
                for(let key in this.formData) {
                    this.formData[key] = ''
                }
            },
            changeTable() {
                
            },
            addModalShow () {
               this.cleardata();
               this.value3 = true;
               this.num = 1;
            },
            changePage () {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                this.tableData1 = this.mockTableData1();
            },
            addRole(){
                this.value4 = false;
                //store data function
            },
            addCase() {
                this.value3 = false;
                this.caseArr.push(this.formData1)
            },
            addModalCase(){ //添加文件
                this.value4 = true;
            },
            modifyParent( row,index ) {
                this.value3 = true;
                // this.formData = row;
                this.num = index;
                //  let that = this;
                // if(confirm('确定要删除吗')) {
                //     this.axios({
                //         method: 'get',
                //         url:'http://localhost:8096/departMent/deleteById/'+row.id,
                //     }).then(function(result){
                //         if(result) {
                //             that.data1.splice(index,1)
                //         }
                //     })
                // }  
            },
            editItem(index){ //编辑
                value5 = true;
            },
            deleteItem(index){ //删除

            },
            addFileItem(){
                this.fileItem+=1;
            }
            
        },
        components:{
            Title
        }
    }
</script>
