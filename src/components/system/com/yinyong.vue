<template>
    <div class="company_box">
        <div style="padding:18px 18px 0 18px;border-bottom:1px solid #d1d1d1;">
             <Row>
                <Col span="3"><Title :title="guanli+'管理'"></Title></Col>
                <Col span="19"> 
                    <select class="MaterialList" @change="changeTable">
                        <option value="">媒体行业应用案例</option>
                        <option value="">政务领域应用案例</option>
                        <option value="">舆情领域应用案例</option>
                        <option value="">警务领域应用案例</option>
                    </select>
                     <select class="MaterialList" @change="changeTable" style="margin-left: 30px;">
                        <option value="">新华社</option>
                        <option value="">新华社1</option>
                        <option value="">新华社2</option>
                        <option value="">新华社3</option>
                        <option value="">新华社4</option>
                    </select>
                </Col>
                <Button  class="btnMedal" @click="addModalShow" type="primary" style="margin-left: 70px;">添加</Button>
            </Row>
        </div>
        <div v-for="item in data" :key="item.title">
            <div class="clearfix">
                <div class="titleChild">
                    <img src="/static/images/icon/ppt_icon.png" >
                    <span>{{item.title}}</span>
                </div>
                <Button  class="btnMedalChild" @click="addModalShow" type="primary" style="margin-right: 25px;">添加</Button>
            </div>
            <div>
                <Table :data="item.data" :columns="tableColumns1" stripe>
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template  slot="action">
                        <Button shape="circle" icon="ios-create-outline"></Button>
                        <Button shape="circle" icon="ios-trash-outline"></Button>
                    </template>
                </Table>
            </div>
        </div>
        <!-- <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div> -->
    </div>
</template>
<script>
    import Title from "@/components/assembly/title";

    import { getDepartment,removeDepartment,getapplicationList} from '@/http/api';
    import {mapState} from 'vuex'

    export default {
        data () {
            return {
                data1: [],
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
