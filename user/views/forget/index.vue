<template>
  <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="forget_container"
      label-position="left"
  >
    <h3 class="forget_title">修改密码</h3>
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
          placeholder="6-12位，由大小英文字母或数字构成"
      ></el-input>
    </el-form-item>
    <el-form-item
        label="确认密码"
        label-width="80px"
        prop="password2"
        class="password2"
        style="width: 350px; height: 40px"
    >
      <el-input
          type="password"
          v-model="form.password2"
          placeholder="请再次输入密码"
      ></el-input>
    </el-form-item>

    <el-form-item class="register_submit" label-width="0px">
      <el-button
          type="primary"
          @click="forget"
          style="margin-left:140px">确定
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
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
            min: 11,  //最小长度
            max: 11,
            pattern: '^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$',
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
        ],
        password2: [
          {
            required: true, //必填
            message: "请再次输入密码", //校验不通过的提示信息
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
        ],
      },
    }
  },

  methods: {
    forget() {
      this.$refs["form"].validate((valid, msg) => { //验证校验信息
        if (valid) {
          console.log("submit");
          if (this.form.password !== this.form.password2) {
            this.$message.warning("两次密码不相同！")
          } else {
            this.request.post("/user/forgetPassword", {
                  phone: this.form.phone,
                  password: md5(this.form.password)
                }
            ).then(res => {
              console.log("function:forgetPassword")
              console.log(res, 'res')
              if (res.code === '200') {
                this.$message.success(res.message)
                this.$router.push({name: '/login'})
              } else {
                this.$message.error(res.message)
              }
            })
          }
        } else {
          for (let key in msg) {
            this.$message.warning(msg[key][0].message)
            return false;
          }
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.forget_container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.forget_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}

.forget_submit {
  margin: 0 auto 0 auto;
}
</style>