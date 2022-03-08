<template>
  <el-col :span="12">
    <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#59827e"
        text-color="#fff"
        active-text-color="#ffce4e">
      <h3>通用后台管理系统</h3>
      <!--循环读取无子菜单的item-->
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <!--循环读取有子菜单的item-->
      <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
        <template slot="title">
          <i :class="'el-icon-'+item.icon"></i>
          <span>{{ item.label }}</span>
        </template>
        <!--二级菜单渲染-->
        <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
          <el-menu-item  @click="clickMenu(subItem)" :index="subIndex">{{ subItem.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
      //菜单内容
      menu: [
          //静态菜单
        // {
        //   path: '/',
        //   name: 'home',
        //   label: '首页',
        //   icon: 's-home',
        //   url: 'Home/Home'
        // },
        // {
        //   path: '/mall',
        //   name: 'mall',
        //   label: '商品管理',
        //   icon: 'video-play',
        //   url: 'MallManage/MallManage'
        // },
        // {
        //   path: '/user',
        //   name: 'user',
        //   label: '用户管理',
        //   icon: 'user',
        //   url: 'UserManage/UserManage'
        // },
        // {
        //   label: '其他',
        //   icon: 'location',
        //   children: [
        //     {
        //       path: '/page1',
        //       name: 'page1',
        //       label: '页面1',
        //       icon: 'setting',
        //       url: 'Other/PageOne'
        //     },
        //     {
        //       path: '/page2',
        //       name: 'page2',
        //       label: '页面2',
        //       icon: 'setting',
        //       url: 'Other/PageTwo'
        //     }
        //   ]
        // },
      ]
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
      //跳转
      this.$router.push({
        name:item.name
      })
      //将当前选中菜单提交给store，调用selectMenu
      this.$store.commit('selectMenu',item)
    }
  },

  computed: {
    //没有子项目
    noChildren() {
      return this.asyncMenu.filter(item => !item.children)
    },
    //有子项目
    hasChildren() {
      return this.asyncMenu.filter(item => item.children)
    },
    //动态获取菜单
    asyncMenu(){
      return this.$store.state.tab.menu
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu{
  height: 100%;
  border: none;
  h3{
    color: #ffffff;
    text-align: center;
    line-height: 48px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>