<template>
  <header class="header">
    <div class="l-content">
<!--      <img class="logo" :src="sysIcon" style="width: 40px; height: 40px"/>-->
      <h3>数据上链标准管理系统</h3>
      <!--当user存在时才有目录-->
      <el-menu
          v-if="this.$store.state.user.user!=={}"
          :default-active="defaultAct"
          class="el-menu-vertical-demo"
          mode="horizontal"
          @open="handleOpen"
          @close="handleClose"
          background-color="#001529"
          text-color="#F7F8F9"
          active-text-color="#FFCA42">
        <!--利用v-for和v-if循环读取菜单-->
        <template v-for="item in this.asyncMenu">
          <!--循环读取无子菜单的item-->
          <el-menu-item
              @click="clickMenu(item)"
              v-if="!item.children"
              :index="item.name"
              :key="item.name"
              style="width:150px; text-align: center; font-size: 17px">
            <!--          <i :class="'el-icon-'+item.icon"></i>-->
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>
          <!--循环读取有子菜单的item-->
          <el-submenu
              :index="item.name"
              :key="item.name"
              v-if="item.children"
              style="width:150px; text-align: center; font-size: 16px">
            <template slot="title">
              <!--            <i :class="'el-icon-'+item.icon"></i>-->
              <span style="font-size: 17px">{{ item.label }}</span>
            </template>
            <!--二级菜单渲染-->
            <!---这个组件的格式问题未解决-->
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.id" :index="subItem.id.toString()">
              <el-menu-item
                  @click="clickMenu(subItem)"
                  :index="subItem.name"
                  :key="subItem.name"
                  style="width:150px; text-align: center; font-size: 17px;">{{ subItem.label }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="r-content">
      <el-dropdown v-if="this.$store.state.user.user.phone!==undefined" trigger="click" size="mini">
        <span>
          <img class="user" :src="user.avatar"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!--对组件添加事件，需要添加native-->
          <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-if="this.$store.state.user.user.phone===undefined"
                 type="primary"
                 plain
                 @click="logIn"
                 style="height: 38px">登录</el-button>
    </div>
  </header>
</template>

<script>
//引入store中的数据，vuex提供了mapStore
import {mapState} from 'vuex'


export default {
  name: "CommonHeader",
  data() {
    return {
      sysIcon:  require('@/assets/images/logo.png'),
      defaultAct:this.$router.currentRoute.name
    }
  },

  props:{
    user:Object,
  },

  methods: {
    logIn(){
      this.$router.push('/login') //跳转至登陆页面
    },

    logOut() {
      // this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$store.commit('clearTag')  //清除tag
      this.$store.commit('clearUser')
      this.user={}  //user置为空
      this.$store.commit('clearRoutes') //这里其实并没有清除，但清除了user，故无token
      this.$router.replace({path: '/home'});  //跳转到home
      location.reload();  //刷新页面
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    clickMenu(item) {
      //跳转
      this.$router.push({
        name: item.name
      })
      //将当前选中菜单提交给store，调用selectMenu
      this.$store.commit('selectMenu', item)
    }
  },

  computed: {
    //注入tabsList
    ...mapState({
      tags: state => state.tab.tabsList
    }),
    //动态获取菜单
    asyncMenu() {
      return this.$store.state.tab.menu
    },
  },

  watch:{
    '$route'(val){  //对路由进行监听（val内为当前路由）
      if(val.name!=='edit'&&val.name!=='check'&&val.name!=='umanage'){
        this.defaultAct=val.name
      }
    }
  },

  created(){}
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background-color: #001529;

  .l-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    height: 100%;
    width:1500px ;
    background-color: #001529;

    h3 {
      color: #f4f4f1;
      display: flex;
      justify-content: center;
      text-align: center;
      font-size:20px;
      line-height: 48px;
      width: 300px;
      height: 100%;
    }
  }

  .r-content {
    display: flex;
    align-items: center;
    background-color: #001529;
    margin-right: 10px;

    .user {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }


}


.el-menu {
  height: 100%;
  border: none;
}

//.el-menu-item:hover {
//  background: #002446 !important;
//  color: #fff !important;
//}
//
//.el-submenu-item:hover {
//  background: #002446 !important;
//  color: #fff !important;
//}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  margin-left: 10px;
  height: 100%;
  width: 100%;
}

.el-menu-item-group {
  width: 150px;
}
</style>