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
                :styles="styles">
                <Form :model="formData">
                    <Row :gutter="32">
                        <Col span="24">
                            <FormItem label="用户名称:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                                <Input  placeholder="请输入用户名称" v-model="formData.username" />
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

    import {getUserList,removeUser,addUser,selectByIdtUser,updateUser} from "@/http/api"

    export default {
        data () {
            return {
                data1: [
                   
                ],
                value3: false,
                modal1: false,
                removeid:null,
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
                    departMentName: null,
                    createTime: null,
                    email: null,
                },
                tableColumns1: [
                    {
                        title: '用户名称',
                        key: 'username' 
                    },
                    {
                        title: '部门名称',
                        key: 'departMentName',
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
                 this.removeid = row.id;
         
            },
            ok () {
                 removeUser({ContentType:true,"id":this.removeid}).then(res => {
                     if(res.success) {
                         this.$message('删除成功');
                         getUserList().then(res => {
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
                    let datas = this.formData;
                    datas.ContentType = true;
                    addUser(datas).then(( res ) => {
                        //console.log(res)
                        // if(res.success) {
                            
                        // }
                    })

                    // this.falg.empty(this.formData.departMentName)?this.$message('用户名称为空'):"";

                    // this.data1.push(this.formData)
                    // this.value3 = false;
                }else {
                    updateUser(this.formData).then(res => {
                        console.log(res.success)
                        if(res.success) {
                            this.value3 = false;
                            this.data1.splice(index,1,that.formData)
                        }
                    })
                    this.data1.splice(this.removeid,1,this.formData)
                    this.value3 = false;
                }
            },
            modifyItem( row,index ) {
                this.value3 = true;
                this.titleName = "用户管理修改";
                this.num = 2;
                this.removeid = index,
                selectByIdtUser({id:row.id}).then(( res ) => {  
                    console.log(res)             
                    if(res) {
                        this.formData.name = res.username
                        this.formData.departMentName = res.departMentName
                        this.formData.email = res.email
                    }
                })
                // this.formData.username = row.username
                // this.formData.departMentName = row.departMentName
                // this.formData.email = row.email
            },
            
        },
        components:{
            Title
        }
    }
</script>

