<template>
    <div class="company_box">
        <Title :title="'单位管理'"></Title>
        <Button  class="btnMedal" @click="addModalShow" type="primary">添加</Button>
        <!-- 模态框 -->
        <Drawer
            title="单位管理添加"
            v-model="value3"
            width="720"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="单位名称" label-position="left">
                            <Input v-model="formData.name" placeholder="请输入单位名称"  style="width:86%;"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="负责人" label-position="top">
                            <Input v-model="formData.leader" placeholder="请输入负责人" style="width:86%;"/>
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
                        <FormItem label="邮编" label-position="top">
                            <Input v-model="formData.zipCode" placeholder="请输入邮编" style="width:86%;"/>
                        </FormItem>
                    </Col>
                      <Col span="24">
                        <FormItem label="网站" label-position="top">
                            <Input v-model="formData.web" placeholder="请输入网站" style="width:86%;"/>
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
                    contacter: "",
                    createTime: "",
                    dbindex: null,
                    dbip: null,
                    email: "",
                    fax: "",
                    id: 1,
                    leader: "",
                    name: "",
                    note: "",
                    status: 0,
                    telephone: "",
                    web: null,
                    zipCode: null,
                },
                tableColumns1: [
                    {
                        title: '单位名称',
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
        created(){
              let that = this;
              this.axios({
                  method: 'get',
                  url:'http://localhost:8096/institution/getList',
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
                    this.axios.post('http://localhost:8096/institution/add', qs.stringify(datas)).then(function (result) {
                        if(result.data.success){
                            that.value3 = false
                            that.data1.push(that.formData);
                        }
                    })
                }else {
                    this.axios.post('http://localhost:8096/institution/update', qs.stringify(datas)).then(function (result) {
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
                        url:'http://localhost:8096/institution/deleteById/'+row.id,
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
                this.axios.get('http://localhost:8096/institution/selectById/'+row.id).then(function (result) {
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
