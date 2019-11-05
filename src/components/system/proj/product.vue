<template>
    <div class="company_box">
        <div style="margin:18px;">
            <Title :title="'产品物料'"></Title>
            <Button  class="btnMedal" @click="addModalShow" type="primary" style="margin-right:50px;">添加</Button>
        </div>
        <Drawer
            title="产品管理"
            v-model="value3"
            width="660"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="产品名称:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input  placeholder="请输入产品名称" v-model="formData.name" />
                        </FormItem>
                        <FormItem v-if="showFlag"
                            label="图片文件:"
                            :format="['png']"
                            label-position="left"
                            calss="formitem"
                            style="width:100%;margin:0 auto;margin-top: 16px;">
                                <Upload :before-upload="handleUpload"
                                    action="//jsonplaceholder.typicode.com/posts/" class="updata">
                                    <Button icon="ios-cloud-upload-outline" style="width:100%;">{{fileName}}</Button>
                                </Upload>
                        </FormItem>
                    </Col>
                    <div v-if="show" style="color:red;">上传图片不能为空</div>
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

    import { getDepartment,removeDepartment,addDepartment,getProductDemo,updateVendor,deleteVendor,uploadFile2} from '@/http/api';

    export default {
        data () {
            return {
                data1: [],
                fid:1,
                show:false,
                showFlag:0,
                fileName:'上传30*30的png图片',
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
                    name:'',
                    file:''
                },
                tableColumns1: [
                    {
                        title: '产品名称',
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
                this.fileName = '上传30*30的png图片';
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
                
                if(this.showFlag){
                    
                    // api for modifying the row data
                    // and refresh the new data
                    let fid = this.fid;
                    let len = this.data1.length+1;
                    let sort = len;
                    let file = this.formData.file;
                    let data  = new FormData();
                    data.append('name',name);
                    data.append('fid',fid);
                    data.append('sort',sort);
                    if(!file){
                        this.show = true;
                        return;
                    }
                    data.append('file',file);
                    uploadFile2(data).then(res =>{
                        this.$message('添加成功');
                        this.loadContent();
                        this.value3 = false;
                    })
                }else{
                    let id = this.formData.autoId;
                    updateVendor({'newName':name,'id':id}).then(res=>{
                        this.$message('修改成功');
                        this.loadContent();
                        this.value3 = false;
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
                this.formData = row;
                this.showFlag = 0;
                
            },
            removeParent( row,index ) {
                this.modal1 = true;
                this.removeId = row.autoId;
            },
            handleUpload(file){
                
                if(file!=null){
                   
                    // let fileExt = ['pdf','doc','docx','ppt','pptx','mp4'];
                    let fileExt = ['png'];
                    // checkup the image uploaded width and height
                    var isAllowed = true;
                    let reader = new FileReader();
                    let height = 30,width = 30;
                    let that = this
                    reader.onload = function(e){
                        let data = e.target.result;
                        let image = new Image();
                        image.onload = function(e){
                            let $width = image.width;
                            let $height = image.height;
                            debugger;
                            if($width!=width||$height!=height){
                                isAllowed = false;
                                that.fileName = "请确定图片的宽高为30*30";
                                
                            }else{
                                let flag = that.extFilter(file.name,fileExt);
                                if(flag){
                                    that.fileName = file.name;
                                    that.formData.file = file;
                                    that.formData.fileName = file.name;
                                }else{
                                    that.fileName = "格式不正确"
                                }
                            }
                        }
                        image.src = data;

                    };
                    reader.readAsDataURL(file);
                    
                    // if(!isAllowed){
                    //     this.fileName = "请确定图片的宽高为30*30";
                    //     return false;
                    // }
                    // console.log(isAllowed)
                    
                }
                
                return false;
            },
            extFilter: function(extName,condition) {
                let nameArr = extName.split('.');
                
                if(nameArr.length>1){
                        let len = nameArr.length;
                        let ext = nameArr[(len-1)].toLowerCase();
                        
                        let index = _.findIndex(condition,(o)=>{return o == ext});
                        
                        if(index==-1){
                            this.$message("请输入正确格式的文件");
                            return false;
                        }else{
                            return true;
                        }
                        
                    }else{
                         this.$message("请输入正确格式的文件");
                         return false;
                         
                    }
            },

        },//method 结束
        
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
