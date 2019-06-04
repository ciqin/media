<template>
    <div class="company_box">
         <div style="margin:18px;">
            <Title :title="'用户管理'"></Title>
            <Button  class="btnMedal" @click="addModalShow" type="primary" style="margin-right:50px;">添加</Button>
        </div>
        <!-- 模态框 -->
            <Drawer
                :title="titleName"
                v-model="value3"
                width="660"
                :mask-closable="false"
                :styles="styles"
            >
                <Form :model="formData">
                    <Row :gutter="32">
                        <Col span="24">
                            <FormItem label="用户名称:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                                <Input  placeholder="请输入用户名称" v-model="formData.name" />
                            </FormItem>
                        </Col>
                        <Col span="24" style="margin-top: 16px;">
                            <FormItem label="部门名称:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                                <Input  placeholder="请输入部门名称" v-model="formData.departMentName" />
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
                    <Button class="setW" @click="value3 = false">关闭</Button>
                </div>
            </Drawer>
        <Table :data="data1" :columns="tableColumns1" stripe>
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
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

    import {getUserList,removeUser,addUser,selectByIdtUser,updateUser} from "@/http/api"

    export default {
        data () {
            return {
                data1: [],
                value3: false,
                modal1: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    padding: '210px 80px 0 80px',
                    position: 'static',
                },
                titleName:"用户管理添加",
                num:1,
                formData: {
                    address: null,
                    birthday: null,
                    createTime: null,
                    deadline: null,
                    depId:"",
                    departmentName: "",
                    email: null,
                    id: null,
                    institutionId: null,
                    institutionName: null,
                    lastModify: null,
                    mobile: null,
                    password: null,
                    personname: null,
                    position: null,
                    roleId: null,
                    roleName: null,
                    sex: null,
                    status: null,
                    tel: null,
                    username: null,
                },
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
            getUserList().then(res => {
                this.data1 = res.obj
            })
        },
        methods: {
             removeParent( row,index ) {
                 this.modal1 = true;
                //  removeUser({"id":row.id}).then(res => {
                //      res.success?this.$message('删除成功'):this.$message('删除失败')
                //  })
            },
            ok () {
                 removeUser({"id":row.id}).then(res => {
                     res.success?this.$message('删除成功'):this.$message('删除失败')
                 })
            },
            cleardata() {
                for(let key in this.formData) {
                    this.formData[key] = ''
                }
            },
            addModalShow () {
               this.cleardata();    
               this.titleName = "用户管理添加";
               this.value3 = true;
               this.num = 1;
            },
            changePage () {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                this.tableData1 = this.mockTableData1();
            },
            addRole(){
                //let datas = this.formData,that = this;
                if(this.num==1) {
                    addUser(this.formData).then(( res ) => {
                        if(res.success) {
                            this.value3 = false;
                        }
                    })
                    
                }else {
                    this.axios.post('http://localhost:8096/user/updateUser', qs.stringify(datas)).then(function (result) {
                        if(result.data.success){
                            that.value3 = false
                            that.data1.splice(index,1,that.formData)
                        }
                    })
                }
            },
           
            modifyItem( row,index ) {
                this.value3 = true;
                this.titleName = "用户管理修改";
                this.num = 2;
                selectByIdtUser().then(( res ) => {
                    if(res.data.success) {
                        this.formData = res
                    }
                })
            },
            
        },
        components:{
            Title
        }
    }
</script>

