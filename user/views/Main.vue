<template>
  <!--container布局-->
  <el-container style="height:100%;padding: 0">
    <el-header class="header">
      <common-header :user="user"></common-header>
    </el-header>
    <common-tag />
    <el-main class="main">
      <!--展示嵌套路由的组件-->
      <router-view @refreshUser="getUser"></router-view>
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
    return {
      user:this.$store.state.user.user,
    }
  },

  methods:{
    /**
     *获取用户信息
     * 当info界面数据变化时，作为其父的main也需要刷新信息，以供其他组件使用（这里主要是Header）
     */
    getUser(){
      if(this.$store.state.user.user.phone!==undefined){ //利用store中的user,phone来判断用户是否登录
        this.request.get("/user/"+this.$store.state.user.user.phone).then(res=>{
          if(res.code==='200'){
            this.user=res.data
          }else{
            this.$message.error(res.message)
          }
        })
      }
    },
  },

  created() {
    //从后台获取最新数据，因为登录时并没有获取avatar
    this.getUser();
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