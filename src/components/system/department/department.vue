<template>
    <div class="company_box">
        <div style="margin:18px;">
            <Title :title="'部门管理'"></Title>
            <Button  class="btnMedal" @click="addModalShow" type="primary" style="margin-right:50px;">添加</Button>
        </div>
        <Drawer
            :title="num?'部门添加':'部门编辑'"
            v-model="value3"
            width="660"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="部门名称:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input  placeholder="请输入部门名称" v-model="formData.name" />
                        </FormItem>
                    </Col>
                    <!-- <Col span="24" style="margin-top:12px;" v-for="(item , index) in addInput" :key="item">
                        <div style="width:420px;margin:0 auto;">
                            <Input  placeholder="请输入部门名称"  style="width:370px;"/>
                            <Icon type="md-close" :size="26" style="margin-left:16px;" @click="removeInputF(item,index)"/>
                        </div>
                    </Col> -->
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
            <template slot-scope="{ row, index }" slot="action">
                
                <Button shape="circle" icon="ios-create-outline" @click="modifyItem(row,index)"></Button>
                <Button shape="circle" icon="ios-trash-outline" @click="removeParent(row,index)"></Button>
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

    import { getDepartment,removeDepartment,addDepartment,updateDepartment} from '@/http/api';

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
                modal1: false,
                removeId:0,
                formData: {
                    id:null,
                    address: "",
                    contacter: null,
                    email: null,
                    fax: "",
                    leader: "",
                    name: "",
                    note: null,
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
                this.data1 = res
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
                let datas = this.formData;
                datas.ContentType = true;
                if(this.num==1){

                    addDepartment(datas).then(res => {
                        if(res.success) {
                            getDepartment().then(res => {
                                this.value3 = false;
                                this.data1 = res;
                            })
                        }
                    })
                }else{
                    let id = datas.id;
                    let name = datas.name;
                    let data = {id:id,name:name}
                    updateDepartment(data).then(res=>{
                        this.$message("修改成功");
                        getDepartment().then(res => {
                                this.value3 = false;
                                this.data1 = res
                        })
                    }).catch(()=>{
                        this.$message("修改失败")
                    })
                }
            },
            ok() {
                    removeDepartment({ContentType:true,id:this.removeId}).then(res => {
                        if(res.success){
                            getDepartment().then(res => {
                                this.data1 = res
                            })
                        }
                    })
            },
            modifyItem(row,index){
                this.value3 = true;
                this.formData.name = row.name;
                this.formData.id = row.id;
                this.num= 0;
            },
            removeParent( row,index ) {
                this.modal1 = true;
                this.removeId = row.id;
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
