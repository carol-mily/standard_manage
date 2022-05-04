<template>
  <el-container class="password">
    <div class="main">
      <common-form
          :form-label="formLabel"
          :form="form"
          :rules="rules"
          ref="form"
          class="form">
        <el-button type="primary" plain @click="changePassword">确定</el-button>
      </common-form>
    </div>
  </el-container>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import md5 from 'js-md5';  // main.js引入  或 登录界面引入

export default {
  name: "password",
  components: {CommonForm},
  data() {
    return {
      downloadImg: require('@/assets/icon/download.png'),
      editImg: require('@/assets/icon/edit.png'),
      formLabel: [
        {
          model: 'password',
          label: "输入密码",
          type: "password",
          style: "width:200px;",
        },
        {
          model: 'password2',
          label: "确认密码",
          type: "password",
          style: "width:200px;",
        },
      ],
      form: {
        password:'',
        password2:''
      },
      rules: {
        password:[
          {
            required: true, //必填
            message: "请输入密码", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            min:6,
            max:12,
            message:"密码长度应为6-12个字符",
            trigger: "blur"
          },
          {
            pattern: '^[A-Za-z0-9]+$',
            message: '密码应由大小英文字母或数字构成'
          },
        ],
        password2:[
          {
            required: true, //必填
            message: "请输入密码", //校验不通过的提示信息
          },
          {
            min:6,
            max:12,
            message:"密码长度应为6-12个字符",
            trigger: "blur"
          },
          {
            pattern: '^[A-Za-z0-9]+$',
            message: '密码应由大小英文字母或数字构成'
          },
        ],
      },
      validInfo:{ //检验form内信息是否通过校验
        value:0,
        message:''
      },
    }
  },

  methods: {
    changePassword() {
      this.$refs.form.isValid(this.validInfo) //调用form中的函数
      if (this.validInfo.value === 0) { //校验不通过
        this.$message.warning(this.validInfo.message)
      } else {
        if (this.form.password !== this.form.password2) {
          this.$message.warning("两次密码不相同！")
        } else {
          this.request.post("/user/forgetPassword", {
            phone:this.$store.state.user.user.phone,
            password:md5(this.form.password)
          }).then(res => {
            console.log("function:forgetPassword")
            console.log(res, 'res')
            if (res.code === '200') {
              this.$message.success(res.message)
              this.$store.state.user.user.password=this.form.password
            } else {
              this.$message.error(res.message)
            }
          })
        }
      }
    }
  },

  computed: {},

  created() {}
}
</script>

<style scoped lang="less">
.password {
  background-color: white;
  padding: 0;
  max-width: 100%;
  height: 100%;

  .main {
    width: 100%;
    height: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .form {
      height: auto;
      width: auto;
      display: block;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>