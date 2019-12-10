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
                        
                        <FormItem
                        label="产品名称:"
                        label-position="left"
                        calss="formitem"
                        style="width:100%;margin:0 auto;height:48px;margin-top: 16px;">
                            <Input  v-model = "formData.linkName"/>
                        </FormItem>
                        <FormItem
                        label="链接地址:"
                        label-position="left"
                        calss="formitem"
                        style="width:100%;margin:0 auto;margin-top: 16px;">
                            <Input  v-model="formData.link"/>
                        </FormItem>
                        <FormItem
                        label="用户名:"
                        label-position="left"
                        calss="formitem"
                        style="width:100%;margin:0 auto;margin-top: 16px;">
                            <Input  v-model="formData.logName"/>
                        </FormItem>
                        <FormItem
                        label="密码:"
                        label-position="left"
                        calss="formitem"
                        style="width:100%;margin:0 auto;margin-top: 16px;">
                            <Input  v-model="formData.logPassword"/>
                        </FormItem>
                        
                         <FormItem label="操作人:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;margin-top: 16px;">
                             <Input :value="userName" disabled />
                        </FormItem>
                    </Col>
                    
                    <Col span="20" v-else >
                        
                            <FormItem
                            label="产品名称:"
                            label-position="left"
                            calss="formitem"
                            style="width:100%;margin:0 auto;">
                                <Input v-model="formData.name"/>
                            </FormItem>
                            <FormItem
                            :label="fileTypeName+'文件:'"
                            :format="filterArr"
                            label-position="left"
                            calss="formitem"
                            style="width:100%;margin:0 auto;margin-top: 16px;">
                                <Upload :before-upload="handleUpload"
                                    action="//jsonplaceholder.typicode.com/posts/" class="updata">
                                    <Button icon="ios-cloud-upload-outline" style="width:100%;">{{fileName}}</Button>
                                </Upload>
                            </FormItem>
                             <FormItem v-if="fileTypeName=='PPT'||fileTypeName=='技术白皮书'"
                            label="PDF版本:"
                            label-position="left"
                            calss="formitem"
                            :format="['pdf']"
                            style="width:100%;margin:0 auto;margin-top: 16px;">
                                <Upload :before-upload="handleUpload2"
                                    action="//jsonplaceholder.typicode.com/posts/" class="updata">
                                    <Button icon="ios-cloud-upload-outline" style="width:100%;">{{pdfName}}</Button>
                                </Upload>
                            </FormItem>
                            
                         <FormItem label="操作人:" label-position="left" calss="formitem" style="width:100%;margin:0 auto;margin-top: 16px;">
                             <Input :value="userName" disabled />
                        </FormItem>
                        <Progress v-if="progress" :percent="progress"></Progress>
                        <div v-if="fileExist" style="color:red;">上传文件不能为空</div>
                        <div v-if="pdfExist" style="color:red">PDF文件不能为空</div>
                    </Col>
                    <!-- <Icon type="ios-add" size="24" @click=""/> -->
                    <!-- <Button icon="ios-add" @click="addFileItem()" ></Button> -->
                </Row>
            </Form>
            <!-- <Row justify="center" style="margin-top:10px;">
                <Col span="12">
                    <Button type="primary" class="setW" @click="addRole()" style="margin-left:116px;">确定</Button>
                </Col>
                <Col span="12">
                    <Button class="setW" @click="closeFileAdd()">关闭</Button>
                </Col>
            </Row> -->
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
                        <option :value="cases.autoId" v-for="(cases,index) in caseArr" :key="index">{{cases.name}}</option>
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
                        <FormItem label="产品名称：" label-position="left" calss="formitem" style="width:100%;margin:16px auto 0;">
                             <Input v-model="fileInfo.name" />
                        </FormItem>
                        <FormItem label="链接地址：" v-if="fileTypeName=='地址'" label-position="left" calss="formitem" style="width:100%;margin:16px auto 0;">
                             <Input v-model="fileInfo.url" />
                        </FormItem>
                        <FormItem label="用户名：" v-if="fileTypeName=='地址'" label-position="left" calss="formitem" style="width:100%;margin:16px auto 0;">
                             <Input v-model="fileInfo.logName" />
                        </FormItem>
                        <FormItem label="密码：" v-if="fileTypeName=='地址'" label-position="left" calss="formitem" style="width:100%;margin:16px auto 0;">
                             <Input v-model="fileInfo.logPassword" />
                        </FormItem>
                        <FormItem label="操作人：" label-position="left" calss="formitem" style="width:100%;margin:16px auto 0;">
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
        <div v-for="(item,index) in data" :key="item.titile">
            <div class="clearfix">
                <div class="titleChild">
                    <img :src="item.icon" >
                    <span>{{item.titile}}</span>
                </div>
                <Button  class="btnMedalChild" v-if="item.titile=='地址'" @click="addModalCase(item.titile)" type="primary" style="margin-right: 25px;">添加地址</Button>
                <Button  class="btnMedalChild" v-else @click="addModalCase(item.titile)" type="primary" style="margin-right: 25px;">添加文件</Button>
            </div>
            <div>
                <Table :data="item.data" :columns="tableColumns1" stripe>
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.displayName }}</strong>
                    </template>
                    <template  slot="action" slot-scope="{ row }" >
                        <Button shape="circle" icon="ios-create-outline" @click="editItem(row,item.titile)"></Button>
                        <Button shape="circle" icon="ios-trash-outline" @click="deleteItem(row,item.titile)"></Button>
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
    import { addApplicationCase,getProductDemo,updateCaseName,deleteFile,getCasesContent,uploadFile,addLink,editLink,delteLink} from '@/http/api';
    import {mapState} from 'vuex'
    import "../../../assets/css/system.css";
    import {extFilter} from "@/mixin/filter"
    export default {
        mixins:[extFilter],
        data () {
            return {
                userName: sessionStorage.getItem("user"),
                fileName: '选择正确格式的文件',
                pdfName: '选择PDF文件',
                data1: [],
                data:[],
                value3: false,
                value4: false,
                value5: false,
                modal1: false,
                fileExist:false,
                pdfExist:false,
                fileTypeName: '',
                progress:0,
                fileInfo: {
                    name: '',
                    // author: '',
                    id: '',
                    url: '',
                    logName:'',
                    logPassword:''

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
                formData: {
                    name: "",
                    files: null,
                    fileName:'',
                    pdffile: '',
                    // pdfName: '',
                    link: '',
                    linkName: '',
                    logName:'',
                    logPassword: ''
                },
                itemData: {
                    
                },
                selectedCases:{ //下拉框级联选择
                    'v': '',
                    'c': ''
                },
                tableColumns1: [
                    {
                        title: '产品名称',
                        key: 'displayName'
                    },
                    {
                        title: '操作人',
                        key: 'userName'
                    },
                    {
                        title: '更改时间',
                        key: 'updateTime',
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
            ...mapState(['guanli']),
            filterArr: function(){
                if(this.fileTypeName){
                    switch(this.fileTypeName){
                        case "PPT":
                            return ['ppt','pptx'];
                        case "技术白皮书":
                            return ['doc','docx'];
                        case "产品册":
                            return ['pdf'];
                        case "视频资料":
                            return ['mp4','avi'  ,'mkv' , 'flv' , 'wmv'];
                    }
                }else{
                    return ['ppt','pptx','doc','docx','mp4','pdf','avi'  ,'mkv' , 'flv' , 'wmv']
                }
            }
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
               getProductDemo(param).then(res => {
                this.vendorsArr = res;
                // this.caseArr = this.vendorsArr[0].demonstrationArr;
                this.caseArr = this.vendorsArr[0].children;
                this.selectedCases.v = this.vendorsArr[0].autoId?this.vendorsArr[0].autoId:'';
                
                this.selectedCases.c = this.caseArr?this.caseArr[0].autoId:'';
                // 加载内容信息
                
                this.loadCasesContent();
                
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
                   
                    // let fileExt = ['pdf','doc','docx','ppt','pptx','mp4'];
                    let fileExt = this.filterArr;
                   
                    
                    let flag = this.extFilter(file.name,fileExt);
                    if(flag){
                        this.fileName = file.name;
                        this.formData.files = file;
                        this.formData.fileName = file.name;
                    }else{
                        this.fileName = "格式不正确"
                    }
                }
                
                return false;
            },
            handleUpload2(file){
                if(file!=null){
                    // this.files.push(file);
                    this.formData.pdffile = file;
                    // this.FormData.pdfName = file.name;
                    this.pdfName = file.name;
                    let fileExt = ['pdf'];
                    let flag = this.extFilter(file.name,fileExt);
                     if(flag){
                        this.pdfName = file.name;
                        this.formData.pdffile = file;
                        // this.formData.fileName = file.name;
                    }else{
                        this.pdfName = "格式不正确"
                    }
                }
                // console.log(index);
                // console.log(file.name);
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
                    // this.formData.forEach((v,i) => {
                    //     // files.concat(v.files[0]);
                    //     // console.log(v);
                    //     if(v.name!=''){
                    //         // data.append('productName'+i,v.name);
                    //         // data.append('file'+i,v.files[0]);
                    //         data.append('disName',v.name);
                            
                    //     }
                    // });
                    if(!(this.formData.files)){
                        this.fileExist = true;
                        return;
                    }
                    if((this.fileTypeName=="word"||this.fileTypeName=="PPT")&&!(this.formData.pdffile)){
                        this.pdfExist = true;
                        return;
                    }
                    let name = this.formData.name;
                    if(name==''){
                        name = this.formData.fileName
                        name = name.split('.')[0];
                    }
                    data.append('disName',name)
                    // this.files.forEach((v,i) =>{
                    //     data.append('files',v);
                    // })
                    let files = this.formData.files;
                    data.append('files',files);
                    if(this.formData.pdffile){
                        let pdffiles = this.formData.pdffile
                        data.append('files',pdffiles);
                    }
                    let config = {
                        onUploadProgress: progressEvent => {
                                var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                                this.progress = Math.min(complete,95)
                            }
                    }
                    uploadFile(data,config).then(res => {
                        // getapplicationList().then(res => {
                        //     this.data = res
                        // });
                        // 重新加载内容数据
                        // console.log("上传后"+this.progress)
                        this.loadCasesContent();
                        this.$message("添加成功");
                        this.progress = 0;
                        this.clearFileData();
                    }).catch(()=>{
                        this.progress = 0;
                    });
                }else{
                    // data.append('linkName',this.formData.linkName);
                    // data.append('link',this.formData.link);
                    // for(i in formData){
                    //     data.append('linkName'+i,this.formData[i].linkName);
                    //     data.append('link'+i,this.formData[i].link);
                    // }
                    // data.append('name',this.formData.linkName);
                    // data.append('url',this.formData.link);
                    let obj = {};
                    obj.pid = this.selectedCases.c;
                    obj.name = this.formData.linkName;
                    obj.url = this.formData.link;
                    obj.logName = this.formData.logName;
                    obj.logPassword = this.formData.logPassword;
                    addLink(obj).then(res => {
                        // getapplicationList().then(res => {
                        //     this.data = res;
                        // });
                        this.loadCasesContent();
                        this.$message("添加成功");
                        this.clearFileData();
                    });
                }
                
                //store data function
                
            },
            closeFileAdd(){
                this.clearFileData();
            },
            addCase() {
                this.value3 = false;
                let sort = this.caseArr?this.caseArr.length+1:1;
                let param = {'fid':this.formData1.casesId,'name':this.formData1.name,'sort':sort};

                addApplicationCase(param).then(res=>{
                    this.$message("添加成功");
                    // 重载产品列表
                    
                    getProductDemo({'fid':this.$route.params.id}).then(res => {
                        this.vendorsArr = res;
                        this.caseArr = this.vendorsArr?this.vendorsArr[0].children:'';
                        this.selectedCases.v = this.vendorsArr?this.vendorsArr[0].autoId:'';
                        this.selectedCases.c = this.caseArr?this.caseArr[0].autoId:'';
                        
                    })

                    // getapplicationList().then(res => {
                    //     this.data = res
                        
                    // });
                    //重新加载内容数据
                    this.loadCasesContent()
                    
                    this.clearFileData();
                    
                });
                
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
            editItem(item,title){ //编辑
                this.value5 = true;
                // this.fileItemIndex= index;
                this.fileInfo.name = item.displayName;
                this.fileInfo.id = item.autoId;
                this.fileInfo.url = item.url;
                this.fileInfo.logName = item.logName;
                this.fileInfo.logPassword = item.logPassword;
                this.fileTypeName = title;
                // console.log(index);
                
            },
            submitItemInfo(){ //提交编辑修改后的信息
                // do something
                
                // if(this.fileTypeIndex!==''&&this.fileItemIndex!==''){
                    if(this.fileInfo.id&&this.fileInfo.name){

                    if(this.fileTypeName=="地址"){
                        let obj = {};
                        obj.autoId = this.fileInfo.id;
                        obj.name = this.fileInfo.name;
                        obj.url = this.fileInfo.url;
                        obj.logName = this.fileInfo.logName;
                        obj.logPassword = this.fileInfo.logPassword;
                        editLink(obj).then(res=>{
                            this.$message("修改成功");

                            this.loadCasesContent();
                        })
                    }else{
                        updateCaseName({'id':this.fileInfo.id,'newName':this.fileInfo.name}).then(res=>{
                        
                            this.$message("修改成功");

                            this.loadCasesContent();
                        });
                    }
                    
                }
                
                this.clearFileData();
            },
            deleteItem(item,title){ //删除
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
                this.fileTypeName = title
                this.fileInfo.id = item.autoId;
                // this.fileItemIndex= index;
                this.modal1 = true;
            },
            clearFileData(){
                this.value4 = false;
                this.value5 = false;
                // for(let key in this.formData1) {
                //     this.formData[key] = ''
                // }
                this.fileName =  '选择正确格式的文件';
                this.pdfName =  '选择PDF文件';
                this.fileExist= false;
                this.pdfExist = false;
                this.formData = {
                    name: "",
                    files: null,
                    // fileName: '',
                    pdffile: '',
                    // pdfName:'',
                    link: '',
                    linkName: '',
                    logName:'',
                    logPassword:''
                };
                this.formData1 = {
                        name: '',
                        casesId: '',
                        
                    };
              
                
            },
            // addFileItem(){
            //     this.formData.push({
            //         name: "",
            //         files: null,
            //         pdffile: '',
            //         link: '',
            //         linkName: ''
            //     });
                
            // },
            ok(){
                // if(this.fileItemIndex!==''&&this.fileTypeIndex!==''){
                if(this.fileInfo.id){
                    // this.data[this.fileTypeIndex].data.splice(this.fileItemIndex,1);
                    // removeFile({'fileItemIndex':this.fileItemIndex,'fileTypeIndex':this.filetypeIndex}).then(res=>{
                    //     // this.data[this.fileTypeIndex].data.splice(this.fileItemIndex,1);
                    //     vue.$message('删除成功');
                    // })
                    if(this.fileTypeName=="地址"){
                        
                        delteLink({'autoId':this.fileInfo.id}).then(res=>{
                            this.$message('删除成功');
                            this.loadCasesContent();
                        });
                    }else{
                        deleteFile({'id':this.fileInfo.id}).then(res => {
                            this.$message('删除成功');
                            this.loadCasesContent();
                         });
                    }
                    
                }
            },
            loadCasesContent(){
                if(this.selectedCases.c){
                    getCasesContent({'pid':this.selectedCases.c}).then(res => {
                        // this.data = res;
                        this.data = this.handleData(res);
                    })
                }
            },
            //给地址数据添加displayName
            handleData(data){
                data = data.map(function(v,i,a){
                    if(v.titile=="地址"){
                        if(v.data.length){
                            v.data.map(function(v2,i2,a2){
                                v2.displayName = v2.name;
                                
                                return v2;
                            })
                        }
                    }
                    return v;
                });
                return data
            }
        },
        watch:{
            "selectedCases.v":{
                handler(newVal,oldVal){
                    // let param = {
                    //     'firstId':newVal.v,
                    //     'secondId':newVal.c
                    // };
                    // this.caseArr = this.vendorsArr[parseInt(newVal.v)].demonstrationArr;
                    let index = _.findIndex(this.vendorsArr,function(o){return o.autoId == newVal});
                    if(index!=-1){

                        this.caseArr = this.vendorsArr[index].children;
                        this.selectedCases.c = this.caseArr?this.caseArr[0].autoId:'';
                        // if(newVal.v!=oldVal.v){
                        // }
                        // if(newVal.c!=oldVal.c){
                        //     getCasesContent({'pid':newVal.c}).then(res => {
                        //         this.data = res;
                        //     })
                        // }
                    }
                   
                },
                deep:true,
                immediate: true
            },
            "selectedCases.c":{
                handler(newVal,oldVal){
                    if(newVal){
                        getCasesContent({'pid':newVal}).then(res => {
                                this.data = this.handleData(res);
                        });
                    }
                    
                },
                deep: true,
                immediate: true
            }
            
            
        },
        components:{
            Title
        }
}

</script>

<style lang="less" scoped>
    .ivu-drawer-header p, .ivu-drawer-header-inner {
        font-size:18px;
    }
    .ivu-form{
        .ivu-form-item-label{
            font-size:16px;
         }
    }
    
</style>
