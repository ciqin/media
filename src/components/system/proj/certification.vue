<template>
    <div class="company_box">
        <div style="margin:18px;">
            <Title :title="'项目管理'"></Title>
            <Button  class="btnMedal" @click="addModalShow" type="primary" style="margin-right:50px;">添加</Button>
        </div>
        <Drawer
            title="项目管理"
            v-model="value3"
            width="660"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="项目名称:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input  placeholder="请输入项目名称" v-model="formData.name" />
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
            <!-- <template slot-scope="{ row, index }" slot="action"> -->
                <!-- <Button type="primary" shape="circle" icon="ios-create-outline" @click="modifyItem(row,index)"></Button> -->
                <!-- <Button type="primary" shape="circle" icon="ios-trash-outline" @click="removeParent(row,index)"></Button> -->
            <!-- </template> -->
            <template  slot="action" slot-scope="{ row }" >
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

    import { getDepartment,removeDepartment,addDepartment,getProductDemo,addApplicationCase,updateVendor,deleteVendor} from '@/http/api';

    export default {
        data () {
            return {
                data1: [],
                fid:5,
                showFlag:0,
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
                    name:''
                },
                tableColumns1: [
                    {
                        title: '项目名称',
                        key: 'name'
                    },
                    // {
                    //     title: '操作人',
                    //     key: 'userName'
                    // },
                    {
                        title: '创建时间',
                        key: 'insertTime',
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
            // let fid = this.fid;
            // let param = {'fid':fid}
            // getProductDemo(param).then(res =>{
            //     this.data1 = res
            // })
            this.loadContent();

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
               this.showFlag = 1;
            },
            changePage () {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                this.tableData1 = this.mockTableData1();
            },
            loadContent(){
                let fid = this.fid;
                let param = {'fid':fid}
                getProductDemo(param).then(res =>{
                    this.data1 = res
                })
            },
            addRole(){
                let datas = this.formData;
                datas.ContentType = true;
                let name = this.formData.name;
                this.value3 = false;
                if(this.showFlag){
                    
                    // api for modifying the row data
                    // and refresh the new data
                    let fid = this.fid;
                    let len = this.data1.length+1;
                    let sort = len;
                    
                    addApplicationCase({'name':name,'fid':fid,'sort':sort}).then(res =>{
                        this.$message('添加成功');
                        this.loadContent();
                    })
                }else{
                    let id = this.formData.autoId;
                    updateVendor({'newName':name,'id':id}).then(res=>{
                        this.$message('修改成功');
                        this.loadContent();
                    })
                }
                
                
            },
            ok() {
                    // remove the row data and refresh the data 
                    let id = this.removeId;
                    deleteVendor({'id':id}).then(res =>{
                        this.$message('删除成功');
                        this.loadContent();
                    })
            },
            modifyItem(row,index){
                this.value3 = true;
                this.formData.name = row.name;
                this.formData.autoId = row.autoId;
                this.showFlag = 0;
                
            },
            removeParent( row,index ) {
                this.modal1 = true;
                this.removeId = row.autoId;
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
