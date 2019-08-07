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
                             <Input  placeholder="请输入部门名称" v-model="formData.departMentName" />
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

    import { getRole,removeRole,addRole} from '@/http/api';

    export default {
        data () {
            return {
                data1: [
                    // {
                    //     createTime: 1553797251000,
                    //     depId: 9,
                    //     departMentName: "部门6666",
                    //     id: 1,
                    //     institutionId: 2,
                    //     institutionName: "单位31231231231",
                    //     level: 4,
                    //     name: "普通用户",
                    //     userId: null
                    // },
                    // {
                    //     createTime: 1553797251000,
                    //     depId: 9,
                    //     departMentName: "部门6",
                    //     id: 1,
                    //     institutionId: 2,
                    //     institutionName: "单位3",
                    //     level: 4,
                    //     name: "超级管理员",
                    //     userId: null
                    // }
                ],
                value3: false,
                modal1: false,
                removeid:null,
                addInput:[],
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    position: 'static',
                    padding: '210px 80px 0 80px'
                },
                num:1,
                formData: {
                    name: "",
                    createTime: "",
                    email: null,
                    departMentName:"",
                    leader: "",
                },
                tableColumns1: [
                    {
                        title: '管理员名称',
                        key: 'name'
                    },
                    {
                        title: '部门名称',
                        key: 'departMentName'
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
            getRole().then(res => {
                console.log(res)
            })
        },
        methods: {
            cleardata() {
                for(let key in this.formData) {
                    this.formData[key] = ''
                }
            },
             ok () {
                //  removeUser({"id":row.id}).then(res => {
                //      res.success?this.$message('删除成功'):this.$message('删除失败')
                //  })
                this.data1.splice(this.removeid,1)
            },
            addRole(){
                //let datas = this.formData,that = this;
                if(this.num==1) {
                    // addUser(this.formData).then(( res ) => {
                    //     if(res.success) {
                    //         this.value3 = false;
                    //     }
                    // })
                    this.data1.push(this.formData)
                    this.value3 = false;
                }else {
                    // updateUser(this.formData).then(() => {
                    //     if(res.success) {
                    //         this.value3 = false;
                    //         this.data1.splice(index,1,that.formData)
                    //     }
                    // })
                    this.data1.splice(this.removeid,1,this.formData)
                    this.value3 = false;
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
                addRole(datas).then(res => {
                    if(res.success) {
                         this.value3 = false
                         this.data1.push(that.formData);
                    }
                })
            },
            removeParent( row,index ) {
                this.modal1 = true;
                this.removeid = index;
            },
             modifyItem( row,index ) {
                this.value3 = true;
                this.titleName = "用户管理修改";
                this.num = 2;
                this.removeid = index,
                // selectByIdtUser({id:row.id}).then(( res ) => {               
                //     if(res) {
                //         this.formData.name = res.username
                //         this.formData.departMentName = res.departMentName
                //         this.formData.email = res.email
                //     }
                // })
                this.formData.username = row.username
                this.formData.departMentName = row.departMentName
                this.formData.email = row.email
            },
            //  添加输入框
            // addInputF(){
            //     let rendom =Math.random().toString(36).substr(2)
            //     this.addInput.push(rendom)
            // },
            //  删除输入框
            // removeInputF(item,index){
            //     this.addInput.splice(index, 1);
            // }
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
