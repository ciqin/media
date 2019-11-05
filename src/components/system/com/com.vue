<template>
    <div class="company_box">
        <div style="margin:18px;">
             <Row>
                <Col span="3"><Title :title="guanli+'管理'"></Title></Col>
                <Col span="19"> 
                    <select class="MaterialList" v-model = "fileTypeId">
                        <option v-for="(fileType,index) in fileTypeArr" :key="index" :value="fileType.autoId">{{fileType.name}}</option>
                        <!-- <option value="1">PPT</option>
                        <option value="2">视频资料</option>
                        <option value="3">技术白皮书</option> -->
                    </select>
                </Col>
            </Row>
        </div>
        <Drawer
            title="文件添加管理"
            v-model="value3"
            width="720"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                     <Col span="24">
                        <FormItem :label="fileTypeName+'文件:'" label-position="left"
                            style="width:100%;margin:0 auto;">
                            <Upload 
                                :before-upload="handleUpload"
                                :format="fileTypeArr"
                                action=""  style="width:100%;">
                                <Button icon="ios-cloud-upload-outline" style="width:100%;">{{fileName}}</Button>
                            </Upload>

                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="PDF版本:" label-position="left"
                        v-if="fileTypeName=='PPT'||fileTypeName=='技术白皮书'"
                            style="width:100%;margin:0 auto;margin-top: 16px;">
                            <Upload 
                                :before-upload="handleUpload2"
                                :format="['pdf']"
                                action=""  style="width:100%;">
                                <Button icon="ios-cloud-upload-outline" style="width:100%;">{{pdfName}}</Button>
                            </Upload>

                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="产品名称:" label-position="left" style="margin-top:16px;">
                            <Input v-model="formData.name" disabled placeholder="请输入产品名称"  style="width:86%;"/>
                        </FormItem>
                        <div v-if="fileExist" style="color:red;">上传文件不能为空</div>
                        <div v-if="pdfExist" style="color:red">PDF文件不能为空</div>
                    </Col>
                    <Progress v-if="progress" :percent="progress"></Progress>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button type="primary" class="setW" @click="addRole()">确定</Button>
                <Button style="margin-right: 8px"  class="setW" @click="close()">关闭</Button>
            </div>
        </Drawer>    
        <Table :data="data" :columns="tableColumns1" stripe>
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <!-- <Button type="primary" shape="circle" icon="ios-create-outline" @click="modifyItem(row,index)"></Button> -->
                <Button type="primary" shape="circle"  @click="modifyParent(row,index)">更改</Button>
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

    import { getDepartment,removeDepartment,addDepartment,getProductDemo,uploadFile1} from '@/http/api';
    import {mapState} from 'vuex'
    import "../../../assets/css/system.css";

    export default {
        data () {
            return {
                styles: {
                    height: "calc(100% - 55px)",
                    overflow: "auto",
                    padding: "210px 80px 0 80px",
                    position: "static",
                },
                progress:0,
                data1: [
                    // {
                    //     "name":"闻海大数据平台",
                    //     "leader":"张三",
                    //     "createTime":"2019-06-30 03:06:55"
                    // },
                    // {
                    //     "name":"天湖超级智算平台",
                    //      "leader":"张三",
                    //      "createTime":"2019-06-30 03:06:55"
                    // },
                    // {
                    //     "name":"“红旗”县级融媒体中心",
                    //      "leader":"张三",
                    //      "createTime":"2019-06-30 03:06:55"
                    // },{
                    //     "name":"“晴天”多语言舆情监测分析系统",
                    //      "leader":"张三",
                    //      "createTime":"2019-06-30 03:06:55"
                    // },
                    
                ],
                data:[],
                fileTypeArr:[{
                    'autoId':'0',
                    'name':'产品册'
                },{
                    'autoId':'1',
                    'name':'PPT'
                },{
                    'autoId':'2',
                    'name':'视频资料'
                },{
                    'autoId':'3',
                    'name':'技术白皮书'
                }],
                fileExist:false,
                pdfExist:false,
                fileTypeId: '',
                fileTypeName: '',
                fileName: '',
                pdfName: '选择文件',
                value3: false,
                // styles: {
                //     height: 'calc(100% - 55px)',
                //     overflow: 'auto',
                //     paddingBottom: '53px',
                //     position: 'static'
                // },
                num:1,
                formData: {
                    name: "",
                    file: null,
                    pdffile:null,
                    fileName: ''
                },
                tableColumns1: [
                    {
                        title: '产品名称',
                        key: 'name'
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
        methods: {
            clearFileData() {
                // for(let key in this.formData) {
                //     this.formData[key] = ''
                // }
                this.formData = {
                    name: "",
                    file: null,
                    pdffile:null,
                    fileName: ''
                }

                this.pdfExist = false;
                this.fileExist = false;
                this.fileName = '';
                this.pdfName = '选择文件';
            },
            changeTable() {
                
            },
            addModalShow () {
               this.clearFileData();
               this.value3 = true;
               this.num = 1;
            },
            changePage () {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                this.tableData1 = this.mockTableData1();
            },
            addRole(){
                // this.data1[this.num].name = this.formData.name;
                
                let data = new FormData();
                if(!(this.formData.file)){
                        this.fileExist = true;
                        return;
                }
                if((this.fileTypeName=="技术白皮书"||this.fileTypeName=="PPT")&&!(this.formData.pdffile)){
                        this.pdfExist = true;
                        return;
                }
                data.append('disName',this.formData.name);
                data.append('files',this.formData.file);
                data.append('fileName',this.formData.fileName);
                if(this.formData.pdffile){
                        let pdffiles = this.formData.pdffile
                        data.append('files',pdffiles);
                }
                let config = {
                        onUploadProgress: progressEvent => {
                                var complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
                                this.progress = Math.min(complete,99)
                            }
                };
                uploadFile1(data,config).then(res => {
                        // getapplicationList().then(res => {
                        //     this.data = res
                        // });
                        // 重新加载内容数据
                        
                        this.$message("修改成功");
                        let fid = this.$route.params.id
                        let id = this.fileTypeId;
                        getProductDemo({'fid':id}).then(res => {
                            this.loadData(res,id);
                            this.value3 = false;
                            this.clearFileData();
                        })
                        this.progress = 0;
                }).catch(()=>{
                        this.progress = 0;
                        
                });
                
            },
            close(){
                this.value3 = false;
                this.clearFileData();
            },
            loadData(sourceData,id){
                let meltData = [];
                let data1 = [];
                let data = [];
                
                sourceData[0].demonstrationArr.forEach(function(v,i){
                    
                    let o = new Object();
                    o.fileName = v.titile;
                    o.data = [];
                    meltData.push(o)
                });
                meltData.forEach(function(v,i){
                    let name = v.fileName;
                    sourceData.forEach(function(v2,i2){
                        let index = _.findIndex(v2.demonstrationArr,function(o){return o.titile == name});
                        if(index!=-1){
                            if(v2.demonstrationArr[index].data.length){
                                let d = v2.demonstrationArr[index].data[0]
                                let obj = {}
                                Object.assign(obj,{'name':v2.name},d);
                                v.data.push(obj);
                            }
                        }
                    })
                })
                
                let tempArr = this.fileTypeArr;
                meltData.forEach(function(v,i){
                    let index = _.findIndex(tempArr,(o)=>{return o.name==v.fileName})
                    
                    if(index!=-1){
                        let f = tempArr[index];
                        Object.assign(v,f);
                    }
                })
                data1 = meltData;
                data = data1[id].data;
                return {
                    'data1': data1,
                    'data': data
                }
            },
            modifyParent( row,index ) {
                
                this.value3 = true;
                // this.formData = row;
                this.num = index;
                this.formData.name = row.name;

                this.fileName = row.fileName ? row.fileName:"请上传文件";
                this.formData.fileName = row.fileName ? row.fileName:'';
                //this.data1[index].name =  this.formData.name
                //this.formData.
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
            handleUpload(file){
                if(file!=null){
                   
                    // let fileExt = ['pdf','doc','docx','ppt','pptx','mp4'];
                    let fileExt = this.filterArr;
                   
                    
                    let flag = this.extFilter(file.name,fileExt);
                    if(flag){
                        this.fileName = file.name;
                        this.formData.file = file;
                        // this.formData.fileName = file.name;
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
            
        },
        components:{
            Title
        },
        mounted(){
            //load production list 
            // getProductList().then(res => {
            //     this.data1 = res;
            // })
            this.fileTypeId = this.fileTypeArr[0].autoId;
            this.fileTypeName = this.fileTypeArr[0].name;
            let fid = this.$route.params.id;
            getProductDemo({'fid':fid}).then(res => {
                let result = this.loadData(res,0);
                this.data1 = result.data1;
                this.data = result.data;
                
            })
        },
        watch:{
            fileTypeId(newVal){
                //load production list
                
                //change file type in drawer layer

                let index = _.findIndex(this.data1,(o)=>{return o.autoId==newVal});
                // console.log(index);
                if(index!=-1){
                    this.fileTypeName = this.data1[index].name;
                    this.data = this.data1[index].data;
                }
                

            }
        }
    }
</script>


<style lang="less" scoped>
.MaterialList {
    width: 180px;
    height: 30px;
    border-color: #dcdcdc;
    font-size: 16px;
    color:#5f5f5f;
    border-radius: 4px;
    margin-top: -4px;
    outline-style: none;
}
.ivu-table td, .ivu-table th {
    text-align: center;
    font-size: 14px;
    color:#5b5b5b;
}
.ivu-table th {
    font-size: 16px;
    font-weight: 700;
    color:#5b5b5b;
}
.titleChild {
    padding:20px;
    float: left;
    img{
        margin-right: 12px;
    }
    span{
        font-size: 16px;
        color:#5f5f5f;
        font-weight: 700;
    }
}
.btnMedalChild {
    float: right;
    margin-top: 20px;
}
.ivu-upload .ivu-upload-select {
    // width: 86% !important;
    width:391px;
}
</style>
