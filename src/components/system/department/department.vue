<template>
    <div class="company_box">
        <div style="margin:18px;">
            <Title :title="'部门管理'"></Title>
            <Button  class="btnMedal" @click="addModalShow" type="primary" style="margin-right:50px;">添加</Button>
        </div>
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
                    <!-- <Col span="24">
                        <FormItem label="领导" label-position="top">
                            <Input v-model="formData.leader" placeholder="请输入领导名称" style="width:86%;"/>
                        </FormItem>
                    </Col> -->
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
                <!-- <Button type="primary" shape="circle" icon="ios-create-outline" @click="modifyItem(row,index)"></Button> -->
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

    import { getDepartment,removeDepartment,addDepartment} from '@/http/api';

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
                        title: '操作人',
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
        mounted () {
            getDepartment().then(res => {
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
                addDepartment(datas).then(res => {
                    if(res.success) {
                         this.value3 = false
                         this.data1.push(that.formData);
                    }
                })
                // if(this.num==1) {
                //     this.axios.post('http://localhost:8096/departMent/add', qs.stringify(datas)).then(function (result) {
                //         if(result.data.success){
                //             that.value3 = false,
                //             that.data1.push(that.formData);
                //         }
                //     })
                // }else {
                //     this.axios.post('http://localhost:8096/departMent/updateDepartMent', qs.stringify(datas)).then(function (result) {
                //         if(result.data.success){
                //             that.value3 = false
                //             that.data1.splice(index,1,that.formData)
                //         }
                //     })
                // }
            },
            removeParent( row,index ) {
                
                removeDepartment(row.id).then(res => {
                })
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
            // modifyItem( row,index ) {
            //     this.value3 = true;
            //     this.num = 2;
            //     let that = this;
            //     this.axios.get('http://localhost:8096/departMent/selectById/'+row.id).then(function (result) {
            //         if(result.data.success){
            //             that.formData = result.data.obj;
                        
            //         }
            //     })
            // },
            
        },
        components:{
            Title
        }
    }
</script>


<style lang="less" scope>
.company_box {
    position: relative;
}
.comMsg {
    background: #fff;
    padding:24px;
    margin-bottom: 20px;
}
.ivu-table-wrapper {
    border:0;
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
.ivu-table th {
    text-align: center;
    font-size:16px;
    height: 50px;
    color:#5b5b5b;
}
.ivu-table-stripe .ivu-table-body tr.ivu-table-row-hover td, .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-hover td {
    background-color: #f1f6ff;
}
.ivu-table-stripe .ivu-table-body tr td, .ivu-table-stripe .ivu-table-fixed-body tr td {
    text-align: center;
    font-size: 14px;
}
.ivu-table-stripe .ivu-table-body tr td, .ivu-table-stripe .ivu-table-fixed-body tr td {
    background-color: #f1f6ff;
}
</style>
