<template>
  <el-container class="info">
    <div class="main">
      <common-form
          ref="form"
          v-if="this.user.status===1"
          :form-label="adminFormLabel"
          :form="form"
          class="form"
          :rules="rules"
          @success="handleAvatarSuccess">
        <el-button type="primary" plain @click="editUser">修改信息</el-button>
      </common-form>
      <common-form
          ref="form"
          v-if="this.user.status===0"
          :form-label="userFormLabel"
          :form="form"
          class="form"
          :rules="rules"
          @success="handleAvatarSuccess">
        <el-button type="primary" plain @click="editUser">修改信息</el-button>
      </common-form>
    </div>
  </el-container>
</template>

<script>
import CommonForm from "@/components/CommonForm";

export default {
  name: "info",
  components: {CommonForm},
  data() {
    return {
      user: this.$store.state.user.user,
      downloadImg: require('@/assets/icon/download.png'),
      editImg: require('@/assets/icon/edit.png'),
      adminFormLabel: [
        {
          model: 'avatar',
          type: "upload",
          url: "http://localhost:9090/file/upload",
        },
        {
          model: 'name',
          label: "用户名",
          type: "input",
          style: "width:300px;",
        },
        {
          model: 'phone',
          label: "手机号",
          type: "input",
          style: "width:300px;",
          disabled: true
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          style: "width:300px;",
          opts: [
            {
              label: '女',
              value: 0
            },
            {
              label: '男',
              value: 1
            }
          ]
        },
        {
          model: 'birth',
          label: "出生日期",
          type: "date",
          style: "width:300px;",
        },
        {
          model: 'email',
          label: "邮箱号",
          type: "input",
          style: "width:300px;",
        },
        {
          model: 'addr',
          label: "地址",
          type: "input",
          style: "width:300px;",
        },
        {
          model: 'status',
          label: "身份",
          type: 'select',
          style: "width:300px;",
          opts: [
            {
              label: '用户',
              value: 0
            },
            {
              label: '管理员',
              value: 1
            }
          ],
          disabled: false
        },
      ],
      userFormLabel: [
        {
          model: 'avatar',
          type: "upload",
          url: "http://localhost:9090/file/upload"
        },
        {
          model: 'name',
          label: "用户名",
          type: "input",
          style: "width:300px;",
        },
        {
          model: 'phone',
          label: "手机号",
          type: "input",
          style: "width:300px;",
          disabled: true
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          style: "width:300px;",
          opts: [
            {
              label: '女',
              value: 0
            },
            {
              label: '男',
              value: 1
            }
          ]
        },
        {
          model: 'birth',
          label: "出生日期",
          type: "date",
          style: "width:300px;",
        },
        {
          model: 'email',
          label: "邮箱号",
          type: "input",
          style: "width:300px;",
        },
        {
          model: 'addr',
          label: "地址",
          type: "input",
          style: "width:300px;",
        },
        {
          model: 'status',
          label: "身份",
          type: 'select',
          style: "width:300px;",
          opts: [
            {
              label: '用户',
              value: 0
            },
            {
              label: '管理员',
              value: 1
            }
          ],
          disabled: true
        },
      ],
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"  //触法方式
          },
          {
            min: 1,
            max: 10,
            message: "用户名长度应为1-10个字符",
            trigger: "blur"
          },
          {
            pattern: '^[A-Za-z0-9\u4e00-\u9fa5]+$',
            message: '用户名应由中文、英文或数字组成'
          }
        ],
        email: [
          {
            min: 2,
            max: 30,
            message: "邮箱长度应为2-30个字符",
            trigger: "blur"
          },
          {
            pattern: '^[A-Za-z0-9\u4e00-\u9fa5_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$',
            message: '请输入正确的邮箱号'
          }
        ],
        addr:{
          max: 100,
          message: "地址应在100个字符以内",
          trigger: "blur"
        }
      },
      validInfo:{ //检验form内信息是否通过校验
        value:0,
        message:''
      }
    }
  },

  methods: {
    //得到完整数据结构信息
    async getList() { //同步更新数据
      this.request.get("/user/" + this.user.phone).then(res => {
        if (res.code === '200') {
          this.form = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },

    editUser() {
      this.$refs.form.isValid(this.validInfo) //调用form中的函数
      if (this.validInfo.value === 0) { //校验不通过
        this.$message.warning(this.validInfo.message)
      } else {
        if (this.form.status !== 1 && this.user.status === 1) {
          //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
          this.$confirm("此操作将更改您的身份信息并返回登录页，是否继续？", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.request.post("/user/update", this.form).then(res => {
              if (res.code === '200') {
                this.$message.success(res.message)
                //触发父级main更新user的方法
                this.$emit("refreshUser")
                //返回登录页
                this.$router.push('/login')
                this.$store.commit('clearUser')
                this.$store.commit('clearToken')
                this.$store.commit('clearMenu')
                this.$store.commit('clearRoutes')
              } else {
                this.$message.error(res.message)
              }
            })
          })
        } else {
          this.request.post("/user/update", this.form).then(res => {
            if (res.code === '200') {
              this.$message.success(res.message)
              //触发父级main更新user的方法
              this.$emit("refreshUser")
            } else {
              this.$message.error(res.message)
            }
          })
        }
      }
    },

    handleAvatarSuccess(res) {
      this.form.avatar = res
      console.log("res")
    }
  },

  computed: {
    //动态获取菜单
    asyncStan() {
      return this.$store.state.standard.standard
    }
  },

  created() {
    this.getList()
  }
}
</script>

<style scoped lang="less">
.info {
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