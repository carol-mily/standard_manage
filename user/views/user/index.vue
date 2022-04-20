<template>
  <div class="user" style="height: 100%">
    <el-dialog
        :title="operateType==='add' ? '新增用户' : '编辑用户'"
        :visible.sync="isShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="operateFormLabel"
          :form="operateForm"
          :inline="true"
          ref="form"></common-form>
      <div slot="footer" class="dialog__footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>

    <div class="search">
      <div class="l-content">
        <common-form
            class="searchForm"
            :form-label="formLabel"
            :form="searchForm"
            :inline="true"
            ref="form">
          <el-button type="primary"
                     plain
                     @click="searchUser"
                     style="height: 38px"
          >搜索
          </el-button>
        </common-form>
      </div>
      <div class="r-content">
        <el-select class="status" v-model="showStatus" placeholder="角色" @change="searchUser">
          <el-option label="全部" value=2></el-option>
          <el-option label="用户" value=0></el-option>
          <el-option label="管理员" value=1></el-option>
        </el-select>
        <el-button class="add" type="primary" icon="el-icon-plus" plain @click="addUser"></el-button>
        <el-button class="delete" type="primary" icon="el-icon-delete" plain @click="deleteUser"></el-button>
      </div>
    </div>

    <div class="show">
      <common-table
          :table-data="tableData"
          :table-label="tableLabel"
          :config="config"
          :has-pager=true
          :page-name="pageName"
          @changePage="getList()"
          @editUser="editUser"
          @deleteUser="delUser"
          @selectionChange="selectionChange"
      ></common-table>
    </div>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable";
import {createUser, updateUser, deleteUser, getUser4Name} from "../../api/data"

export default {
  name: "index",

  components: {
    CommonForm,
    CommonTable
  },

  data() {
    return {
      pageName: 'user',
      //表单相关
      operateType: 'add',
      isShow: false,
      operateFormLabel: [
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
          rules: [
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
          ]
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
          ]
        },
      ],
      operateForm: {},
      selection: [], //选中用户的电话号码
      //搜索功能相关
      formLabel: [
        {
          model: "keyword",
          label: '',
          type: 'search',
          style: "width:500px"
        }
      ],
      searchForm: {
        keyword: ''
      },
      searchName: '', //当前搜索名称
      //表格相关
      tableData: [],
      tableLabel: [
        {
          //列的名称
          label: "序号",
          width: 50
        },
        {
          //数据中读取的字段的名称
          prop: "name",
          //列的名称
          label: "姓名",
          width: 100
        },
        {
          //数据中读取的字段的名称
          prop: "phone",
          //列的名称
          label: "手机号码",
          width: 200
        },
        {
          //数据中读取的字段的名称
          prop: "status",
          //列的名称
          label: "身份",
          width: 100
        },
        {
          //数据中读取的字段的名称
          prop: "birth",
          //列的名称
          label: "出生日期",
          width: 200
        },
        {
          //数据中读取的字段的名称
          prop: "addr",
          //列的名称
          label: "地址",
          width: 350
        },
        {
          //数据中读取的字段的名称
          prop: "sex",
          //列的名称
          label: "性别",
          width: 50
        },
        {
          //数据中读取的字段的名称
          prop: "email",
          //列的名称
          label: "邮箱",
          width: 300
        }
      ],
      showStatus: '2',
      config: {
        pager: 1,
        total: 10,
        pageSize: 10
      }, //默认页数值
    }
  },

  methods: {
    getList() {
      this.config.loading = true
      getUser4Name({
        page: this.config.pager,
        name: this.searchName,
        status: this.showStatus
      }).then(({data: res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res, 'res')
        if (res.code === 20000) {
          this.tableData = res.data.list.map(item => {
            //对sexLabel字段进行映射
            item.sex = item.sex === 0 ? "女" : "男"
            item.status = item.status === 0 ? "用户" : "管理员"
            return item
          })
          this.config.total = res.data.count
          this.config.loading = false
        } else {
          this.$message.warning('信息获取失败')
        }
      });
    },

    confirm() {
      if (this.operateType === 'edit') {  //编辑
        //映射
        if (this.operateForm.sex !== 1 && this.operateForm.sex !== 0) {
          this.operateForm.sex = this.operateForm.sex === '女' ? 0 : 1
        }
        if (this.operateForm.status !== 1 && this.operateForm.status !== 0) {
          this.operateForm.status = this.operateForm.status === '用户' ? 0 : 1
        }
        if (this.operateForm.status !== 1 && this.operateForm.phone === this.$store.state.user.user.phone) {
          //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
          this.$confirm("此操作将更改您的身份信息并返回登录页，是否继续？", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            updateUser(this.operateForm).then(res => {
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
        } else {
          updateUser(this.operateForm).then(({data: res}) => {
            console.log(res)
            if (res.code === 20000) {
              this.isShow = false
              //更新列表
              this.getList()
              //同$confirm类似
              this.$message({
                type: "success",
                message: "修改成功"
              })
            } else {
              this.$message({
                type: "error",
                message: "该手机号已存在其他账号"
              })
            }
          })
        }
      } else {  //新增
        createUser(this.operateForm).then(({data: res}) => {
          console.log(res)
          if (res.code === 20000) {
            this.isShow = false
            //更新列表
            this.getList()
            //同$confirm类似
            this.$message({
              type: "success",
              message: "添加成功"
            })
          } else {
            console.log('0000000')
            this.$message({
              type: "error",
              message: "该手机号已存在账号"
            })
          }
        })
      }
    },

    addUser() {
      this.isShow = true
      this.operateType = 'add'
      //数据初始化
      this.operateForm = {
        name: '',
        phone:'',
        status:0,
        addr: '',
        birth: '',
        sex: 0,
        email:''
      }
    },

    searchUser() {
      this.searchName = this.searchForm.keyword
      this.config.pager = 1
      this.getList()
    },

    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      //表内数据显示为当前行内的数据，回写
      this.operateForm = {
        id:row.id,
        name: row.name,
        phone:row.phone,
        status:row.status,
        addr: row.addr,
        birth: row.birth,
        sex: row.sex,
        email:row.email
      }
    },

    //删除单个用户
    delUser(row) {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteUser({
          phoneList: [row.phone]
        }).then(() => {
          //同$confirm类似
          this.$message({
            type: "success",
            message: "删除成功！"
          })
          //更新列表
          this.getList()
        })
      })
    },

    //复选框多选
    selectionChange(val) {
      this.selection = []
      for (let i = 0; i < val.length; i++) {
        this.selection.push(val[i].phone)
      }
      console.log('复选框' + this.selection)
    },

    //删除多个用户
    deleteUser() {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteUser({
          phoneList: this.selection
        }).then(() => {
          //同$confirm类似
          this.$message({
            type: "success",
            message: "删除成功！"
          })
          //更新列表
          this.getList()
        })
      })
    },
  },


  //生命周期
  created() {
    //在页面加载时就需要调用
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.user {
  background-color: white;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;

  .dialog__footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search {
    padding: 0;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .l-content {
      height: 100%;
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;

      .searchForm {
        justify-content: center;
        margin: 0 0 0 25%;
        display: flex;
        height: 40px;
        width: 40%;
      }
    }

    .r-content {
      height: 100%;
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;

      .add, .delete, .status {
        margin: 0 10px 0 10px;
        height: 38px;
        width: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .status {
        margin: 0 10px 0 10px;
        height: 38px;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .show {
    margin: 0;
    padding: 0;
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>