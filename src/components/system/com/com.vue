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
                        <FormItem :label="fileTypeName+'文件'" label-position="left">
                            <Upload 
                                :before-upload="handleUpload"
                                action=""
                             style="width:86%;">
                                <Button icon="ios-cloud-upload-outline">{{formData.fileName}}</Button>
                            </Upload>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="产品名称" label-position="left">
                            <Input v-model="formData.name" disabled placeholder="请输入产品名称"  style="width:86%;"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button type="primary"  @click="addRole()">确定</Button>
                <Button style="margin-right: 8px" @click="value3 = false">关闭</Button>
            </div>
        </Drawer>    
        <Table :data="data1" :columns="tableColumns1" stripe>
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

    import { getDepartment,removeDepartment,addDepartment} from '@/http/api';
    import {mapState} from 'vuex'

    export default {
        data () {
            return {
                data1: [
                    {
                        "name":"闻海大数据平台",
                        "leader":"张三",
                        "createTime":"2019-06-30 03:06:55"
                    },
                    {
                        "name":"天湖超级智算平台",
                         "leader":"张三",
                         "createTime":"2019-06-30 03:06:55"
                    },
                    {
                        "name":"“红旗”县级融媒体中心",
                         "leader":"张三",
                         "createTime":"2019-06-30 03:06:55"
                    },{
                        "name":"“晴天”多语言舆情监测分析系统",
                         "leader":"张三",
                         "createTime":"2019-06-30 03:06:55"
                    },
                    
                ],

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
                fileTypeId: '',
                fileTypeName: '',
                value3: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                num:1,
                formData: {
                    name: "",
                    file: null,
                    fileName: ''
                },
                tableColumns1: [
                    {
                        title: '产品名称',
                        key: 'name'
                    },
                    {
                        title: '操作人',
                        key: 'leader'
                    },
                    {
                        title: '更改时间',
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
                this.data1[this.num].name = this.formData.name;
                this.value3 = false;
            },
            modifyParent( row,index ) {
                
                this.value3 = true;
                // this.formData = row;
                this.num = index;
                this.formData.name = row.name;
                this.formData.fileName = row.fileName ? row.fileName:"请上传文件";
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
            handleUpload:function(file){
                if(file){
                    this.formData.file = file;
                    this.formData.fileName = file.name;
                }
                if(!this.formData.fileName){
                    this.formData.fileName = "请上传文件"
                }
            }
            
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
        },
        watch:{
            fileTypeId(newVal){
                //load production list
                
                //change file type in drawer layer

                let index = _.findIndex(this.fileTypeArr,(o)=>{return o.autoId==newVal});
                console.log(index);
                if(index!=-1){
                    this.fileTypeName = this.fileTypeArr[index].name;
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
</style>
