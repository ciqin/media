<template>
    <div class="company_box">
        <div style="padding:18px 18px 0 18px;">
             <Row>
                <Col span="3"><Title :title="guanli+'管理'"></Title></Col>
                <Col span="19"> 
                    <select class="MaterialList" @change="changeTable">
                        <option value="">媒体行业应用案例</option>
                        <option value="">政务领域应用案例</option>
                        <option value="">舆情领域应用案例</option>
                        <option value="">警务领域应用案例</option>
                    </select>
                </Col>
                <Button  class="btnMedal" @click="addModalShow" type="primary" style="margin-left: 70px;">添加</Button>
            </Row>
        </div>
         <Table :data="data1" :columns="tableColumns1" stripe>
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot="action">
                 <Button shape="circle" icon="ios-create-outline"></Button>
                 <Button shape="circle" icon="ios-trash-outline"></Button>
            </template>
        </Table>
    </div>
</template>
<script>
    import Title from "@/components/assembly/title";

    import { getDepartment,removeDepartment,getapplicationList} from '@/http/api';
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
                data:[],
                value3: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                num:1,
                formData: {
                    address: "",
                    contacter: null,
                    createTime: "",
                    email: null,
                    fax: "",
                    id: "",
                    instId: null,
                    leader: "",
                    name: "",
                    note: null,
                    status: "",
                    telephone: null,
                    userDep: null
                },
                tableColumns1: [
                    {
                        title: '文件名称',
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
        mounted () {
            getapplicationList().then(res => {
                this.data = res
                console.log(res)
            })
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

            },
            modifyParent( row,index ) {
                this.value3 = true;
                // this.formData = row;
                this.num = index;

            },
            
        },
        components:{
            Title
        }
    }
</script>


<style lang="less">
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
