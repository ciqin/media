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
                <Button shape="circle" icon="ios-create-outline"></Button>
                <Button shape="circle" icon="ios-trash-outline" @click="removeParent( row , index)"></Button>
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
    
    import '../../../assets/css/system.css';

    import { getRole,removeRole,addRole} from '@/http/api';

    export default {
        data () {
            return {
                data1: [],
                value3: false,
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
                addRole(datas).then(res => {
                    if(res.success) {
                         this.value3 = false
                         this.data1.push(that.formData);
                    }
                })
            },
            removeParent( row,index ) {
                console.log( row , index)
                // removeDepartment(row.id).then(res => {
                // })
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
