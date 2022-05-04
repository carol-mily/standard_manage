<template>
  <el-container class="manage">
    <el-dialog
        class="stanDialog"
        :title="'修改信息'"
        :visible.sync="isShow"
        :modal-append-to-body="false"
        append-to-body>
      <div class="main" v-if="operateType==='changeManager'">
        <common-form
            class="changeForm"
            :form-label="changeManagerLabel"
            :form="operateForm"
            :inline="true"
            :rules="phoneRules"
            ref="form"></common-form>
      </div>
      <div class="main" v-if="operateType==='changeEditors'">
        <common-form
            class="changeForm"
            :form-label="changeEditorsLabel"
            :form="operateForm"
            :inline="true"
            :rules="phoneRules"
            ref="form"
            style="margin-left: 90px;margin-right: 50px;"
            @addUser="addUser"></common-form>
        <common-table
            :table-data="editorsData"
            :table-label="editorsTable"
            :page-name="pageName"
            :has-pager=false
            @delete="deleteUser"
            style="display:flex;justify-content: center;align-items: center;margin-left: 90px;margin-right: 50px;width:500px;height:300px;"></common-table>
      </div>
      <div class="main" v-if="operateType==='changeState'">
        <common-form
            :form-label="stateFormLabel"
            :form="stateForm"
            :rules="stateRules"
            ref="form"
            class="form">
        </common-form>
      </div>
      <div slot="footer" v-if="operateType!=='changeEditors'" class="stanDialog_footer"
           style="display: flex;justify-content: center;align-items: center;">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="changeConfirm">确认</el-button>
      </div>
    </el-dialog>

    <el-container class="mcontainer">
      <el-aside class="aside">
        <common-aside
            :aside-name="'primary'"
            :menu="tableList"
            @chooseTable="changeTable"
        ></common-aside>
      </el-aside>
      <el-main class="main">
        <common-form
            v-if="this.formName==='check'"
            :form-label="checkFormLabel"
            :form="formData"
            class="form">
        </common-form>
        <common-form
            v-if="this.formName==='edit'"
            :form-label="editFormLabel"
            :form="formData"
            :rules="infoRules"
            ref="form"
            class="form"
            @changeManager="changeManager"
            @changeEditors="changeEditors"
            @changeState="changeState">
          <el-button v-if="this.formName==='edit'"
                     type="primary"
                     style="text-align: center"
                     @click="editStan">修改</el-button>
        </common-form>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "@/components/CommonAside";
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable";
import Level from "../../util/level";
import Text from "../../util/text";

