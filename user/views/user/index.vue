<template>
  <div class="user" style="height: 100%">
    <el-dialog
        :title="operateType==='add' ? '新增用户' : '编辑用户'"
        :visible.sync="isShow"
        :modal-append-to-body="false">
      <common-form
          v-if="operateType==='add'"
          :form-label="addFormLabel"
          :form="operateForm"
          :inline="true"
          :rules="rules"
          ref="form"></common-form>
      <common-form
          v-if="operateType==='edit'"
          :form-label="updateFormLabel"
          :form="operateForm"
          :inline="true"
          :rules="rules"
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
        <!--导入操作-->
        <el-upload action="http://localhost:9090/user/import" accept="xlsx" :show-file-list="false" :on-success="handleImportSucess">
          <el-button class="import" type="primary" icon="el-icon-upload2" plain></el-button>
        </el-upload>
        <!--导入操作-->
        <el-button class="export" type="primary" icon="el-icon-download" plain @click="download"></el-button>
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
import md5 from "js-md5";

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
      updateFormLabel: [
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
          disabled: true,
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          style: "width:200px;",
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
              label: '用户',
              value: 0
            },
            {
              label: '管理员',
              value: 1
            }
          ]
        },
        {
          model: 'password',
          label: "密码",
          type: "password",
          style: "width:200px;",
        },
      ],
      addFormLabel: [
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
              label: '用户',
              value: 0
            },
            {
              label: '管理员',
              value: 1
            }
          ]
        },
        {
          model: 'password',
          label: "密码",
          type: "password",
          style: "width:200px;",
        },
      ],
      operateForm: {},
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
        phone: [
          {
            required: true, //必填
            message: "请输入手机号码", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            pattern: '^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$',
            min:11,  //最小长度\
            max:11,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        password:[
          {
            required: true, //必填
            message: "请输入密码", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            pattern: '^[A-Za-z0-9]+$',
            message: '密码应由大小英文字母或数字构成'
          },
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
      },
      password:null,  //备份，验证密码
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
          prop: "statusLabel",
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
          prop: "sexLabel",
          //列的名称
          label: "性别",
          width: 50
        },
        {
          //数据中读取的字段的名称
          prop: "email",
          //列的名称
          label: "邮箱",
          width: 200
        },
        {
          //数据中读取的字段的名称
          prop: "addr",
          //列的名称
          label: "地址",
          width: 300
        },
      ],
      showStatus: '2',
      config: {
        pager: 1,
        total: 10,
        pageSize: 9
      }, //默认页数值
    }
  },

  methods: {
    getList() {
      this.config.loading = true
      this.request.get("/user/getPage", {
        params: {
          pageNum: this.config.pager,
          pageSize: this.config.pageSize,
          name: this.searchName,
          status: this.showStatus
        }
      }).then(res => {
        console.log('function:/user/getPage')
        //上面是使用es6的解构赋值为res
        console.log(res, 'res')
        if(res.code==='200'){
          this.tableData = res.data.records
          this.tableData = this.tableData.map(item => {
            //对tableData，需要进行映射
            if (item.sex === 0) {
              item.sexLabel = "女"
            } else if (item.sex === 1) {
              item.sexLabel = "男"
            }
            item.statusLabel = item.status === 0 ? "用户" : "管理员"
            return item
          })
          this.config.total = res.data.total
          this.config.loading = false
        }else{
          this.$message.error(res.message)
        }
      })

      //fetch函数请求，但比较麻烦
      // fetch("http://localhost:9090/user/page?pageNum="+this.config.pager+"&pageSize="+this.config.pageSize+"&name="+this.searchName+'&status='+this.showStatus).then(res=>res.json()).then(res=>{
      //   console.log('测试后端数据++++++++++++++++')
      //     //上面是使用es6的解构赋值为res
      //     console.log(res, 'res')
      //   this.tableData = res.records.map(item => {
      //     //对sexLabel字段进行映射
      //     item.sex = item.sex === 0 ? "女" : "男"
      //     item.status = item.status === 0 ? "用户" : "管理员"
      //     return item
      //   })
      //   this.config.total = res.total
      //   this.config.loading = false
      // })
    },

    confirm() {
      this.$refs.form.isValid(this.validInfo) //调用form中的函数
      if (this.validInfo.value === 0) { //校验不通过
        this.$message.warning(this.validInfo.message)
      } else {
        if (this.operateType === 'edit') {  //编辑
          if(this.operateForm.password!==this.password&&(this.operateForm.password.length<6||this.operateForm.password.length>12)){
            this.$message.warning("密码长度应为6-12个字符")
          }else{
            if ((this.operateForm.status !== 1||this.operateForm.password!==this.password) && this.operateForm.phone === this.$store.state.user.user.phone) {
              if(this.operateForm.password!==this.password){
                this.password=md5(this.operateForm.password)
              }
              //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
              this.$confirm("此操作将更改您的身份信息或密码并返回登录页，是否继续？", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                this.request.post("/user/update", {
                  name:this.operateForm.name,
                  phone:this.operateForm.phone,
                  sex:this.operateForm.sex,
                  birth:this.operateForm.birth,
                  addr:this.operateForm.addr,
                  email:this.operateForm.email,
                  status:this.operateForm.status,
                  password:this.password
                }).then(res => {
                  console.log('function:/user/update')
                  //上面是使用es6的解构赋值为res
                  console.log(res, 'res')
                  if (res.code==='200') {
                    this.isShow = false
                    //返回登录页
                    this.$store.commit('clearToken')
                    this.$store.commit('clearMenu')
                    this.$store.commit('clearRoutes')
                    this.$router.push('/login')
                    //同$confirm类似
                    this.$message.success(res.message)
                  } else {
                    this.$message.error(res.message)
                  }
                })
              })
            } else {
              if(this.operateForm.password!==this.password){
                this.password=md5(this.operateForm.password)
              }
              this.request.post("/user/update",  {
                name:this.operateForm.name,
                phone:this.operateForm.phone,
                sex:this.operateForm.sex,
                birth:this.operateForm.birth,
                addr:this.operateForm.addr,
                email:this.operateForm.email,
                status:this.operateForm.status,
                password:this.password
              }).then(res => {
                console.log('function:/user/update')
                //上面是使用es6的解构赋值为res
                console.log(res, 'res')
                if (res.code==='200') {
                  this.isShow = false
                  //更新列表
                  this.getList()
                  //同$confirm类似
                  this.$message.success(res.message)
                } else {
                  this.$message.error(res.message)
                }
              })
            }
          }
        } else {  //新增
          this.request.post("/user/add",  {
            name:this.operateForm.name,
            phone:this.operateForm.phone,
            sex:this.operateForm.sex,
            birth:this.operateForm.birth,
            addr:this.operateForm.addr,
            email:this.operateForm.email,
            status:this.operateForm.status,
            password:md5(this.operateForm.password)
          }).then(res => {
            console.log('function:/user/add')
            //上面是使用es6的解构赋值为res
            console.log(res, 'res')
            if (res.code==='200') {
              this.isShow = false
              //更新列表
              this.getList()
              //同$confirm类似
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      }
    },

    addUser() {
      this.isShow = true
      this.operateType = 'add'
      //数据初始化
      this.operateForm = {
        name: '',
        phone: '',
        status: 0,
        addr: '',
        birth: '',
        sex: 0,
        email: '',
        password: ''
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
        id: row.id,
        name: row.name,
        phone: row.phone,
        status: row.status,
        addr: row.addr,
        birth: row.birth,
        sex: row.sex,
        email: row.email,
        password: row.password
      }
      this.password=row.password //备份
    },

    //删除单个用户
    delUser(row) {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.request.delete("/user/" + row.phone).then(res => {
          console.log('function:delete /user')
          console.log(res, 'res')
          if (res.code==='200') {
            this.$message.success(res.message)
            //更新列表
            this.getList()
          } else {
            this.$message.error(res.message)
          }
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
        this.request.post("/user/delete/batch" , this.selection).then(res => {
          console.log('function:/user/delete/batch')
          console.log(res, 'res')
          if (res.code==='200') {
            this.$message.success(res.message)
            //更新列表
            this.getList()
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },

    //上传成功
    handleImportSucess(){
      console.log('function:user/import')
      this.$message.success("导入成功！")
      this.getList()
    },

    //下载
    download(){
      console.log('function:user/export')
      window.open("http://localhost:9090/user/export")
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
        padding: 10px 0 0 0;
        margin: 10px 0 0 25%;
        display: flex;
        height: 100%;
        width: auto;
      }
    }

    .r-content {
      height: 100%;
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;

      .add, .delete, .status, .import{
        margin: 0 5px 0 5px;
        height: 38px;
        width: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .status {
        margin: 0 5px 0 0;
        height: 38px;
        width: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .export {
        margin: 0 0 0 5px;
        height: 38px;
        width: 38px;
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