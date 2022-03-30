<template>
  <el-container class="info">
    <div class="main">
      <common-form
          :form-label="formLabel"
          :form="form"
          class="form">
        <el-button type="primary" plain @click="editUser">确定</el-button>
      </common-form>
    </div>
  </el-container>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import {getUser,updateUser} from "../../api/data";

export default {
  name: "info",
  components: {CommonForm},
  data() {
    return {
      downloadImg: require('@/assets/icon/download.png'),
      editImg: require('@/assets/icon/edit.png'),
      formLabel: [
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
          type: "input",
          style: "width:200px;",
          disabled:true
        },
      ],
      form: {},
    }
  },

  methods: {
    //得到完整数据结构信息
    getList() {
      getUser({
        page: 1,
        name: this.$store.state.user.user.name
      }).then(({data: res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res, 'res')
        this.form = res.list.map(item => {
          //对sexLabel字段进行映射
          item.sexLabel = item.sex === 0 ? "女" : "男"
          return item
        })[0]
      });
    },


    editUser() {
      updateUser({
        id: this.$store.state.user.user.id,
        phone:this.form.phone,
        name: this.form.name,
        sex: this.form.sex,
        birth: this.form.birth,
        email: this.form.email,
        addr: this.form.addr
      }).then(() => {
        //同$confirm类似
        this.$message({
          type: "success",
          message: "修改成功！"
        });
      })
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