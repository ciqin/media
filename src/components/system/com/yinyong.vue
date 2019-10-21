<template>
    <div class="company_box">
        <!-- 应用案例添加-->
        <Drawer :title="dataName" v-model="value3" width="660" :mask-closable="false" :styles="styles">
            <Form :model="formData1">
                <Row :gutter="32">
                <Col span="24">
                    <FormItem
                        label="案例名称:"
                        label-position="left"
                        calss="formitem"
                        style="width:100%;margin:0 auto;">
                        <Input placeholder="请输入文件案例名称" v-model="formData1.name"/>
                    </FormItem>
                </Col>
                <Col span="24" style="margin-top: 16px;">
                         <FormItem label="所属领域:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                            <select class="MaterialList" style="width:100%;" v-model="formData1.casesId">
                                <!-- <option value="1">媒体行业应用案例</option>
                                <option value="2">政务领域应用案例</option>
                                <option value="3">舆情领域应用案例</option>
                                <option value="4">警务领域应用案例</option> -->
                                <option :value="vendor.autoId" v-for="(vendor,index) in vendorsArr" :key="index">{{vendor.name}}</option>
                            </select>
                        </FormItem>
                </Col>
                <!-- <Col span="24" style="margin-top: 16px;">
                         <FormItem label="PPT:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                            
                             <Upload
                                multiple
                                action="//jsonplaceholder.typicode.com/posts/" class="updata" v-model="formData1.ppts">
                                <Button icon="ios-cloud-upload-outline" style="width:100%;">ppt上传(支持多个文件)</Button>
                            </Upload>
                        </FormItem>
                </Col>
                <Col span="24" style="margin-top: 16px;">
                         <FormItem label="word:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Upload
                                multiple
                                action="//jsonplaceholder.typicode.com/posts/" class="updata" v-model="formData1.words">
                                <Button icon="ios-cloud-upload-outline" style="width:100%;">word上传(支持多个文件)</Button>
                            </Upload>
                        </FormItem>
                </Col>
                <Col span="24" style="margin-top: 16px;">
                         <FormItem label="产品册:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Upload
                                multiple
                                action="//jsonplaceholder.typicode.com/posts/" class="updata" v-model="formData1.brochures">
                                <Button icon="ios-cloud-upload-outline" style="width:100%;">产品册上传(支持多个文件)</Button>
                            </Upload>
                        </FormItem>
                </Col>
                <Col span="24" style="margin-top: 16px;">
                         <FormItem label="视频:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Upload
                                multiple
                                action="//jsonplaceholder.typicode.com/posts/"  class="updata"  v-model="formData1.videos">
                                <Button icon="ios-cloud-upload-outline" style="width:100%;">视频上传(支持多个文件)</Button>
                            </Upload>
                        </FormItem>
                </Col>
                <Col span="24" style="margin-top: 16px;">
                         <FormItem label="地址名称:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input   v-model="formData1.linkName" />
                        </FormItem>
                </Col>
                <Col span="24" style="margin-top: 16px;">
                         <FormItem label="链接:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input   v-model="formData1.link" />
                        </FormItem>
                </Col> -->
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button type="primary" class="setW" @click="addCase()" style="margin-right:16px;">确定</Button>
                <Button class="setW" @click="value3 = false">关闭</Button>
            </div>
        </Drawer>
        <!-- 子文档添加 -->
        <Drawer :title="fileTypeName" v-model="value4" width="660" :mask-closable="false" :styles="styles">
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="20" v-if="fileTypeName=='地址'">
                        <div v-for="(item,index) in formData" :key="index">
                        <FormItem
                        :label="'产品名称'+index+':'"
                        label-position="left"
                        calss="formitem"
                        style="width:100%;margin:0 auto;">
                            <Input  v-model = "item.linkName"/>
                        </FormItem>
                        <FormItem
                        :label="'链接'+index+':'"
                        label-position="left"
                        calss="formitem"
                        style="width:100%;margin:0 auto;">
                            <Input  v-model = "item.link"/>
                        </FormItem>
                        </div>
                         <FormItem label="操作人：" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input :value="userName" disabled />
                        </FormItem>
                    </Col>
                    
                    <Col span="20" v-else>
                        <div v-for="(item,index) in formData" :key="index">
                            <FormItem
                            :label="'产品名称'+index+':'"
                            label-position="left"
                            calss="formitem"
                            style="width:100%;margin:0 auto;">
                                <Input v-model="item.name"/>
                            </FormItem>
                            <FormItem
                            :label="fileTypeName+'文件'+index+':'"
                            label-position="left"
                            calss="formitem"
                            style="width:100%;margin:0 auto;">
                                <Upload :before-upload="handleUpload"
                                    action="//jsonplaceholder.typicode.com/posts/" class="updata">
                                    <Button icon="ios-cloud-upload-outline" style="width:100%;">选择文件</Button>
                                </Upload>
                            </FormItem>
                            
                       
                        </div>
                         <FormItem label="操作人：" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input :value="userName" disabled />
                        </FormItem>
                    </Col>
                    <!-- <Icon type="ios-add" size="24" @click=""/> -->
                    <Button icon="ios-add" @click="addFileItem()" ></Button>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button type="primary" class="setW" @click="addRole()" style="margin-right:16px;">确定</Button>
                <Button class="setW" @click="closeFileAdd()">关闭</Button>
            </div>
        </Drawer>
        <div style="padding:18px 18px 0 18px;border-bottom:1px solid #d1d1d1;">
             <Row>
                <Col span="3"><Title :title="guanli+'管理'"></Title></Col>
                <Col span="19"> 
                    <select class="MaterialList" v-model="selectedCases.v">
                        <!-- <option value="1">媒体行业应用案例</option>
                        <option value="2">政务领域应用案例</option>
                        <option value="3">舆情领域应用案例</option>
                        <option value="4">警务领域应用案例</option> -->
                        <option :value="vendor.autoId" v-for="(vendor,index) in vendorsArr" :key="index">{{vendor.name}}</option>
                    </select>
                     <select class="MaterialList" style="margin-left: 30px;" v-model="selectedCases.c">
                        <option :value="cases.autoId" v-for="(cases,index) in caseArr" :key="index">{{cases.namechild}}</option>
                    </select>
                </Col>
                <Button  class="btnMedal" @click="addModalShow" type="primary" style="margin-left: 70px;">添加应用案例</Button>
            </Row>
        </div>
        
        <Modal
            v-model="modal1"
            title=""
            @on-ok="ok">
            确定删除吗？
        </Modal>
        <!-- 编辑按钮 -->
        <Drawer :title="fileTypeName" v-model="value5" width="660" :mask-closable="false" :styles="styles">
            <Form :model="formData">
                <Row :gutter="32">
                    <!-- <Col span="20" v-if="fileTypeName=='地址'">
                        <FormItem label="产品名称：" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input v-model="fileInfo.name" />
                        </FormItem>
                        <FormItem label="地址链接：" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input v-model="fileInfo.name" />
                        </FormItem>
                        <FormItem label="操作人：" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input :value="username" disabled />
                        </FormItem>
                    </Col> -->
                    <Col span="20">
                        <FormItem label="产品名称：" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input v-model="fileInfo.name" />
                        </FormItem>
                        <FormItem label="操作人：" label-position="left" calss="formitem" style="width:100%;margin:0 auto;">
                             <Input :value="userName" disabled />
                        </FormItem>
                    </Col>
                    
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button type="primary" class="setW" @click="submitItemInfo()" style="margin-right:16px;">确定</Button>
                <Button class="setW" @click="closeFileAdd()">关闭</Button>
            </div>
        </Drawer>
        <div v-for="(item,index) in data" :key="item.title">
            <div class="clearfix">
                <div class="titleChild">
                    <img src="/static/images/icon/ppt_icon.png" >
                    <span>{{item.title}}</span>
                </div>
                <Button  class="btnMedalChild" @click="addModalCase(item.title)" type="primary" style="margin-right: 25px;">添加文件</Button>
            </div>
            <div>
                <Table :data="item.data" :columns="tableColumns1" stripe>
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template  slot="action" slot-scope="{ row }" >
                        <Button shape="circle" icon="ios-create-outline" @click="editItem(row)"></Button>
                        <Button shape="circle" icon="ios-trash-outline" @click="deleteItem(row)"></Button>
                    </template>
                </Table>
            </div>
        </div>
        
    </div>
