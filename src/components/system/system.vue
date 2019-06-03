<template>
    <div class="clearfix">
        <Menu mode="horizontal" :theme="theme1" active-name="1">
            <MenuItem name="2" to="/index/system/department">
                <Icon type="ios-people" />
                部门管理
            </MenuItem>
            <MenuItem name="1" to="/index/system/role">
                <Icon type="ios-person-add" />
                管理员
            </MenuItem>
            <MenuItem name="4" to="/index/system/user">
                <Icon type="ios-person-add" />
                用户管理
            </MenuItem>
             <Submenu name="3">
                <template slot="title">
                    <Icon type="ios-stats" />
                    资料管理
                </template>
                <div @click="linksis(item)" v-for="(item,index) in linkArr" :key="item.name">
                      <MenuItem :name="'active'+index" :to="item.link">{{item.name}}</MenuItem>
                </div>
            </Submenu>
        </Menu>
        <div class="box">
            <router-view/>
        </div>   
    </div>
</template>
<script>
   export default { 
       data() {
        return{
                theme1: 'light',
                linkArr:[
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
        }
   }
   
</script>
<style lang="less" scoped>
    .ivu-menu-light {
        margin-top: -16px;
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


