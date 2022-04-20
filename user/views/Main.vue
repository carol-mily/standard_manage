<template>
  <!--container布局-->
  <el-container style="height:100%;padding: 0">
    <el-header class="header">
      <common-header></common-header>
    </el-header>
    <common-tag />
    <el-main class="main">
      <!--展示嵌套路由的组件-->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import CommonHeader from "@/components/CommonHeader";
import CommonTag from "@/components/CommonTag";

export default {
  name: "Main",
  components: {
    CommonHeader,
    CommonTag
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.header {
  background-color: #001529;
  padding: 0;
  width: 100%;
  text-align: center;
  height: 60px !important;
  display: flex;
}

.main {
  background-color: white;
  padding: 0 10px 10px 10px;
  width: 100%;
  height: 100%;
}
</style>