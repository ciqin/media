<template>
    <div class="company_box">
        <Title :title="'部门管理'"></Title>
        <Button  class="btnMedal" @click="addModalShow" type="primary">添加</Button>
        <!-- 模态框 -->
        <Drawer
            title="部门管理添加"
            v-model="value3"
            width="720"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="部门名称" label-position="left">
                            <Input v-model="formData.name" placeholder="请输入部门名称"  style="width:86%;"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="领导" label-position="top">
                            <Input v-model="formData.leader" placeholder="请输入领导名称" style="width:86%;"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="联系人" label-position="top">
                            <Input v-model="formData.contacter" placeholder="请输入联系人名称" style="width:86%;"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="地址" label-position="top">
                            <Input v-model="formData.address" placeholder="请输入地址" style="width:86%;"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="电话" label-position="top">
                            <Input v-model="formData.telephone" placeholder="请输入电话" style="width:86%;"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="传真" label-position="top">
                            <Input v-model="formData.fax" placeholder="请输入传真" style="width:86%;"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="邮件" label-position="top">
                            <Input v-model="formData.email" placeholder="请输入邮件" style="width:86%;"/>
                        </FormItem>
                    </Col>
                     <Col span="24">
                        <FormItem label="备注" label-position="top">
                            <Input v-model="formData.note" placeholder="请输入备注" style="width:86%;"/>
                        </FormItem>
                    </Col>
                     <Col span="24">
                        <FormItem label="所属单位" label-position="top">
                            <Select v-model="formData.approver" placeholder="请输入单位" style="width:86%;"> 
                                <Option value="1">单位1</Option>
                                <Option value="2">单位2</Option>
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
                        title: '部门名称',
                        key: 'name'
                    },
                    {
                        title: '单位名称',
                        key: 'leader'
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
                  url:'http://localhost:8096/departMent/getList',
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
                "M+" : that.getMonth()+1, //月份           
                "d+" : that.getDate(), //日           
                "h+" : that.getHours()%12 == 0 ? 12 : that.getHours()%12, //小时           
                "H+" : that.getHours(), //小时           
                "m+" : that.getMinutes(), //分           
                "s+" : that.getSeconds(), //秒           
                "q+" : Math.floor((that.getMonth()+3)/3), //季度           
                "S" : that.getMilliseconds() //毫秒           
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
                    fmt=fmt.replace(RegExp.$1, (that.getFullYear()+"").substr(4 - RegExp.$1.length));           
                }           
                if(/(E+)/.test(fmt)){           
                    fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[that.getDay()+""]);           
                }           
                for(var k in o){           
                    if(new RegExp("("+ k +")").test(fmt)){           
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));           
                    }           
                }           
                return fmt;           
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
                    this.axios.post('http://localhost:8096/departMent/add', qs.stringify(datas)).then(function (result) {
                        if(result.data.success){
                            that.value3 = false,
                            that.data1.push(that.formData);
                        }
                    })
                }else {
                    this.axios.post('http://localhost:8096/departMent/updateDepartMent', qs.stringify(datas)).then(function (result) {
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
                        url:'http://localhost:8096/departMent/deleteById/'+row.id,
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
                this.axios.get('http://localhost:8096/departMent/selectById/'+row.id).then(function (result) {
                    if(result.data.success){
                        that.formData = result.data.obj;
                        
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
