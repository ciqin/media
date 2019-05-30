<template>
    <div class="company_box">
         <div style="margin:18px;">
            <Title :title="'用户管理'"></Title>
            <Button  class="btnMedal" @click="addModalShow" type="primary" style="margin-right:50px;">添加</Button>
        </div>
        <!-- 模态框 -->
        <Drawer
            title="用户管理添加"
            v-model="value3"
            width="720"
            :mask-closable="false"
            :styles="styles"
            class="rermovebox">
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="用户名称" label-position="left" calss="formitem" style="width:50%;margin-left: 25%;">
                            <Input v-model="formData.username" placeholder="请输入用户名称"  class="forminput" style="width:80%;"/>
                        </FormItem>
                    </Col>
                     <Col span="24">
                        <FormItem label="部门" label-position="top"  style="width:50%;margin-left: 25%;">
                            <Select v-model="formData.institutionId" placeholder="请输入单位" style="width:80%;"> 
                                <Option value="1">部门1</Option>
                                <Option value="2">部门2</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="邮件" label-position="top"  style="width:50%;margin-left: 25%;">
                            <Input v-model="formData.email" placeholder="请输入邮件" style="width:80%;"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button type="primary"  @click="addRole()">确定</Button>
                <Button style="margin-right: 8px" @click="value3 = false">关闭</Button>
            </div>
        </Drawer>    
        <Table :data="data1" :columns="tableColumns1" stripe>
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" shape="circle" icon="ios-create-outline" @click="modifyItem(row,index)"></Button>
                <Button type="primary" shape="circle" icon="ios-trash-outline" @click="removeParent(row,index)"></Button>
            </template>
        </Table>

        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import Title from "@/components/assembly/title";
    
    import {getUserList} from "@/http/api"

    export default {
        data () {
            return {
                data1: [],
                value3: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static',
                    paddingTop:"160px"
                },
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
                        key: 'institutionName',
                    },
                    {
                        title: '操作人',
                        key: 'roleName',
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
        // created(){
        //       let that = this;
              
        //       this.axios({
        //           method: 'get',
        //           url:'http://localhost:8096/user/getUserList',
        //       }).then(function(result){
        //         that.data1 = result.data.obj;
        //       })
        // },
         mounted () {
            getUserList().then(res => {
                this.data1 = res.obj
            })
        },
        methods: {
            cleardata() {
                for(let key in this.formData) {
                    this.formData[key] = ''
                }
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
                let datas = this.formData,that = this;
                if(this.num==1) {
                    this.axios.post('http://localhost:8096/user/addUser', qs.stringify(datas)).then(function (result) {
                        if(result.data.success){
                            that.value3 = false;
                            that.data1.push(that.formData);
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
            removeParent( row,index ) {
                 let that = this;
                if(confirm('确定要删除吗')) {
                    this.axios({
                        method: 'get',
                        url:'http://localhost:8096/user/deleteByUserId/'+row.id,
                    }).then(function(result){
                        if(result) {
                            that.data1.splice(index,1)
                        }
                    })
                }
            },
            modifyItem( row,index ) {
                this.value3 = true;
                this.num = 2;
                let that = this;
                this.axios.get('http://localhost:8096/user/selectById/'+row.id).then(function (result) {
                    if(result.data.success){
                        that.formData = result.data.obj
                        
                    }
                })
            },
            
        },
        components:{
            Title
        }
    }
</script>


<style lang="less" scope>

.demo-drawer-footer {
    margin:0 auto;
}
.ivu-form .ivu-form-item-label {
    width:60px;
}
.ivu-drawer-content{
    background: #f8f8f8;
}
.ivu-input {
    background: #fff;
}
.ivu-form .ivu-form-item-label {
    font-size: 16px;
}
.ivu-drawer-header p, .ivu-drawer-header-inner {
    font-size: 18px;
}
.formitem {
    width: 70%;
    margin-left: 25%;
}
.forminput {
    width: 67%;
}
</style>
