<template>
  <!-- status-icon表单校验时的图标,rules为校验,ref获得当前实例方便调用属性和方法-->
  <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login_container"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"
        class="username"
    >
      <el-input
          type="input"
          v-model="form.username"
          autocomplete="off"
          placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item
        label="密码"
        label-width="80px"
        prop="password"
    >
      <el-input
        type="password"
        v-model="form.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login" class="login_submit" style="margin-right: 10px">登录</el-button>
      <el-button type="danger" @click="register" class="register_submit" style="margin-right: 10px">注册</el-button>
      <el-link type="info" @click="forget" :underline="false" style="display: flex;justify-content: center; align-items: center">忘记密码？</el-link>
    </el-form-item>
  </el-form>
</template>

<script>
//使用mock模拟token
// import Mock from 'mockjs'
import {getMenu} from '../../api/data'
export default {
  name: "index",

  data() {
    return {
      form: {},
      rules: {
        username: [
          {
            required: true, //必填
            message: "请输入用户名", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            min: 3,  //最小长度为3
            message: "用户名长度不能小于3位",
            trigger: "blur"
          }
        ],
        password:[
          {
            required: true, //必填
            message: "请输入密码", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
        ]
      }
    }
  },

  methods:{
    login(){
      getMenu(this.form).then(({data:res})=>{
        if(res.code === 20000){

          console.log(res)
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu',res.data.menu)
          //使用接口数据,验证token
          this.$store.commit('setToken',res.data.token)
          this.$store.commit('addMenu',this.$router)
          //页面跳转
          this.$router.push({name: 'home'})
        }else{
          this.$message.warning(res.data.message)
        }
      })
      //使用mock模拟token
      // const token=Mock.random.guid()
      // this.$store.commit('setToken',token)
      // this.$router.push({name: 'home'})
    },

    register(){
      console.log("进入注册界面")
      //无法进入，原因在于main.js中的判断
      // this.$router.push({name: '/register'})
    },

    forget(){
      console.log("进入忘记密码界面")
      //无法进入，原因在于main.js中的判断
      // this.$router.push({name: '/forget'})
    },
  }
}
</script>

<style lang="less" scoped>
.login_container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title{
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login_submit{
  margin: 10px auto 0px auto;
}
</style>