<template>
  <el-container class="info">
    <div class="main">
      <common-form
          v-if="this.$store.state.user.user.status===1"
          :form-label="adminFormLabel"
          :form="form"
          class="form">
        <el-button type="primary" plain @click="editUser">修改信息</el-button>
      </common-form>
      <common-form
          v-if="this.$store.state.user.user.status===0"
          :form-label="userFormLabel"
          :form="form"
          class="form">
        <el-button type="primary" plain @click="editUser">修改信息</el-button>
      </common-form>
    </div>
  </el-container>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import { getUser4Phone, updateUser} from "../../api/data";

export default {
  name: "info",
  components: {CommonForm},
  data() {
    return {
      downloadImg: require('@/assets/icon/download.png'),
      editImg: require('@/assets/icon/edit.png'),
      adminFormLabel: [
        {
          model: 'name',
          label: "用户名",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'phone',
          label: "手机号",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          style: "width:200px;",
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: "出生日期",
          type: "date",
          style: "width:200px;",
        },
        {
          model: 'email',
          label: "邮箱号",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'addr',
          label: "地址",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'status',
          label: "身份",
          type: 'select',
          style: "width:200px;",
          opts: [
            {
              label: '管理员',
              value: 1
            },
            {
              label: '用户',
              value: 0
            }
          ],
          disabled:false
        },
      ],
      userFormLabel: [
        {
          model: 'name',
          label: "用户名",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'phone',
          label: "手机号",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          style: "width:200px;",
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: "出生日期",
          type: "date",
          style: "width:200px;",
        },
        {
          model: 'email',
          label: "邮箱号",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'addr',
          label: "地址",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'status',
          label: "身份",
          type: 'select',
          style: "width:200px;",
          opts: [
            {
              label: '管理员',
              value: 1
            },
            {
              label: '用户',
              value: 0
            }
          ],
          disabled:true
        },
      ],
      form: {},
    }
  },

  methods: {
    //得到完整数据结构信息
    getList() {
      //用手机号搜索
      getUser4Phone({
        phone: this.$store.state.user.user.phone
      }).then(({data: res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res, 'res')
        this.form=res.data.list
        this.form.sex = this.form.sex === 0 ? "女" : "男"
        this.form.status = this.form.status === 0 ? "用户" : "管理员"
      });
    },

    editUser() {
      //映射
      if(this.form.sex!==1&&this.form.sex!==0){
        this.form.sex = this.form.sex === '女' ? 0 : 1
      }
      if(this.form.status!==1&&this.form.status!==0){
        this.form.status = this.form.status === '用户' ? 0 : 1
      }
      if(this.form.status!==1&&this.$store.state.user.user.status===1){
        //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
        this.$confirm("此操作将更改您的身份信息并返回登录页，是否继续？", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          updateUser(this.form).then(res => {
            console.log(res)
            this.isShow = false
            //返回登录页
            this.$store.commit('clearToken')
            this.$store.commit('clearMenu')
            this.$store.commit('clearRoutes')
            this.$router.push('/login')
            //同$confirm类似
            this.$message({
              type: "success",
              message: "修改成功！"
            })
          })
        })
      }else{
        updateUser(this.form).then(res => {
          console.log(res)
          this.isShow = false
          //更新列表
          this.getList()
          //同$confirm类似
          this.$message({
            type: "success",
            message: "修改成功！"
          })
        })
      }
    },

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
      display: block;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>