export default {
  name: "manage",
  components: {CommonTable, CommonForm, CommonAside},

  data() {
    let time = new Date();
    let year = time.getFullYear();
    let month = (time.getMonth() + 1).toString().padStart(2, '0');
    let day = time.getDate().toString().padStart(2, '0');
    let subDay = year + '-' + month + '-' + day;
    return {
      downloadImg: require('@/assets/icon/download.png'),
      editImg: require('@/assets/icon/edit.png'),
      subDay: subDay,
      tableList: [
        {
          id: 0,
          name: '基本信息'
        },
        {
          id: 1,
          name: '修改信息'
        },
        {
          id: 2,
          name: '删除'
        }
      ],
      formName: 'check',
      checkFormLabel: [
        {
          model: 'name',
          label: "名称",
          type: "input",
          style: "width:400px;",
          disabled: true
        },
        {
          model: 'ename',
          label: "英文名称",
          type: "input",
          style: "width:400px;",
          disabled: true
        },
        {
          model: 'mname',
          label: "负责人",
          type: "input",
          style: "width:400px;",
          disabled: true
        },
        {
          model: 'editorsName',
          label: "编写者",
          type: "input",
          style: "width:400px;",
          disabled: true
        },
        {
          model: 'levelList',
          label: '分级',
          type: 'cascader',
          style: "width:400px;",
          options: this.$store.state.level.level,
          disabled: true
        },
        {
          model: 'creday',
          label: "创建日期",
          type: "date",
          style: "width:400px;",
          disabled: true
        },
        {
          model: 'stateName',
          label: "当前状态",
          type: "input",
          style: "width:400px;",
          disabled: true
        },
        {
          model: 'description',
          label: "简述",
          type: "textarea",
          style: "width:500px;",
          disabled: true
        },
      ],
      editFormLabel: [
        {
          model: 'name',
          label: "名称",
          type: "input",
          style: "width:400px;",
        },
        {
          model: 'ename',
          label: "英文名称",
          type: "input",
          style: "width:400px;",
        },
        {
          model: 'mname',
          label: "负责人",
          type: "changeManager",
          style: "width:400px;",
        },
        {
          model: 'editorsName',
          label: "编写者",
          type: "changeEditors",
          style: "width:400px;",
          hasButton: true,
        },
        {
          model: 'levelList',
          label: '分级',
          type: 'cascader',
          style: "width:400px;",
          options: this.$store.state.level.level
        },
        {
          model: 'stateName',
          label: "当前状态",
          type: "changeState",
          style: "width:400px;",
          disabled: true
        },
        {
          model: 'description',
          label: "简述",
          type: "textarea",
          style: "width:500px;",
        },
      ],
      formData: {},
      infoRules: {
        name:[
          {
            required: true, //必填
            message: "请输入名称", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            min:1,
            max:20,
            message:"名称长度应在20个字符以内",
            trigger: "blur"
          },
        ],
        ename:[
          {
            required: true, //必填
            message: "请输入英文名称", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            min:1,
            max:20,
            message:"英文名称长度应在20个字符以内",
            trigger: "blur"
          },
        ],
        description:{
          max:200,
          message:"描述长度应在200个字符以内",
          trigger: "blur"
        }
      },
      //编写者列表
      editorsTable: [
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
          label: "手机号",
          width: 250
        },
      ],
      editorsData: [],
      //关于转让管理员和改变编写者
      operateType: 'changeManager',
      changeManagerLabel: [
        {
          model: "phone",
          label: '手机号',
          type: 'input',
          style: "width:500px"
        }
      ],
      changeEditorsLabel: [
        {
          model: "phone",
          label: '',
          type: 'addUser',
          style: "width:400px"
        }
      ],
      operateForm: {
        phone: ''
      },
      isShow: false,
      phoneRules:{
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
      },
      //审核
      stateFormLabel: [
        {
          model: 'result',
          label: "审核结果",
          type: "radio",
          style: "width:200px;",
        },
        {
          model: 'suggestion',
          label: "审核意见",
          type: "textarea",
          style: "width:510px;",
        },
      ],
      stateForm: {
        result: '通过',
        suggestion: ''
      },
      stateRules:{
        suggestion: {
            max:200,
            message: "审核意见应在200个字符以内",
            trigger: "blur"
          }
      },
      pageName: 'manage',
      validInfo:{ //检验form内信息是否通过校验
        value:0,
        message:''
      },
    }
  },

  methods: {
    load() {
      this.request.get("/standard/findById/" + this.$store.state.standard.stanId).then(res => {
        console.log("function：/standard/findById")
        console.log(res, 'res')
        if (res.code === '200') {
          this.formData = res.data
          this.formData.levelName = Level.getLevelName(this.$store.state.level.level, this.formData.levelList)
          if (this.formData.state === 2) {
            this.formData.stateName = '已发布'
          } else if (this.formData.state === 1) {
            this.formData.stateName = '审核中'
          } else {
            this.formData.stateName = '编写中'
          }
          this.formData.editorsName = Text.textFromArray(this.formData.editors)
          this.editorsData = this.formData.editors
        } else {
          this.$message.error(res.message)
        }
      })
    },

    //换表
    changeTable(item) {
      console.log('item:' + item.id)
      if (item.id === 0) {
        this.formName = 'check'
        this.load()
      } else if (item.id === 1) {
        this.formName = 'edit'
      } else if (item.id === 2) {
        this.deleteStan()
      }
    },

    //编辑数据标准详情
    editStanOpt() {
      console.log('查看数据标准详情')
      this.operateType = 'checkStan'
      this.stanIsShow = true
    },

    //换负责人
    changeManager() {
      this.operateType = 'changeManager'
      this.operateForm.phone=''
      this.isShow = true
    },

    //换编写者
    changeEditors() {
      this.operateType = 'changeEditors'
      this.operateForm.phone=''
      this.isShow = true
    },

    //换状态
    changeState(changeType) {
      this.$refs.form.isValid(this.validInfo) //调用form中的函数
      if (this.validInfo.value === 0) { //校验不通过
        this.$message.warning(this.validInfo.message)
      } else {
        let receiverPhone = this.formData.editors.map((item) => {
          return item.phone;
        })
        if (changeType === 0) { //审核
          this.operateType = 'changeState'
          this.isShow = true
        } else {  //撤销发布
          //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
          this.$confirm("此操作将撤销发布状态，是否继续？", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.request.post("/standard/changeState", {
              stanId: this.$store.state.standard.stanId,
              state: 0
            }).then(res => {
              console.log("function:/standard/changeState")
              console.log(res, 'res')
              if (res.code === '200') {
                this.$message.success(res.message)
                this.request.post("/message/sendProMsg", {
                  title: '项目 ' + this.formData.name + ' 撤销发布',
                  type: 1, //0表示系统消息,1代表项目消息
                  subday: this.subDay,
                  sphone: this.$store.state.user.user.phone,
                  text: '项目名称：' + this.formData.name + '\n负责人：' + this.$store.state.user.user.name + '(手机号' + this.$store.state.user.user.phone + ')\n项目已撤销发布，可以进行编写！',
                  stanId: this.formData.id,
                  proType: 6,//项目消息类型：1添加，2转让，3申请，4审核，5删除，6撤销
                  uphones: receiverPhone
                }).then(res => {
                  console.log("function:/message/sendProMsg")
                  console.log(res, 'res')
                  if (res.code === '200') {
                    //更新列表
                    this.isShow = false
                    this.load()
                  } else {
                    this.$message.error(res.message)
                  }
                })
              }
            })
          })
        }
      }
    },

    //换负责人、审核
    changeConfirm() {
      this.$refs.form.isValid(this.validInfo) //调用form中的函数
      if (this.validInfo.value === 0) { //校验不通过
        this.$message.warning(this.validInfo.message)
      } else {
        if (this.operateType === 'changeManager') { //转让负责人
          if (this.operateForm.phone === '') {
            this.$message.warning('输入手机号不能为空')
          } else if (this.operateForm.phone === this.$store.state.user.user.phone) {
            this.$message.warning('不得转让于自己')
          } else {
            this.request.post("/message/sendProMsg", {
              title: '项目 ' + this.formData.name + ' 转让负责人',
              type: 1, //0表示系统消息,1代表项目消息
              subday: this.subDay,
              sphone: this.$store.state.user.user.phone,
              text: '项目名称：' + this.formData.name + '\n原负责人：' + this.$store.state.user.user.name + '(手机号' + this.$store.state.user.user.phone + ')\n邀请您成为负责人',
              stanId: this.formData.id,
              proType: 2,//项目消息类型：1添加，2转让，3申请，4审核，5删除
              uphones: [this.operateForm.phone]
            }).then(res => {
              console.log("function:/message/sendProMsg")
              console.log(res, 'res')
              if (res.code === '200') {
                this.$message.success(res.message)
                //更新列表
                this.isShow = false
              } else {
                this.$message.error(res.message)
              }
            })
          }
        } else {
          let receiverPhone = this.formData.editors.map((item) => { //得到接收人的手机号码
            return item.phone;
          })
          if (this.stateForm.result === '不通过') {  //审核失败
            this.request.post("/standard/changeState", {
              stanId: this.$store.state.standard.stanId,
              state: 0
            }).then(res => {
              console.log("function:/standard/changeState")
              console.log(res, 'res')
              if (res.code === '200') {
                this.request.post("/message/sendProMsg", {
                  title: '项目 ' + this.formData.name + ' 审核',
                  type: 1, //0表示系统消息,1代表项目消息
                  subday: this.subDay,
                  sphone: this.$store.state.user.user.phone,
                  text: '项目名称：' + this.formData.name + '\n负责人：' + this.$store.state.user.user.name + '(手机号' + this.$store.state.user.user.phone + ')\n项目审核失败，请继续编写！\n审核意见：' + this.stateForm.suggestion,
                  stanId: this.formData.id,
                  proType: 4,//项目消息类型：1添加，2转让，3申请，4审核，5删除
                  uphones: receiverPhone
                }).then(res => {
                  console.log("function:/message/sendProMsg")
                  console.log(res, 'res')
                  if (res.code === '200') {
                    this.$message.success(res.message)
                    //更新列表
                    this.isShow = false
                    this.load()
                  } else {
                    this.$message.error(res.message)
                  }
                })
              }
            })
          } else {
            this.request.post("/standard/changeState", {
              stanId: this.$store.state.standard.stanId,
              state: 2
            }).then(res => {
              console.log("function:/standard/changeState")
              console.log(res, 'res')
              if (res.code === '200') {
                this.$message.success("发布成功")
                this.request.post("/message/sendProMsg", {
                  title: '项目 ' + this.formData.name + ' 审核',
                  type: 1, //0表示系统消息,1代表项目消息
                  subday: this.subDay,
                  sphone: this.$store.state.user.user.phone,
                  text: '项目名称：' + this.formData.name + '\n负责人：' + this.$store.state.user.user.name + '(手机号' + this.$store.state.user.user.phone + ')\n项目审核成功，已发布！\n审核意见：' + this.stateForm.suggestion,
                  stanId: this.formData.id,
                  proType: 4,//项目消息类型：1添加，2转让，3申请，4审核，5删除
                  uphones: receiverPhone
                }).then(res => {
                  console.log(res, 'res')
                  if (res.code === '200') {
                    //更新列表
                    this.isShow = false
                    this.load()
                  } else {
                    this.$message.error(res.message)
                  }
                })
              }
            })
          }
        }
      }
    },

    //删除编写者
    deleteUser(val) {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将会永久删除该编写者，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.request.post("/standard/deleteEditor/" + this.formData.id + "/" + val.phone).then(res => {
          console.log("function：/standard/deleteEditor")
          console.log(res, 'res')
          if (res.code === '200') {
            this.$message.success(res.message)
            this.load()
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },

    //添加编写者
    addUser() {
      this.$refs.form.isValid(this.validInfo) //调用form中的函数
      if (this.validInfo.value === 0) { //校验不通过
        this.$message.warning(this.validInfo.message)
      } else {
        if (this.editorsData.filter(item => item.phone === this.operateForm.phone).length > 0) {
          this.$message.warning('该用户已是编写者')
        } else {
          //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
          this.$confirm("此操作将会向该用户发送信息，是否继续？", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.request.post("/message/sendProMsg", {
              title: '项目 ' + this.formData.name + ' 添加编写者',
              type: 1, //0表示系统消息,1代表项目消息
              subday: this.subDay,
              sphone: this.$store.state.user.user.phone,
              text: '项目名称：' + this.formData.name + '\n负责人：' + this.$store.state.user.user.name + '(手机号' + this.$store.state.user.user.phone + ')\n邀请您成为编写者',
              stanId: this.formData.id,
              proType: 1,//项目消息类型：1添加，2转让，3申请，4审核，5删除
              uphones: [this.operateForm.phone]
            }).then(res => {
              console.log("function:/message/sendProMsg")
              console.log(res, 'res')
              if (res.code === '200') {
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
            })
          })
        }
      }
    },

    //修改信息
    editStan() {
      this.$refs.form.isValid(this.validInfo) //调用form中的函数
      if (this.validInfo.value === 0) { //校验不通过
        this.$message.warning(this.validInfo.message)
        console.log(this.validInfo.value)
      } else {
        //处理formData中level的数值
        this.formData.levelId = this.formData.levelList[this.formData.levelList.length - 1]
        //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
        this.$confirm("此操作将修改该数据标准的信息，是否继续？", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.request.post("/standard/update", this.formData).then(res => {
            console.log("function：/standard/findOne")
            console.log(res, 'res')
            if (res.code === '200') {
              this.$message.success(res.message)
              //更新列表
              this.stanIsShow = false
              this.load()
            } else {
              this.$message.error(res.message)
            }
          })
        })
      }
    },

    //删除信息
    deleteStan() {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该数据标准，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.request.delete("/standard/" + this.$store.state.standard.stanId).then(res => {
          console.log("function:/stanard/delete")
          console.log(res, 'res')
          if (res.code === '200') {
            this.$message.success(res.message)
            this.$router.push({name: 'myManage'})
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
  },

  computed: {
    //动态获取菜单
    asyncStan() {
      return this.$store.state.standard.standard
    }
  }
  ,

  created() {
    this.load()
  }
}
</script>

<style scoped lang="less">
.manage {
  background-color: white;
  padding: 0;
  max-width: 100%;
  height: 100%;

  .stanDialog {
    display: flex;
    justify-content: center;
    align-items: center;

    .main {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .stanDialog_footer {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .mcontainer {
    padding: 0;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;

    .aside {
      width: 250px !important;
      text-align: center;
      height: 100% !important;
    }

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
}
</style>