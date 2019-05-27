<template>
    <div class="company_box">
        <Title :title="'用户管理'"></Title>
        <Button  class="btnMedal" @click="addModalShow" type="primary">添加</Button>
        <!-- 模态框 -->
        <Drawer
            title="用户管理添加"
            v-model="value3"
            width="720"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="用户名称" label-position="left">
                            <Input v-model="formData.username" placeholder="请输入用户名称"  style="width:86%;"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="真实姓名" label-position="top">
                            <Input v-model="formData.personname" placeholder="请输入真实姓名" style="width:86%;"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="密码" label-position="top">
                            <Input v-model="formData.password" placeholder="请输入密码" style="width:86%;"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="电话" label-position="top">
                            <Input v-model="formData.tel" placeholder="请输入电话" style="width:86%;"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="邮件" label-position="top">
                            <Input v-model="formData.email" placeholder="请输入邮件" style="width:86%;"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="单位" label-position="top">
                            <Select v-model="formData.depId" placeholder="请输入单位" style="width:86%;"> 
                                <Option value="1">单位1</Option>
                                <Option value="2">单位2</Option>
                            </Select>
                        </FormItem>
                    </Col>
                     <Col span="24">
                        <FormItem label="部门" label-position="top">
                            <Select v-model="formData.institutionId" placeholder="请输入单位" style="width:86%;"> 
                                <Option value="1">部门1</Option>
                                <Option value="2">部门2</Option>
                            </Select>
                        </FormItem>
                    </Col>
                     <Col span="24">
                        <FormItem label="角色" label-position="top" >
                            <Select v-model="formData.roleId" placeholder="请输入单位" value="1" style="width:86%;"> 
                                <Option :value="1">角色1</Option>
                                <Option :value="2">角色2</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">关闭</Button>
                <Button type="primary"  @click="addRole()">确定</Button>
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
    import qs from 'qs'
    export default {
        data () {
            return {
                data1: [],
                value3: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
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
                        title: '真实姓名',
                        key: 'personname'
                    },
                    {
                        title: '角色名称',
                        key: 'roleName',
                    },
                    {
                        title: '角色级别',
                        key: 'level'
                    },
                    {
                        title: '单位名称',
                        key: 'departmentName'
                    },
                    {
                        title: '部门名称',
                        key: 'institutionName',
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
        created(){
              let that = this;
              
              this.axios({
                  method: 'get',
                  url:'http://localhost:8096/user/getUserList',
              }).then(function(result){
                that.data1 = result.data.obj;
              })
        },
        methods: {
            cleardata() {
                for(let key in this.formData) {
                    this.formData[key] = ''
                }
            },
            formatTime ( fmt ){
                var o = {           
                "M+" : this.getMonth()+1, //月份           
                "d+" : this.getDate(), //日           
                "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时           
                "H+" : this.getHours(), //小时           
                "m+" : this.getMinutes(), //分           
                "s+" : this.getSeconds(), //秒           
                "q+" : Math.floor((this.getMonth()+3)/3), //季度           
                "S" : this.getMilliseconds() //毫秒           
                };           
                var week = {           
                "0" : "/u65e5",           
                "1" : "/u4e00",           
                "2" : "/u4e8c",           
                "3" : "/u4e09",           
                "4" : "/u56db",           
                "5" : "/u4e94",           
                "6" : "/u516d"          
                };           
                if(/(y+)/.test(fmt)){           
                    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));           
                }           
                if(/(E+)/.test(fmt)){           
                    fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);           
                }           
                for(var k in o){           
                    if(new RegExp("("+ k +")").test(fmt)){           
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));           
                    }           
                }           
                return fmt;           
            },
            formatDate (date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
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


<style>
.company_box {
    margin: 12px;
    position: relative;
}
.comMsg {
    background: #fff;
    padding:24px;
    margin-bottom: 20px;
}

.demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
}
.btnMedal {
    position: absolute;
    top: -2px;
    right: 0px;
}

.ivu-form .ivu-form-item-label {
    width:60px;
}

</style>
