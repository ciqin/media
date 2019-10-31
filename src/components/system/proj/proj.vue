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
                        <FormItem label="行业名称:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input  placeholder="请输入项目名称" v-model="formData.name" />
                        </FormItem>
                    </Col>
                    <Col span="24" v-if="showFlag">
                        <FormItem label="所属领域:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                            <select class="MaterialList" style="width:100%;" v-model="formData.id">
                                <!-- <option value="1">媒体行业应用案例</option>
                                <option value="2">政务领域应用案例</option>
                                <option value="3">舆情领域应用案例</option>
                                <option value="4">警务领域应用案例</option> -->
                                <option :value="vendor.autoId" v-for="(vendor,index) in vendorArr" :key="index">{{vendor.name}}</option>
                            </select>
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
                fid:3,
                value3: false,
                showFlag:0,
                addInput:[],
                vendorArr:[],
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
                    name:'',
                    // caseId:'',
                    // autoId:''
                    id:''
                },
                tableColumns1: [
                    
                    {
                        title: '项目名称',
                        key: 'name'
                    },
                    {
                        title: '行业名称',
                        key: 'vendorName'
                    },
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
            
            this.loadContent();

        },
        methods: {
            cleardata() {
                for(let key in this.formData) {
                    this.formData[key] = ''
                }
            },
            tidyData(data){
                let result = [];
                data.forEach(function(v){
                    
                    if(v.children&&v.children.length){
                        v.children.forEach(function(v2){
                            let el = {};
                            el.vendorName = v.name;
                            el.autoId = v2.autoId;
                            el.name = v2.name;
                            el.updateTime = v2.updateTime;
                            result.push(el);
                        });
                    }
                });
                return result;
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
            addRole(){
                let datas = this.formData;
                datas.ContentType = true;

                // api for modifying the row data
                // and refresh the new data
                let name = this.formData.name;
                let fid = this.formData.id;
                if(this.showFlag){
                    
                    let sort;
                    if(!name||!fid){
                        this.$message('请输入名称并选择行业');
                        return
                    }
                    let vendorArr = this.vendorArr;
                    let index = _.findIndex(vendorArr,function(o){return o.autoId==fid});
                    if(index!=-1){
                        sort = vendorArr[index].len;
                        addApplicationCase({'name':name,'fid':fid,'sort':sort}).then(res=>{
                            this.$message('添加成功');
                            this.loadContent()
                        })
                    }
                    
                }else{
                    updateVendor({'newName':name,'id':fid}).then(res=>{
                        this.$message('修改成功');
                        this.loadContent()
                    })
                }
                this.value3 = false;
                
            },
            ok() {
                    // remove the row data and refresh the data
                    let id = this.removeId
                    deleteVendor({'id':id}).then(res=>{
                        this.$message('删除成功');
                        this.loadContent();
                    })

            },
            loadContent(){
                let fid = this.fid;
                let param = {'fid':fid}
                getProductDemo(param).then(res =>{
                    let data = this.tidyData(res)
                    this.data1 = data;
                    let vendorArr = [];
                    res.forEach(function(v){
                        let el = {};
                        el.name = v.name;
                        el.autoId = v.autoId;
                        el.len = v.children.length;
                        vendorArr.push(el);
                    });
                    this.vendorArr = vendorArr;
                })
            },
            modifyItem(row,index){
                this.value3 = true;
                this.formData.name = row.name;
                this.formData.id = row.autoId;
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
