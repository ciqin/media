<template>
    <div class="company_box">
        <div style="margin:18px;">
             <Row>
                <Col span="3"><Title :title="guanli+'管理'"></Title></Col>
            </Row>
        </div>
        <Drawer
            title="部门管理添加"
            v-model="value3"
            width="720"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="产品名称" label-position="left">
                            <Input v-model="formData.name" disabled placeholder="请输入产品名称"  style="width:86%;"/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="产品链接地址" label-position="left">
                            <Input v-model="formData.url" placeholder="请输入产品链接地址"  style="width:86%;"/>
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
            <template slot-scope="{row}" slot="action">
                <!-- <Button type="primary" shape="circle" icon="ios-create-outline" @click="modifyItem(row,index)"></Button> -->
                <!-- <input type="text" :value="row.url"> -->
                <strong>{{ row.url }}</strong>
                <!-- <span>{{}}</span> -->
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

    // import { getDepartment,removeDepartment,addDepartment,getSisurl,getProductDemo,updateProductUrl} from '@/http/api';
    import { getDepartment,removeDepartment,addDepartment,getProductDemo,updateProductUrl} from '@/http/api';

    import {mapState} from 'vuex'

     import '../../../assets/css/system.css';
    export default {
        data () {
            return {
                data1: [],
                value3: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    padding: '210px 80px 0 80px',
                    position: 'static',
                },
                num:1,
                formData: {
                    icon: "",
                    name: "",
                    url: null,
                },
                tableColumns1: [
                    {
                        title: '产品名称',
                        key: 'name'
                    },
                    // {
                    //     title: '操作人',
                    //     key: 'leader'
                    // },
                    {
                        title: '创建时间',
                        key: 'updateTime',
                    },
                     {
                        title: '链接地址',
                        key:"url",
                        // render: (h, params) => {
                        //     return h('Input', {
                        //         props: {
                        //             type: 'text',
                        //             value: params.row.url,
                        //         }
                        //     });
                        // },
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
        mounted () {
            // getSisurl().then(res => {
            //     this.data1 = res
            // })
            let id = this.$route.params.id;
            let param = {'fid':id}
            getProductDemo(param).then(res=>{
                // this.data1 = res;
                let data = []
                _.each(res,function(v){
                    data.push(v);
                    if(v.children){
                        _.each(v.children,function(c){
                            c.name = v.name+"-"+c.name
                            data.push(c);
                        })
                    }
                });
                this.data1 = data;
            })
            
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
                
                // this.data1[this.num].name =  this.formData.name;
                
                // this.value3 = false;
                // let datas = this.formData,that = this;
                // addDepartment(datas).then(res => {
                //     if(res.success) {
                //          this.value3 = false
                //          this.data1.push(that.formData);
                //     }
                // })
                // if(this.num==1) {
                //     this.axios.post('http://localhost:8096/departMent/add', qs.stringify(datas)).then(function (result) {
                //         if(result.data.success){
                //             that.value3 = false,
                //             that.data1.push(that.formData);
                //         }
                //     })
                // }else {
                //     this.axios.post('http://localhost:8096/departMent/updateDepartMent', qs.stringify(datas)).then(function (result) {
                //         if(result.data.success){
                //             that.value3 = false
                //             that.data1.splice(index,1,that.formData)
                //         }
                //     })
                // }
                this.value3 = false;
                this.data1.splice(this.num, 1, this.formData);
                let param = {'url':this.formData.url,'pid':this.formData.autoId};
                updateProductUrl(param).then(res => {
                    this.$message("修改成功")
                });
                
            },
            modifyParent( row,index ) {
                // this.cleardata();
                this.formData = row;
                this.value3 = true;
                // this.formData = row;
                this.num = index;
                // this.data1.splice(index, 1, this.formData)
                // console.log(row,this.data1)
                // this.data1
                // console.log(this.data1)
                // this.data.
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
            
        },
        components:{
            Title
        }
    }
</script>
