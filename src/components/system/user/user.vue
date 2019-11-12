<template>
    <div class="company_box">
        <div style="margin:18px;">
            <Title :title="'用户管理'"></Title>
            <Button  class="btnMedal" @click="addModalShow" type="primary" style="margin-right:50px;">添加</Button>
        </div>
        <!-- 模态框 -->
        <Drawer
            :title="(formData.username||formData.password||formData.email)?'用户编辑':'用户添加'"
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
                             <select class="MaterialList" style="width:100%;padding-left: 18px" v-model="formData.depId" @change="changeData($event)">
                                <option :value="item.id" :instId="item.instId" :createTime ="item.createTime" v-for="(item,index) in bmData" :key="index" >{{item.name}}</option>
                            </select>
                        </FormItem>
                    </Col>
                    <Col span="24" style="margin-top: 16px;">
                         <FormItem label="角色:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <select class="MaterialList" style="width:100%;padding-left: 18px" v-model="formData.roleId">
                                <!-- <option :value="item.id" :instId="item.instId" :createTime ="item.createTime" v-for="(item,index) in bmData" :key="index" >{{item.name}}</option> -->
                                <option value="1">普通用户</option>
                                <option value="2">管理员</option>
                            </select>
                        </FormItem>
                    </Col>
                    <Col span="24" style="margin-top: 16px;">
                         <FormItem label="用户邮箱:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input  placeholder="请输入用户邮箱" v-model="formData.email" />
                        </FormItem>
                    </Col>
                    <Col span="24" style="margin-top: 16px;">
                         <FormItem label="用户姓名:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input @focus="personNotAllowed=false" placeholder="请输入用户姓名" v-model="formData.personname" />
                        </FormItem>
                    </Col>
                    <Col span="24" style="margin-top: 16px;">
                         <FormItem label="用户密码:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input  placeholder="请输入密码" type="password" v-model="formData.password" />
                        </FormItem>
                    </Col>
                    <Col span="24" style="margin-top: 16px;">
                         <FormItem label="确认密码:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input  placeholder="请输入密码" type="password" v-model="formData.password2" />
                        </FormItem>
                    </Col>
                </Row>
                <Row v-if="passwordNotAllowed">
                    <Col span="24">
                            <div style="color:red;margin-left:116px;">密码不一致，请重新输入</div>
                    </Col>
                </Row>
                <Row v-if="nameNotAllowed">
                    <Col span="24">
                            <div style="color:red;margin-left:116px;">用户名不能为空</div>
                    </Col>
                </Row>
                <Row v-if="personNotAllowed">
                    <Col span="24">
                            <div style="color:red;margin-left:116px;">姓名不能为空</div>
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
                nameNotAllowed:false,
                passwordNotAllowed:false,
                personNotAllowed:false,
                // couponSelected: null, 
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
                    depId:null,
                    departmentName: null,
                    create_time: null,
                    email: null,
                    id:null,
                    password:null,
                    password2:null,
                    roleId:1,
                    personname:null,
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
                        title: '角色',
                        key: 'roleName',
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
            this.loadContent();
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
                         this.loadContent();
                     }else {
                         this.$message('删除失败');
                     }
                 })
            },
            // cleardata() {
            //     for(let key in this.formData) {
            //         this.formData[key] = ''
            //     }
            //     this.formData.roleId = 1;
            // },
            changeData(event) {
                var index = event.target.selectedIndex;
                this.formData.depId = event.target.value;
                this.formData.departmentName = event.target.options[index].text;
                // this.formData.createtime = event.target.options[index].getAttribute("createtime");
                this.formData.create_time = momentDate("YYYY-MM-DD hh:mm:ss");
            },
            addModalShow () {
               this.cleardata();    
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
                if(!datas.username){
                    this.nameNotAllowed = true;
                    return
                }
                if(datas.password!=datas.password2){
                    this.passwordNotAllowed = true;
                    return
                }
                if(!datas.personname){
                    this.personNotAllowed = true;
                    return
                }
                // datas.roleId = 1;
                if(this.num==1) {
                    datas.id&&delete datas.id; 
                    addUser(datas).then(res => {
                        if(res.success) {
                            // this.value3 = false;
                             this.loadContent();
                        }
                    })
                }else {
                    updateUser(datas).then(res => {
                        if(res.success) {
                            // this.value3 = false;
                             this.loadContent();
                        }
                    })
                }
                this.value3 = false;
                this.cleardata();
            },
            loadContent(){
                getUserList().then(res => {
                    let data = res.obj;
                    // this.data1 = res.obj;
                    data = data.map(function(v){
                        if(v.roleId==1){
                            v.roleName = '普通用户'
                        }
                        if(v.roleId==2){
                            v.roleName = '管理员'
                        }
                        return v;
                    });
                    this.data1 = data;
                    
                    // this.couponSelected = this.data1[0].depId;
                })
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
                this.cleardata();
                this.formData.username = row.username;
                this.formData.depId = row.depId;
                this.formData.email = row.email;
                this.formData.id = row.id;
                this.formData.password = row.password;
                this.formData.password2 = row.password;
                this.formData.roleId = row.roleId;
                this.formData.personname = row.personname;
            },
            cleardata(){
                let depId = this.bmData.length?this.bmData[0].id:'';
                
                this.formData = {
                    // username: null,
                    // departmentName: null,
                    // create_time: null,
                    // email: null,
                    // id:null,
                    // roleId:1,
                    username: null,
                    depId:depId,
                    departmentName: null,
                    create_time: null,
                    email: null,
                    id:null,
                    password:null,
                    password2:null,
                    roleId:1,
                    personname:null,
                }
                this.couponSelected = null;
                this.nameNotAllowed = false;
                this.passwordNotAllowed = false;
                this.personNotAllowed = false;
            }
            
        },
        watch:{
            "formData.username":{
                handler(newVal,oldVal){
                    if(newVal){
                        this.nameNotAllowed = false;
                    }
                    console.log(newVal);
                },
                deep:true,
                immediate: true
            },
            "formData.password2":{
                 handler(newVal,oldVal){
                    if(newVal==this.formData.password){
                        this.passwordNotAllowed = false;
                    }
                },
                deep:true,
                immediate: true
            }
        },
        components:{
            Title
        }
    }
</script>

