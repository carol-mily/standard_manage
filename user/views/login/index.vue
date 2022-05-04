<template>
  <!-- status-icon表单校验时的图标,rules为校验,ref获得当前实例方便调用属性和方法-->
  <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login_container"
      label-position="left"
  >
    <h3 class="login_title">数据上链标准管理系统</h3>
    <el-form-item
        label="手机号"
        label-width="80px"
        prop="phone"
        class="phone"
        style="width: 350px; height: 40px"
    >
      <el-input
          type="input"
          v-model="form.phone"
          autocomplete="off"
          placeholder="请输入手机号码"
      ></el-input>
    </el-form-item>
    <el-form-item
        label="密码"
        label-width="80px"
        prop="password"
        class="password"
        style="width: 350px; height: 40px"
    >
      <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login_submit" label-width="0px">
      <el-button type="primary" @click="login" style="margin-left:140px">登录</el-button>
    </el-form-item>
    <el-form-item
        class="other"
        label-width="0px"
        style="width: 350px; height: 40px; display: inline">
      <el-link @click="forget" style="width:70px;height:40px;text-align: left; margin-left: 30px">忘记密码?</el-link>
      <el-link @click="register" style="width:30px;height:40px;text-align: right; margin-left: 190px">注册</el-link>
    </el-form-item>
  </el-form>
</template>

<script>
import Level from '../../util/level'
import router from "../../router";
import md5 from 'js-md5';  // main.js引入  或 登录界面引入


export default {
  name: "index",

  data() {
    return {
      form: {},
      rules: {
        phone: [
          {
            required: true, //必填
            message: "请输入手机号码", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            //用这个比较好
            pattern: '^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$',
            min: 11,  //最小长度\
            max: 11,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true, //必填
            message: "请输入密码", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            min: 6,
            max: 12,
            message: "密码长度应为6-12个字符",
            trigger: "blur"
          },
          {
            pattern: '^[A-Za-z0-9]+$',
            message: '密码应由大小英文字母或数字构成'
          },
        ]
      },
    }
  },

  methods: {
    login() {
      //等到最后，放出规则
      this.$refs["form"].validate((valid, msg) => { //验证校验信息
        if (valid) {
          this.request.post("/user/login", {
            phone: this.form.phone,
            password: md5(this.form.password)
          }).then(res => {
            console.log("function:/user/login")
            console.log(res, "res")
            if (res.code === '200') {
              //添加用户信息
              this.$store.commit('clearUser')
              this.$store.commit('setUser', res.data)
              let menu = res.data.menu //取出数据
              menu = Level.cleanChildren(menu) //清除不必要的children
              console.log("router")
              console.log(menu)
              //动态添加路由
              this.$store.commit('clearRoutes')
              this.$store.commit('setRoutes', menu)
              this.$store.commit('addRoutes', this.$router)
              console.log(router.getRoutes())
              menu = Level.getShowMenu(menu) //找到需要显示的menu
              console.log("menu")
              console.log(menu)
              this.$store.commit('clearMenu')
              this.$store.commit('setMenu', menu)
              //设置tag
              let tag = menu[0].children ? menu[0].children[0] : menu[0]
              console.log("tag")
              console.log(tag)
              this.$store.commit('clearTag')
              this.$store.commit('startTag', tag)
              //页面跳转
              this.$router.push({name: tag.name})
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          for (let key in msg) {
            this.$message.warning(msg[key][0].message)
            return false;
          }
        }
      })
    },

    register() {
      console.log("进入注册界面")
      //无法进入，原因在于main.js中的判断
      this.$router.push({name: '/register'})
    },

    forget() {
      console.log("进入忘记密码界面")
      //无法进入，原因在于main.js中的判断
      this.$router.push({name: '/forget'})
    },
  }
}
</script>

<style lang="less" scoped>
.login_container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}

.login_submit {
  margin: 0 auto 0 auto;
}
</style>