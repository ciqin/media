<template>
    <div class="company_box">
        <Title :title="'角色管理'"></Title>
        <Button  class="btnMedal" @click="addModalShow" type="primary">添加</Button>
        <!-- 模态框 -->
        <Drawer
            title="角色管理添加"
            v-model="value3"
            width="1000"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="12" style="width:30%;float:left;">
                    <Col span="24">
                        <FormItem label="角色名称" label-position="left">
                            <Input v-model="formData.name" placeholder="请输入角色名称"  style="width:calc(100% - 60px);"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="角色类型" label-position="top">
                            <Select v-model="formData.userId" placeholder="请输入单位" style="width:calc(100% - 60px);"> 
                                <Option value="1">角色1</Option>
                                <Option value="2">角色2</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="所属单位" label-position="top">
                            <Select v-model="formData.institutionId" placeholder="请输入单位" style="width:calc(100% - 60px);"> 
                                <Option value="2">单位1</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="所属部门" label-position="top">
                           <Select v-model="formData.depId" placeholder="请输入部门" style="width:calc(100% - 60px);"> 
                                <Option value="9">部门1</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12" style="width:70%;float:left;padding: 0px 20px;">
                         <!-- <Button type="primary" shape="circle" icon="md-add" :color="'#8bb9dc'" @click="addParent">add</Button> -->
                        <div class="thead tcenter">
                            <Row>
                                <Col span="2">
                                    排序
                                </Col>
                                <Col span="12">栏目名称</Col>
                                <Col span="8">操作</Col>
                            </Row>
                        </div>
                        <ul class="tcenter">
                            <li class="parentItem" v-for="(items,index1) in data2" :key="index1" >
                                <Row>
                                    <Col span="2">
                                        <Input v-model="items.autoId" placeholder="序号" style="width: 40px" />
                                    </Col>
                                    <Col span="12">{{items.text?items.text:""}}</Col>
                                    <Col span="8">
                                        <Button type="primary" shape="circle" icon="ios-arrow-down" @click="listItem(items,index1)"></Button>
                                        <Button type="primary" shape="circle" icon="md-add" @click="addChild(items,index1)"></Button>
                                        <Button type="primary" shape="circle" icon="ios-create-outline" @click="modifyparent(items,index1)"></Button>
                                        <Button type="primary" shape="circle" icon="ios-trash-outline" @click="removeParentItem(items,index1)"></Button>
                                    </Col>
                                </Row>
                                <ul v-if="items.secondPerm" v-show="listindex==index1">
                                    <li class="childItem" v-for="(item,index) in items.secondPerm" :key="index"> 
                                        <Row>
                                            <Col span="2">
                                                <Input v-model="item.autoId" placeholder="序号" style="width: 40px" />
                                            </Col>
                                            <Col span="12">{{item.name}}</Col>
                                            <Col span="8">
                                                <Button type="primary" shape="circle" icon="ios-create-outline" @click="modifyChildName(item,index,index1)"></Button>
                                                <Button type="primary" shape="circle" icon="ios-trash-outline" @click="removeChild(item,index,index1)"></Button>
                                            </Col>
                                        </Row>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                </Row>
                
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">关闭</Button>
                <Button type="primary"  @click="addRole()">确定</Button>
            </div>
        </Drawer>    
         <Drawer :title="ColumnTitle" :closable="false" v-model="value6" width="300">
             <Form>
                <FormItem label="请输入栏目名称" label-position="left">
                    <Input v-model="columnName" placeholder="请输入栏目名称"  style="width:calc(100% - 100px);"/>
                </FormItem>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value6 = false">关闭</Button>
                <Button type="primary"  @click="addcolumnName()">确定</Button>
            </div>
        </Drawer>
        <Table :data="data1" :columns="tableColumns1" stripe>
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" shape="circle" icon="ios-create-outline" @click="modifyItem(row,index)"></Button>
                <Button type="primary" shape="circle" icon="ios-trash-outline" @click="removeParent(row,index)"></Button>
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
    import qs from 'qs';
    export default {
        data () {
            return {
                data1: [],
                data2:[],
                listindex:null,
                columnName:"",
                //  判断修改栏目的状态
                flagName:1,
                ColumnTitle:"添加栏目名称",
                value3: false,
                value6:false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static',
                },
                formChildIndex:"",
                num:1,
                formData: {
                   createTime: "",
                    depId: "",
                    departMentName: "",
                    id: 0,
                    institutionId: "",
                    institutionName: "",
                    level: "1",
                    name: "",
                    userId: null
                },
                formsomeData:{},
                //  子元素name修改
                formChildname :null,
                formIndex:"",
                tableColumns1: [
                    {
                        title: '序号',
                        key: 'name'
                    },
                    {
                        title: '角色名称',
                        key: 'name'
                    },
                    {
                        title: '角色级别',
                        key: 'level',
                    },{
                        title: '单位名称',
                        key: 'institutionName'
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
        created(){
              let that = this;
              this.axios({
                  method: 'get',
                  url:'/static/sidebar.json',
              }).then(function(result){
                that.data2 = result.data
              })

              this.axios({
                  method: 'get',
                  url:'http://localhost:8096/role/getList',
              }).then(function(result){
                that.data1 = result.data.obj;
              })
        },
        methods: {
            cleardata() {
                for(let key in this.formData) {
                    this.formData[key] = ''
                }
            },
            formatDate (date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
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
                if(this.num==1) {
                    this.axios.post('http://localhost:8096/role/add', qs.stringify(datas)).then(function (result) {
                        if(result.data.success){
                            that.value3 = false;
                            that.data1.push(that.formData);
                        }
                    })
                }else {
                    this.axios.post('http://localhost:8096/role/update', qs.stringify(datas)).then(function (result) {
                        if(result.data.success){
                            that.value3 = false
                            that.data1.splice(index,1,that.formData)
                        }
                    })
                }
            },
            removeParent( row,index ) {
                let that = this;
                if(confirm('确定要删除吗')) {
                    this.axios({
                        method: 'get',
                        url:'http://localhost:8096/role/deleteById/'+row.id,
                    }).then(function(result){
                        if(result) {
                            that.data1.splice(index,1)
                        }
                    })
                }
            },
            modifyItem( row,index ) {
                this.value3 = true;
                this.num = 2;
                let that = this;
                this.axios.get('http://localhost:8096/role/selectById/'+row.id).then(function (result) {
                    if(result.data.success){
                        that.formData = result.data.obj;
                       
                    }
                })
            },
             addParent(){
                let id = this.data2.length+1;
                let title = "title321";
                this.data2.push({
                    id,
                    title
                })
            },
            //  修改子元素
            modifyChildName(items,index,index1) {
                this.value6 = true;
                this.flagName = 3;
                this.formIndex = index1;
                this.formChildIndex = index;
                this.ColumnTitle = '添加子栏目名称';
                this.columnName = items.title
                //item.title =  this.columnName;
                //  this.value6 = false;
            },
            removeChild(items,index,index1){
                this.data2[index1].children.splice(index,1)
            },
            removeParentItem (items,index) {
                let that = this;
                this.axios.post('http://localhost:8096/firstperm/deleteById',qs.stringify(items)).then(function (result) {
                    if(result.data.success){
                        //that.formData = result.data.obj;
                        that.data2.splice(index,1)
                    }
                })
            },
            addChild(items,index) {
                this.value6 = true;
                this.flagName = 1;
                this.columnName = "";
                this.formsomeData = items;
                this.formIndex = index;
                this.ColumnTitle = '添加栏目名称';
                // this.data2[index].children.push({
                //     title:"child3"
                // })
            },
            //  修改父元素属性
            modifyparent(item,index){
                this.value6 = true;
                this.flagName = 2;
                this.formsomeData = item;
                this.formIndex = index;
                // 属性回填
                this.columnName = item.title
                this.ColumnTitle = '修改栏目名称';
            },
            //  控制下拉列表状态
            listItem(item,index){
                // console.log(item,index)
                this.listindex = index
            },
            //  控制栏目名称
            addcolumnName() {
                let name = this.formData,that = this;
                if(this.flagName==1) {
                    // this.data2.push({
                    //     title:this.columnName,
                    //     id:this.data2.length+1,
                    //     children:[]
                    // })
                    this.data2[this.formIndex].children.push({
                         title:this.columnName,
                         id:this.data2[this.formIndex].children.length+1
                    })
                    this.columnName = "";
                    this.value6 = false;
                    // this.columnName = "";
                    // this.axios.post('http://localhost:8096/firstperm/add', qs.stringify(datas)).then(function (result) {
                    //     if(result.data.success){
                    //         that.value3 = false;
                    //         that.data1.push(that.formData);
                    //     }
                    // })
                }else if(this.flagName==2){
                    this.data2[this.formIndex].title = this.columnName;
                    this.value6 = false;
                    this.columnName = "";
                    // this.axios.post('http://localhost:8096/firstperm/update', qs.stringify(datas)).then(function (result) {
                    //     if(result.data.success){
                    //         that.value3 = false
                    //         that.data1.splice(index,1,that.formData)
                    //     }
                    // })
                }else {
                    this.data2[this.formIndex].children[this.formChildIndex].title =this.columnName ;
                    this.value6 = false;
                    this.columnName = "";
                }
            }
        },
        components:{
            Title
        }
    }
</script>


<style scoped>
.company_box {
    margin: 12px;
    position: relative;
}
.comMsg {
    background: #fff;
    padding:24px;
    margin-bottom: 20px;
}
.demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
}
.btnMedal {
    position: absolute;
    top: -2px;
    right: 0px;
}

.ivu-form .ivu-form-item-label {
    width:60px;
}
.thead {
    width: 100%;
    background: #8bb9dc;
    height: 40px;
    line-height: 40px;
}
.parentItem {
    background: #ffffff;
    line-height: 40px;
    color: #666;
}
.parentItem ul {
    padding-left: 46px;
    background: #f8f8f9;
}
.childItem {
    background: #f8f8f9;
    color: #666;
}
.tcenter {
    text-align: center;
}
</style>
