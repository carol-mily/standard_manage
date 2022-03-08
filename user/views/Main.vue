<template>
  <!--container布局-->
  <el-container style="height:100%">
    <el-aside style=" width:200px; background-color: #59827e">
      <!--抽成组件-->
      <common-aside></common-aside>
    </el-aside>
    <el-container style="height:100%">
      <el-header>
        <common-header></common-header>
      </el-header>
      <common-tag/>
      <el-main>
        <!--展示嵌套路由的组件-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "@/components/CommonAside";
import CommonHeader from "@/components/CommonHeader";
import CommonTag from "@/components/CommonTag";
export default {
  name: "Main",
  components:{
    CommonHeader,
    CommonAside,
    CommonTag
  },
  data(){
    return{}
  }
}
</script>

<style lang="less" scoped>
.el-header{
  background-color:#a1b6ad;
}
.el-main{
  padding-top: 0;
}
</style>