</template>
<script>
    import Title from "@/components/assembly/title";
    import {momentDate} from "@/common/utils/utilDateFormat"
    import qs from 'qs'
    import { getDepartment,removeDepartment,getapplicationList,getUserurl,updateFileInfo,removeFile,addApplicationCase,getContentList,updateCaseName,deleteFile,getCasesContent} from '@/http/api';
    import {mapState} from 'vuex'
    import "../../../assets/css/system.css";
    export default {
        data () {
            return {
                userName: localStorage.getItem("user"),
                fileTypeIndex: '',
                fileItemIndex: '',
                data1: [],
                data:[],
                value3: false,
                value4: false,
                value5: false,
                modal1: false,
                
                fileTypeName: '',
                files: [],
                fileInfo: {
                    name: '',
                    // author: '',
                    id: '',
                    createtime: ''

                },
                styles: {
                    height: "calc(100% - 55px)",
                    overflow: "auto",
                    padding: "210px 80px 0 80px",
                    position: "static"
                },
                // caseArr:[{
                //     name:'新华社'
                // },{
                //     name:'新华社1'
                // },{
                //     name:'新华社2'
                // }],
                vendorsArr:[],
                caseArr: [],
                num:1,
                dataName: "应用案例添加",
                formData1: {
                    name: "",
                    casesId: '',
                },
                formData: [{
                    name: "",
                    files: null,
                    link: '',
                    linkName: ''
                }],
                itemData: {
                    
                },
                selectedCases:{ //下拉框级联选择
                    'v': '',
                    'c': ''
                },
                tableColumns1: [
                    {
                        title: '产品名称',
                        key: 'names'
                    },
                    {
                        title: '操作人',
                        key: 'operation'
                    },
                    {
                        title: '更改时间',
                        key: 'createtime',
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
        computed: {
            // cosnole.log(this.$store.state)
            // this.dataTypes = this.$store.state.guanli;
            // guanli(){
            //     return  this.$store.state.guanli
            // },
            ...mapState(['guanli'])
        },
        // watch:{
        //    guanli(newVal){
        //        console.log(newVal)
        //    } 
        // },
         mounted () {
            // getapplicationList().then(res => {
            //     this.data = res
            // });
            
            let param = {'fid':this.$route.params.id};
            // getUserurl().then(res=>{
               getContentList(param).then(res => {
                this.vendorsArr = res.obj;
                // this.caseArr = this.vendorsArr[0].demonstrationArr;
                this.caseArr = this.vendorsArr[0].children;
                this.selectedCases.v = this.vendorsArr[0].autoId?this.vendorsArr[0].autoId:'';
                
                this.selectedCases.c = this.caseArr?this.caseArr[0].autoId:'';
                // 加载内容信息
                loadCasesContent();
                
            });
        },
        methods: {
            cleardata() {
                for(let key in this.formData) {
                    this.formData[key] = ''
                }
                
            },
            changeTable() {
                
            },
            handleUpload(file){
                if(file!=null){
                    this.files.push(file);
                }
                // console.log(index);
                console.log(file.name);
                return false;
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
                
                let data = new FormData();
                let pid = this.selectedCases.c;
                data.append('pid',pid)
                if(this.fileTypeName!="地址"){
                    this.formData.forEach((v,i) => {
                        // files.concat(v.files[0]);
                        // console.log(v);
                        if(v.name!=''){
                            // data.append('productName'+i,v.name);
                            // data.append('file'+i,v.files[0]);
                            data.append('disName',v.name);
                            
                        }
                    });
                    this.files.forEach((v,i) =>{
                        data.append('files',v);
                    })
                    
                    uploadFile(data).then(res => {
                        // getapplicationList().then(res => {
                        //     this.data = res
                        // });
                        // 重新加载内容数据
                        loadCasesContent();
                        this.$message("添加成功");
                    });
                }else{
                    // data.append('linkName',this.formData.linkName);
                    // data.append('link',this.formData.link);
                    for(i in formData){
                        data.append('linkName'+i,this.formData[i].linkName);
                        data.append('link'+i,this.formData[i].link);
                    }
                    addLink(data).then(res => {
                        getapplicationList().then(res => {
                            this.data = res;
                        });
                        this.$message("添加成功");
                    });
                }
                this.clearFileData();
                //store data function
                
            },
            closeFileAdd(){
                this.clearFileData();
            },
            addCase() {
                this.value3 = false;
                // this.formData1.cases = this.data[parseInt(this.casesId)].title;
                // let data = new FormData();
                // Object.keys(formData1).forEach((v,i)=>{
                //     data.append(v,this.formData1[v]);
                // })
                // let param = qs.stringify({'fid':this.formData1.casesId,'name':this.formData1.name});
                let sort = this.caseArr?this.caseArr.length+1:1;
                let param = {'fid':this.formData1.casesId,'name':this.formData1.name,'sort':sort};

                addApplicationCase(param).then(res=>{
                    this.$message("添加成功");
                    // 重载产品列表
                    
                    // getUserurl().then(res=>{
                    //     this.vendorsArr = res;
                    //     //用户列表选择到最新加入的
                    //     this.selectedCases.v = this.formData1.casesId;
                    //     this.selectedCases.c = this.vendorsArr.length-1;
                    //     this.caseArr = this.vendorsArr[this.selectedCases.c].demonstrationArr;
                    // });
                    // let param = {'fid':this.$route.params.id}
                    getContentList({'fid':this.$route.params.id}).then(res => {
                        this.vendorsArr = res.obj;
                        this.caseArr = this.vendorsArr[0].children;
                        this.selectedCases.v = this.vendorsArr[0].autoId;
                        this.selectedCases.c = this.caseArr[0].autoId;
                        
                    })

                    // getapplicationList().then(res => {
                    //     this.data = res
                        
                    // });
                    //重新加载内容数据
                    loadCasesContent()
                    
                    
                    
                });
                // this.caseArr.push(this.formData1)
                // this.caseArr.push(this.formData1.name)
            },
            
            addModalCase(title) { //添加文件
                this.value4 = true;

                this.fileTypeName = title;

            },
            modifyParent( row,index ) {
                this.value3 = true;
                // this.formData = row;
                this.num = index;
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
            editItem(item){ //编辑
                this.value5 = true;
                // this.fileItemIndex= index;
                this.fileInfo.name = item.names;
                this.fileInfo.id = item.id;
                // this.fileInfo.author = item.operation;
                // this.fileInfo.createtime = momentDate("YYYY-MM-DD hh:mm:ss");
                // let t = {'createtime':item.createtime,'names':item.names,'operation':item.operation}
                // console.log(item);
                // let i = _.findIndex(this.data,function(o){return o.title==title});
                // for(let i in this.data){
                    
                //     if(_.findIndex(this.data[i].data,t)!=-1){
                //         this.fileTypeIndex = i;
                //         // console.log(_.findIndex(this.data[i].data,t));
                //         break;
                //     }
                // }
                // if(i!=-1){
                //     this.fileTypeIndex = i;
                // }
                this.fileTypeName = title;
                // console.log(index);
                
            },
            submitItemInfo(){ //提交编辑修改后的信息
                // do something
                
                // if(this.fileTypeIndex!==''&&this.fileItemIndex!==''){
                    if(this.fileInfo.id&&this.fileInfo.name){

                    // this.data[this.fileTypeIndex].data[this.fileItemIndex].names = this.fileInfo.name;
                    // this.data[this.fileTypeIndex].data[this.fileItemIndex].operation = this.userName;
                    // this.data[this.fileTypeIndex].data[this.fileItemIndex].createtime = this.fileInfo.createtime;
                    updateCaseName({'id':this.fileInfo.id,'newName':this.fileInfo.name}).then(res=>{
                        
                        this.$message("修改成功");

                        loadCasesContent();
                    });
                }
                
                this.clearFileData();
            },
            deleteItem(item){ //删除
                // let t = {'createtime':item.createtime,'names':item.names,'operation':item.operation};
                // let i = _.findIndex(this.data,function(o){return o.title==title});
                // if(i!==-1){
                //     this.fileTypeIndex = i;
                // }
                // for(let i in this.data){
                //     if(_.findIndex(this.data[i].data,t)!=-1){
                //         this.fileTypeIndex = i;
                //     }
                // }
                this.fileInfo.id = item.id;
                // this.fileItemIndex= index;
                this.modal1 = true;
            },
            clearFileData(){
                this.value4 = false;
                this.value5 = false;
                // for(let key in this.formData1) {
                //     this.formData[key] = ''
                // }
                
                this.formData = [{
                    name: "",
                    files: null,
                    link: '',
                    linkName: ''
                }];
                
            },
            addFileItem(){
                this.formData.push({
                    name: "",
                    files: [],
                    link: '',
                    linkName: ''
                });
                
            },
            ok(){
                // if(this.fileItemIndex!==''&&this.fileTypeIndex!==''){
                if(this.fileInfo.id){
                    // this.data[this.fileTypeIndex].data.splice(this.fileItemIndex,1);
                    // removeFile({'fileItemIndex':this.fileItemIndex,'fileTypeIndex':this.filetypeIndex}).then(res=>{
                    //     // this.data[this.fileTypeIndex].data.splice(this.fileItemIndex,1);
                    //     vue.$message('删除成功');
                    // })
                    deleteFile({'id':this.fileInfo.id}).then(res => {
                        this.$message('删除成功');
                        loadCasesContent();
                    })
                }
            },
            loadCasesContent(){
                if(this.selectedCases.c){
                    getCasesContent({'pid':this.selectedCases.c}).then(res => {
                        this.data = res;
                    })
                }
            }
            
        },
        watch:{
            selectedCases:{
                handler(newVal,oldVal){
                    // let param = {
                    //     'firstId':newVal.v,
                    //     'secondId':newVal.c
                    // };
                    // this.caseArr = this.vendorsArr[parseInt(newVal.v)].demonstrationArr;
                    let index = _.findIndex(this.vendorsArr,function(o){return o.autoId == newVal.v});
                    if(index!=-1){

                        this.caseArr = this.vendorsArr[index].children;
                        // getapplicationList().then(res => {
                        //     this.data = res
                        // });
                        // console.log("已请求数据");
                        if(newVal.c){
                            getCasesContent({'pid':newVal.c}).then(res => {
                                this.data = res;
                            })
                        }
                    }
                   
                },
                deep:true
            },
            
        },
        components:{
            Title
        }
    }
</script>
