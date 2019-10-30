<template>
    <div class="clearfix">
        <Menu mode="horizontal" :theme="theme1" active-name="1">
            <MenuItem name="1" :to="'/index/system/department/'+id">
                <Icon type="ios-people" class="icon-system"/>
                部门管理
            </MenuItem>
            <MenuItem name="2" to="/index/system/role">
                <Icon type="ios-person-add" class="icon-system" />
                管理员
            </MenuItem>
            <MenuItem name="4" to="/index/system/user">
                <Icon type="ios-person-add" class="icon-system" />
                用户管理
            </MenuItem>
             <Submenu name="3" style="font-size:17px;">
                <template slot="title">
                    <Icon type="ios-stats" class="icon-system" />
                    资料管理
                </template>
                <div @click="linksis(item)" v-for="(item,index) in datas" :key="item.name">
                      <MenuItem :name="'active'+index" :to="item.link+'/'+item.autoId">{{item.name}}</MenuItem>
                </div>
            </Submenu>
        </Menu>
        <div class="box">
            <router-view/>
        </div>   
    </div>
</template>
<script>
    import {getSiderBar} from '@/http/api'
    
   export default { 
       data() {
        return{
                id:this.$route.params.id,
                theme1: 'light',
                datas:null,
                linkArr:[ //路由信息
                    {
                        "name":"产品物料",
                        "link":"/index/system/project",
                    },
                    {
                        "name":"产品演示地址",
                        "link":"/index/system/yanshi",
                    },
                    {
                        "name":"应用案例",
                        "link":"/index/system/yinyong",
                    },
                    {
                        "name":"闻思报告",
                        "link":"/index/system/wensi",
                    }
                ]
            }
        },
        methods:{
            linksis(item){
               this.$store.commit("commonGuanli",item.name);
            }
        },
        mounted(){
            getSiderBar().then(res => {
                this.datas = res.obj;
                _.remove(this.datas,function(o){
                    return o.name =="权限管理"
                })
                let index;
                for(let i in this.linkArr){ //合并获取的数据和设定的路由数据
                    
                    if(_.findIndex(this.datas,(o)=>{return o.name==this.linkArr[i].name})!=-1){
                        index = _.findIndex(this.datas,(o)=>{return o.name==this.linkArr[i].name});
                        Object.assign(this.datas[index],this.linkArr[i]);
                    }
                }
            })
        }
   }
   
</script>
<style lang="less" scoped>
    .ivu-menu-light {
        margin-top: -16px;
    }
    .icon-system{
        font-size:20px;
    }
    .ivu-menu-item{
        font-size: 17px;
    }
    .ivu-menu-submenu-title{
        font-size:17px;
    }
    .company_box {
        position: relative;
    }
    .comMsg {
        background: #fff;
        padding:24px;
        margin-bottom: 20px;
    }
    .ivu-table-wrapper {
        border:0;
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

    .ivu-table th {
        text-align: center;
        font-size:16px;
        height: 50px;
        color:#5b5b5b;
    }
    .ivu-table-stripe .ivu-table-body tr.ivu-table-row-hover td, .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-hover td {
        background-color: #f1f6ff;
    }
    .ivu-table-stripe .ivu-table-body tr td, .ivu-table-stripe .ivu-table-fixed-body tr td {
        text-align: center;
        font-size: 14px;
    }
    .ivu-table-stripe .ivu-table-body tr td, .ivu-table-stripe .ivu-table-fixed-body tr td {
        background-color: #f1f6ff;
    }
</style>


