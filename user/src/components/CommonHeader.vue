<template>
  <header class="header">
    <div class="l-content">
      <img class="logo" :src="userImg" style="width: 40px; height: 40px"/>
      <h3>数据上链标准管理系统</h3>
      <el-menu
          default-active="$route.path"
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
              :index="item.id"
              :key="item.id"
              style="width:150px; text-align: center; font-size: 17px">
            <!--          <i :class="'el-icon-'+item.icon"></i>-->
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>
          <!--循环读取有子菜单的item-->
          <el-submenu
              :index="item.id"
              :key="item.id"
              v-if="item.children"
              style="width:150px; text-align: center; font-size: 16px">
            <template slot="title">
              <!--            <i :class="'el-icon-'+item.icon"></i>-->
              <span style="font-size: 17px">{{ item.label }}</span>
            </template>
            <!--二级菜单渲染-->
            <!---这个组件的格式问题未解决-->
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.id" :index="subItem.id">
              <el-menu-item
                  @click="clickMenu(subItem)"
                  :index="subItem.id"
                  :key="subItem.id"
                  style="width:150px; text-align: center; font-size: 17px;">{{ subItem.label }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="userImg"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!--对组件添加事件，需要添加native-->
          <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
      userImg: require('../assets/images/logo.png'),
    }
  },

  methods: {
    logOut() {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$store.commit('clearRoutes')
      this.$router.push('/login')
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
    }
  }
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
    width:1000px ;
    background-color: #001529;

    h3 {
      color: #f4f4f1;
      display: flex;
      justify-content: center;
      text-align: center;
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