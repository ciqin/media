<template>
    <div class="clearfix">
        <Menu mode="horizontal" :theme="theme1" active-name="1">
            <MenuItem name="1" on-select="links" to="/index/system/com">
                <Icon type="md-people" />
                单位管理
            </MenuItem>
            <MenuItem name="2" to="/index/system/department">
                <Icon type="ios-people" />
                部门管理
            </MenuItem>
            <MenuItem name="3" to="/index/system/role">
                <Icon type="md-contacts" />
                角色管理
            </MenuItem>
            <MenuItem name="4" to="/index/system/user">
                <Icon type="ios-person-add" />
                用户管理
            </MenuItem>
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
                theme1: 'light'
            }
        },
        methods:{
            links(){
                console.log(222);
            }
        }
   }
   
</script>

<style scoped>
.thead {
    width: 100%;
    background: #7080ad;
    height: 40px;
    line-height: 40px;
}
.parentItem {
    background: #2a384d;
    line-height: 40px;
    color: #fff;
}

.childItem {
    background: #4c5b73;
    color: #fff;
}

.ivu-btn-primary {
    background: #8bb9dc;
    border:0;
}
.ivu-menu-light {
    background: transparent;
    margin-top: -30px;
}
</style>

