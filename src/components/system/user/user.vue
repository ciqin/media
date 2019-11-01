<template>
    <div class="company_box">
        <div style="margin:18px;">
            <Title :title="'用户管理'"></Title>
            <Button  class="btnMedal" @click="addModalShow" type="primary" style="margin-right:50px;">添加</Button>
        </div>
        <!-- 模态框 -->
        <Drawer
            title="用户添加"
            v-model="value3"
            width="660"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="24">
                         <FormItem label="用户名称:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input  placeholder="请输入用户名称" v-model="formData.username" />
                        </FormItem>
                    </Col>
                    <Col span="24" style="margin-top: 16px;">
                         <FormItem label="部门名称:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <select class="MaterialList" style="width:100%;padding-left: 18px" v-model="couponSelected" @change="changeData($event)">
                                <option :value="item.id" :instId="item.instId" :createTime ="item.createTime" v-for="(item,index) in bmData" :key="index" >{{item.name}}</option>
                            </select>
                        </FormItem>
                    </Col>
                    <Col span="24" style="margin-top: 16px;">
                         <FormItem label="用户邮箱:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input  placeholder="请输入用户邮箱" v-model="formData.email" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button type="primary" class="setW" @click="addRole()" style="margin-right:16px;">确定</Button>
                <Button class="setW" @click="value3 = false;cleardata()">关闭</Button>
            </div>
        </Drawer> 
        <Table :data="data1" :columns="tableColumns1" stripe>
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.username }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button shape="circle" icon="ios-create-outline" @click="modifyItem( row , index)"></Button>
                <Button shape="circle" icon="ios-trash-outline" @click="removeParent( row , index)"></Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
        <Modal
            v-model="modal1"
            title=""
            @on-ok="ok">
            确定删除吗？
        </Modal>
    </div>
</template>
<script>
    import Title from "@/components/assembly/title";

     import '../../../assets/css/system.css';

    import {getUserList,removeUser,addUser,selectByIdtUser,updateUser,getdepartmentlist} from "@/http/api"
    import {momentDate} from "@/common/utils/utilDateFormat"

    export default {
        data () {
            return {
                data1: [ ],
                value3: false,
                modal1: false,
                removeid:null,
                couponSelected: null, 
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    padding: '210px 80px 0 80px',
                    position: 'static',
                },
                titleName:"用户管理添加",
                num:1,
                formData: {
                    username: null,
                    departmentName: null,
                    create_time: null,
                    email: null,
                    id:null
                },
                bmData:[],
                tableColumns1: [
                    {
                        title: '用户名称',
                        key: 'username' 
                    },
                    {
                        title: '部门名称',
                        key: 'departmentName',
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
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
         mounted () {
            getUserList({'roleId':1}).then(res => {
                this.data1 = res.obj;
                // this.couponSelected = this.data1[0].depId;
            })
            getdepartmentlist().then( res => {
                this.bmData = res.obj;
                
                // this.formData.institutionId =  res.obj[0].instId;
                // this.formData.depId =  res.obj[0].depId;
                // this.formData.createTime =  res.obj[0].createTime;   
            })
        },
        methods: {
             removeParent( row,index ) {
                 this.modal1 = true;
                 this.removeid = row.id;
            },
            ok() {
                 removeUser({ContentType:true,"id":this.removeid}).then(res => {
                     if(res.success) {
                         this.$message('删除成功');
                         getUserList({'roleId':1}).then(res => {
                            this.data1 = res.obj
                        })
                     }else {
                         this.$message('删除失败');
                     }
                 })
            },
            cleardata() {
                for(let key in this.formData) {
                    this.formData[key] = ''
                }
            },
            changeData(event) {
                var index = event.target.selectedIndex;
                this.formData.depId = event.target.value;
                this.formData.departmentName = event.target.options[index].text;
                // this.formData.createtime = event.target.options[index].getAttribute("createtime");
                this.formData.create_time = momentDate("YYYY-MM-DD hh:mm:ss");
            },
            addModalShow () {
            //    this.cleardata();    
               this.titleName = "用户管理添加";
               this.value3 = true;
               this.num = 1;
            },
            changePage () {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                // this.tableData1 = this.mockTableData1();
            },
            addRole(){
                let datas = this.formData;
                datas.ContentType = true;
                if(this.num==1) { 
                    addUser(datas).then(res => {
                        if(res.success) {
                            // this.value3 = false;
                             getUserList({'roleId':1}).then(res => {
                                this.data1 = res.obj
                            })
                        }
                    })
                }else {
                    updateUser(datas).then(res => {
                        if(res.success) {
                            // this.value3 = false;
                             getUserList({'roleId':1}).then(res => {
                                this.data1 = res.obj
                            })
                        }
                    })
                }
                this.value3 = false;
                this.cleardata();
            },
            modifyItem( row,index ) {
                this.value3 = true;
                this.titleName = "用户管理修改";
                this.num = 2;
                this.removeid = index,
                // selectByIdtUser({id:row.id}).then(( res ) => {             
                //     if(res) {
                //         this.formData.username = res.username;
                //         this.couponSelected = row.depId;
                //         this.formData.email = res.email;
                //         this.formData.id = res.id;
                //     }
                // })
                this.formData.username = row.username;
                this.couponSelected = row.depId;
                this.formData.email = row.email;
                this.formData.id = row.id;
            },
            cleardata(){
                this.formData = {
                    username: null,
                    departmentName: null,
                    create_time: null,
                    email: null,
                    id:null
                }
                this.couponSelected = null;
            }
            
        },
        components:{
            Title
        }
    }
</script>

