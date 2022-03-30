<template>
  <el-container class="password">
    <div class="main">
      <common-form
          :form-label="formLabel"
          :form="form"
          class="form">
        <el-button type="primary" plain @click="changePassword">确定</el-button>
      </common-form>
    </div>
  </el-container>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import {changePassword} from "../../api/data";

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
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'password2',
          label: "确认密码",
          type: "input",
          style: "width:200px;",
        },
      ],
      form: {},
    }
  },

  methods: {
    //得到完整数据结构信息
    changePassword() {
      console.log('123:'+this.$store.state.user.user.name)
      changePassword({
        phone:this.$store.state.user.user.phone,
        password:this.form.password
      }).then(()=>{
            //同$confirm类似
            this.$message({
              type:"success",
              message:"修改密码成功！"
            })
        this.$router.push({name: 'home'})
          });
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
      display: block;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>