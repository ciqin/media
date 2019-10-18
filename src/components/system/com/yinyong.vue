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
                            <select class="MaterialList" style="width:100%;" v-model="formData1.casesIndex">
                                <!-- <option value="1">媒体行业应用案例</option>
                                <option value="2">政务领域应用案例</option>
                                <option value="3">舆情领域应用案例</option>
                                <option value="4">警务领域应用案例</option> -->
                                <option :value="index" v-for="(vendor,index) in vendorsArr" :key="index">{{vendor.name}}</option>
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
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/" class="updata">
                                    <Button icon="ios-cloud-upload-outline" v-model="item.files" style="width:100%;">选择文件</Button>
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
                        <option :value="index" v-for="(vendor,index) in vendorsArr" :key="index">{{vendor.name}}</option>
                    </select>
                     <select class="MaterialList" style="margin-left: 30px;" v-model="selectedCases.c">
                        <option :value="index" v-for="(cases,index) in caseArr" :key="index">{{cases.namechild}}</option>
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
                    <template  slot="action" slot-scope="{ row, index }" >
                        <Button shape="circle" icon="ios-create-outline" @click="editItem(row,item.title,index)"></Button>
                        <Button shape="circle" icon="ios-trash-outline" @click="deleteItem(row,item.title,index)"></Button>
                    </template>
                </Table>
            </div>
        </div>
        
    </div>
</template>
<script>
    import Title from "@/components/assembly/title";
    import {momentDate} from "@/common/utils/utilDateFormat"

    import { getDepartment,removeDepartment,getapplicationList,getUserurl,uploadFile,updateFileInfo,removeFile} from '@/http/api';
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
                    casesIndex: 0,
                    cases:'',
                    // ppts: [],
                    // words: [],
                    // brochures: [],
                    // videos: [],
                    // link: '',
                    // linkName: ''
                },
                formData: [{
                    name: "",
                    files: [],
                    link: '',
                    linkName: ''
                }],
                itemData: {
                    
                },
                selectedCases:{ //下拉框级联选择
                    'v':0,
                    'c':0
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
            getapplicationList().then(res => {
                this.data = res
            });
            getUserurl().then(res=>{
                this.vendorsArr = res;
                this.caseArr = this.vendorsArr[0].demonstrationArr;
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
                this.clearFileData();
                let data = new FormData();
                data.append('fileType',this.fileTypeName);
                data.append('user',this.userName);
                if(this.fileTypeName!="地址"){
                   
                    formData.forEach((v,i) => {
                        // files.concat(v.files[0]);
                        if(v.name!=''&&v.files.length!=0){
                            data.append('productName'+i,v.name);
                            data.append('file'+i,v.files[0]);
                        }
                    });
                    
                    uploadFile(data).then(res => {
                        getapplicationList().then(res => {
                            this.data = res
                        });
                        vue.$message("添加成功");
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
                        vue.$message("添加成功");
                    });
                }
                
                //store data function
                
            },
            closeFileAdd(){
                this.clearFileData();
            },
            addCase() {
                this.value3 = false;
                this.formData1.cases = this.data[parseInt(this.casesIndex)].title;
                let data = new FormData();
                Object.keys(formData1).forEach((v,i)=>{
                    data.append(v,this.formData1[v]);
                })
                uploadFile(data).then(res=>{
                    vue.$message("添加成功");
                    // 重载产品列表
                    getapplicationList().then(res => {
                        this.data = res
                        
                    });
                    getUserurl().then(res=>{
                        this.vendorsArr = res;
                        //用户列表选择到最新加入的
                        this.selectedCases.v = this.formData1.casesIndex;
                        this.selectedCases.c = this.vendorsArr.length-1;
                        this.caseArr = this.vendorsArr[this.selectedCases.c].demonstrationArr;
                    });
                });
                // this.caseArr.push(this.formData1)
                // this.caseArr.push(this.formData1.name)
            },
            // getCurrentCases() {

            // },
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
            editItem(item,title,index){ //编辑
                this.value5 = true;
                this.fileItemIndex= index;
                this.fileInfo.name = item.names;
                // this.fileInfo.author = item.operation;
                this.fileInfo.createtime = momentDate("YYYY-MM-DD hh:mm:ss");
                let t = {'createtime':item.createtime,'names':item.names,'operation':item.operation}
                // console.log(item);
                let i = _.findIndex(this.data,function(o){return o.title==title});
                // for(let i in this.data){
                    
                //     if(_.findIndex(this.data[i].data,t)!=-1){
                //         this.fileTypeIndex = i;
                //         // console.log(_.findIndex(this.data[i].data,t));
                //         break;
                //     }
                // }
                if(i!=-1){
                    this.fileTypeIndex = i;
                }
                this.fileTypeName = title;
                // console.log(index);
                
            },
            submitItemInfo(){ //提交编辑修改后的信息
                // do something
                console.log(this.fileTypeIndex);
                console.log(this.data[this.fileTypeIndex]);
                if(this.fileTypeIndex!==''&&this.fileItemIndex!==''){

                    this.data[this.fileTypeIndex].data[this.fileItemIndex].names = this.fileInfo.name;
                    this.data[this.fileTypeIndex].data[this.fileItemIndex].operation = this.userName;
                    this.data[this.fileTypeIndex].data[this.fileItemIndex].createtime = this.fileInfo.createtime;
                    updateFileInfo(this.fileInfo).then(res=>{
                        // update current data
                        // this.data[this.fileTypeIndex].data[this.fileItemIndex].names = this.fileInfo.name;
                        // this.data[this.fileTypeIndex].data[this.fileItemIndex].operation = this.username;
                        // this.data[this.fileTypeIndex].data[this.fileItemIndex].createtime = this.fileInfo.createtime;
                        vue.$message("修改成功");
                    });
                }
                
                this.clearFileData();
            },
            deleteItem(item,title,index){ //删除
                let t = {'createtime':item.createtime,'names':item.names,'operation':item.operation};
                let i = _.findIndex(this.data,function(o){return o.title==title});
                if(i!==-1){
                    this.fileTypeIndex = i;
                }
                // for(let i in this.data){
                //     if(_.findIndex(this.data[i].data,t)!=-1){
                //         this.fileTypeIndex = i;
                //     }
                // }
                this.fileItemIndex= index;
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
                    files: [],
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
                if(this.fileItemIndex!==''&&this.fileTypeIndex!==''){
                    this.data[this.fileTypeIndex].data.splice(this.fileItemIndex,1);
                    removeFile({'fileItemIndex':this.fileItemIndex,'fileTypeIndex':this.filetypeIndex}).then(res=>{
                        // this.data[this.fileTypeIndex].data.splice(this.fileItemIndex,1);
                        vue.$message('删除成功');
                    })
                }
            }
            
        },
        watch:{
            selectedCases:{
                handler(newVal,oldVal){
                    let param = {
                        'firstId':newVal.v,
                        'secondId':newVal.c
                    };
                    this.caseArr = this.vendorsArr[parseInt(newVal.v)].demonstrationArr;
                    getapplicationList(param).then(res => {
                        this.data = res
                    });
                    console.log("已请求数据");
                },
                deep:true
            }
        },
        components:{
            Title
        }
    }
</script>
