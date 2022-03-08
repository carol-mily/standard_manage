<template>
  <header>
    <div class="l-content">
      <!--面包屑，动态注入数据-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{path: item.path }">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="userImg"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
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
  data(){
    return {
      userImg:require('../assets/images/logo.png')
    }
  },

  methods:{
    logOut(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/login')
    }
  },

  computed:{
    //注入tabsList
    ...mapState({
      tags:state => state.tab.tabsList
    })
  }
}
</script>

<style lang="less" scoped>
header{
  display: flex;
  height:100%;
  justify-content: space-between;
  align-items: center;
}
.l-content{
  display: flex;
  align-items: center;
  .h{
    margin-right:20px;
  }
}
.r-content{
  display: flex;
  align-items: center;
  .user{
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
}
</style>