<template>
    <div class="company_box">
        <div style="margin:18px;">
            <Title :title="'管理员'"></Title>
            <Button  class="btnMedal" @click="addModalShow" type="primary" style="margin-right:50px;">添加</Button>
        </div>
        <Drawer
            title="管理员添加"
            v-model="value3"
            width="660"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="24">
                         <FormItem label="管理员名称:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input  placeholder="请输入管理员名称" v-model="formData.name" />
                        </FormItem>
                    </Col>
                    <Col span="24" style="margin-top: 16px;">
                         <FormItem label="部门名称:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <select class="MaterialList" style="width:100%;padding-left: 18px" v-model="couponSelected" @change="changeData($event)">
                                <option :value="item.id" :instId="item.instId" :createTime ="item.createTime" :name ="item.name" v-for="(item,index) in bmData" :key="index" >{{item.name}}</option>
                            </select>
                        </FormItem>
                    </Col>
                    <Col span="24" style="margin-top: 16px;">
                         <FormItem label="管理员密码:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input  placeholder="请输入管理员密码" v-model="formData.password" />
                        </FormItem>
                    </Col>
                    <Col span="24" style="margin-top: 16px;">
                         <FormItem label="管理员邮箱:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input  placeholder="请输入管理员邮箱" v-model="formData.email" />
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
            <template slot-scope="{ row , index}" slot="action">
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

    import { getUserList,removeUser,addUser,getdepartmentlist,selectByIdRole,updateUser} from '@/http/api';

    export default {
        data () {
            return {
                data1: [],
                value3: false,
                modal1: false,
                removeid:null,
                bmData:null,
                addInput:[],
                couponSelected: 0, 
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    position: 'static',
                    padding: '210px 80px 0 80px'
                },
                num:1,
                formData: {
                    name: "",
                    createtime: "",
                    email: null,
                    departMentName:"",
                    leader: "",
                    institutionId:"",
                    depId:'',
                    id:"",
                    password:""
                },
                tableColumns1: [
                    {
                        title: '管理员名称',
                        key: 'username'
                    },
                    {
                        title: '部门名称',
                        key: 'departmentName'
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
            getUserList({'roleId':2}).then(res => {
                this.data1 = res.obj;
                // console.log(res.obj)
            })
            getdepartmentlist().then( res => {
                this.bmData = res.obj;
                this.formData.institutionId =  res.obj[0].instId;
                this.formData.depId =  res.obj[0].id;
                this.couponSelected = this.data1[0].depId;
                this.formData.createtime =  res.obj[0].createTime;   
            })
        },
        methods: {
            cleardata() {
                for(let key in this.formData) {
                    this.formData[key] = ''
                }
            },
            ok () {
                 removeUser({ContentType:true,"id":this.removeid}).then( res => {
                     if(res.success) {
                           getUserList({'roleId':2}).then(res => {
                                this.data1 = res.obj;
                            })
                     }else {
                         this.$message('删除失败')
                     }
                })
            },
            changeData(event) {
                var index = event.target.selectedIndex;
                this.formData.depId = event.target.value;
                this.formData.departMentName = event.target.options[index].text;
                this.formData.createtime = event.target.options[index].getAttribute("createtime");
            },
            addModalShow () {
                // this.cleardata();
               this.value3 = true;
               this.num = 1;
               
            },
            changePage () {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                this.tableData1 = this.mockTableData1();
            },
            addRole(){
                let datas = this.formData;
                datas.ContentType = true;
                datas.username = this.formData.name;
                datas.roleId = 2;
                if(this.num==1) { 
                    addUser(datas).then(res => {
                        if(res.success) {
                            // this.value3 = false;
                            this.$message('添加成功')
                            getUserList({'roleId':2}).then(res => {
                                this.data1 = res.obj;
                            })
                        }else{
                            this.$message('添加失败')
                        }
                    })
                }else {
                    updateUser(datas).then(res => {
                        if(res.success) {
                            // this.value3 = false;
                            this.$message('修改成功')
                            getUserList({'roleId':2}).then(res => {
                                this.data1 = res.obj;
                            })
                        }else{
                            this.$message('修改失败');
                        }
                    })
                }
                this.value3 = false;
            },
            removeParent( row,index ) {
                this.modal1 = true;
                this.removeid = row.id;
            },
             modifyItem( row,index ) {
                this.value3 = true;
                this.titleName = "用户管理修改";
                this.num = 2;
                // selectByIdRole({ContentType:true,id:row.id}).then(( res ) => {               
                //     if(res) {
                //         this.formData.name = res.obj.name;
                //         this.couponSelected = row.depId;
                //         this.formData.email = res.obj.email;
                //         this.formData.id = res.obj.id;
                //     }
                // })
                this.formData.name = row.username;
                this.couponSelected = row.depId;
                this.formData.email = row.email;
                this.formData.id = row.id;
                this.formData.password = row.password;
                
            },
        },
        components:{
            Title
        }
    }
</script>
<style lang="less" scoped>
.ivu-input {
  height: 45px;
}
</style>
