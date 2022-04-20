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
            ref="form"></common-form>
      </div>
      <div class="main" v-if="operateType==='changeEditors'">
        <common-form
            class="changeForm"
            :form-label="changeEditorsLabel"
            :form="operateForm"
            :inline="true"
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
            class="form"
            @changeManager="changeManager"
            @changeEditors="changeEditors"
            @changeState="changeState">
          <el-button v-if="this.formName==='edit'"
                     style="display: flex;justify-content: center;align-items: center"
                     @click="editStan">修改
          </el-button>
        </common-form>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "@/components/CommonAside";
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable";
import {deleteStan, editStan, editStanState, getStanInfo, sendMessage} from "../../api/data";
import Level from "../../util/level";

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
          model: 'managerName',
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
          model: 'level',
          label: '分级',
          type: 'cascader',
          style: "width:400px;",
          options: this.$store.state.level.level,
          disabled: true
        },
        {
          model: 'creDay',
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
          model: 'managerName',
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
          model: 'level',
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
      pageName: 'manage'
    }
  },

  methods: {
    //得到完整数据结构信息
    getCardInfo() {
      getStanInfo({
        stanId: this.$store.state.standard.stanId,
        pageName: this.$store.state.standard.stanPage
      }).then(({data: res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res, 'res')
        this.editorsData = res.data.list.editors   //编写者列表
        let editor = ''
        for (let i = 0; i < res.data.list.editors.length; i++) {
          editor = editor + res.data.list.editors[i].name + ' '
        }
        //设置全局变量
        // this.$store.commit('clearStandard')
        // this.$store.commit('setStandard',res.list[0])
        // this.cardData=this.asyncStan
        this.formData = res.data.list
        this.formData.managerName = res.data.list.manager.name
        this.formData.editorsName = editor
        this.formData.level = Level.getLevelList(this.$store.state.level.level, res.data.list.level1, res.data.list.level2, res.data.list.level3)
        if (this.formData.state === 2) {
          this.formData.stateName = '已发布'
        } else if (this.formData.state === 1) {
          this.formData.stateName = '审核中'
        } else {
          this.formData.stateName = '编写中'
        }
        this.itemData = res.data.list.table[0].item
      });
    },

    //换表
    changeTable(item) {
      console.log('item:' + item.id)
      if (item.id === 0) {
        this.formName = 'check'
        this.getCardInfo()
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
      this.isShow = true
    },

    //换编写者
    changeEditors() {
      this.operateType = 'changeEditors'
      this.isShow = true
    },

    //换状态
    changeState(changeType) {
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
          editStanState({
            stanId: this.$store.state.standard.stanId,
            state: 0
          }).then(() => {
            sendMessage({
              title: '项目 ' + this.formData.name + ' 撤销发布',
              type: 2, //0表示系统消息，1表示项目消息(需要确认的)，2表示项目消息(不需要确认的)
              senderPhone: this.$store.state.user.user.phone,
              receiverPhone: receiverPhone,
              subDay: this.subDay,
              text: '项目名称：' + this.formData.name + '\n负责人：' + this.$store.state.user.user.name + '(手机号' + this.$store.state.user.user.phone + ')\n项目已撤销发布，可以进行编写！',
            }).then(() => {
              //同$confirm类似
              this.$message({
                type: "success",
                message: "已发送信息！"
              })
              //更新列表
              this.isShow = false
              this.getCardInfo()
            })
          })
        })
      }
    },

    //换负责人、审核
    changeConfirm() {
      if (this.operateType === 'changeManager') { //转让负责人
        if (this.operateForm.phone === '') {
          this.$message.warning('输入手机号不能为空')
        } else if (this.operateForm.phone === this.$store.state.user.user.phone) {
          this.$message.warning('不得转让于自己')
        } else {
          sendMessage({
            title: '项目 ' + this.formData.name + ' 转让负责人',
            type: 1, //0表示系统消息，1表示项目消息(需要确认的)，2表示项目消息(不需要确认的)
            senderPhone: this.$store.state.user.user.phone,
            receiverPhone: [this.operateForm.phone],
            subDay: this.subDay,
            text: '项目名称：' + this.formData.name + '\n原负责人：' + this.$store.state.user.user.name + '(手机号' + this.$store.state.user.user.phone + ')\n邀请您成为负责人',
          }).then(() => {
            //同$confirm类似
            this.$message({
              type: "success",
              message: "已发送信息！"
            })
            //更新列表
            this.isShow = false
          })
        }
      } else {
        let receiverPhone = this.formData.editors.map((item) => {
          return item.phone;
        })
        if(this.stateForm.result==='不通过'){  //审核失败
          editStanState({
            stanId: this.$store.state.standard.stanId,
            state: 0
          }).then(() => {
            sendMessage({
              title: '项目 ' + this.formData.name + ' 审核',
              type: 2, //0表示系统消息，1表示项目消息(需要确认的)，2表示项目消息(不需要确认的)
              senderPhone: this.$store.state.user.user.phone,
              receiverPhone: receiverPhone,
              subDay: this.subDay,
              text: '项目名称：' + this.formData.name + '\n负责人：' + this.$store.state.user.user.name + '(手机号' + this.$store.state.user.user.phone + ')\n项目审核失败，请继续编写！\n审核意见：'+this.stateForm.suggestion,
            }).then(() => {
              //同$confirm类似
              this.$message({
                type: "success",
                message: "已发送信息！"
              })
              //更新列表
              this.isShow = false
              this.getCardInfo()
            })
          })
        }else{
          editStanState({
            stanId: this.$store.state.standard.stanId,
            state: 2
          }).then(() => {
            sendMessage({
              title: '项目 ' + this.formData.name + ' 审核',
              type: 2, //0表示系统消息，1表示项目消息(需要确认的)，2表示项目消息(不需要确认的)
              senderPhone: this.$store.state.user.user.phone,
              receiverPhone: receiverPhone,
              subDay: this.subDay,
              text: '项目名称：' + this.formData.name + '\n负责人：' + this.$store.state.user.user.name + '(手机号' + this.$store.state.user.user.phone + ')\n项目审核成功，已发布！\n审核意见：'+this.stateForm.suggestion,
            }).then(() => {
              //同$confirm类似
              this.$message({
                type: "success",
                message: "已发送信息！"
              })
              //更新列表
              this.isShow = false
              this.getCardInfo()
            })
          })
        }
      }
    },

    //删除编写者
    deleteUser(val) {
      let editors = ''
      this.editorsData = this.editorsData.filter(item => item.phone !== val.phone)
      for (let i = 0; i < this.editorsData.length; i++) {
        editors = editors + this.editorsData[i].name + ' '
      }
      this.formData.editorsName = editors
      this.formData.editors = this.editorsData
    },

    //添加编写者
    addUser() {
      if (this.operateForm.phone === '') {
        this.$message.warning('输入手机号不能为空')
      } else if (this.editorsData.filter(item => item.phone === this.operateForm.phone).length > 0) {
        this.$message.warning('该用户已是编写者')
      } else {
        //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
        this.$confirm("此操作将会向该用户发送信息，是否继续？", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          sendMessage({
            title: '项目 ' + this.formData.name + ' 添加编写者',
            type: 1, //0表示系统消息，1表示项目消息(需要确认的)，2表示项目消息(不需要确认的)
            senderPhone: this.$store.state.user.user.phone,
            receiverPhone: [this.operateForm.phone],
            subDay: this.subDay,
            text: '项目名称：' + this.formData.name + '\n负责人：' + this.$store.state.user.user.name + '(手机号' + this.$store.state.user.user.phone + ')\n邀请您成为编写者',
          }).then(() => {
            //同$confirm类似
            this.$message({
              type: "success",
              message: "已发送信息！"
            })
          })
        })
      }
    },

    //修改信息
    editStan() {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将修改该数据标准的信息，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        editStan({
          stanId: this.$store.state.standard.stanId,
          pageName: this.$store.state.standard.stanPage,
          name: this.formData.name,
          ename: this.formData.ename,
          manager: this.formData.manager,
          editors: this.formData.editors,
          creDay: this.formData.creDay,
          level: this.formData.level.length,
          level1:this.formData.level[0],
          level2:this.formData.level[1],
          level3:this.formData.level[2],
          description: this.formData.description
        }).then(() => {
          //同$confirm类似
          this.$message({
            type: "success",
            message: "修改成功！"
          })
          //更新列表
          this.stanIsShow = false
          this.getCardInfo()
        })
      })
    },

    //删除信息
    deleteStan() {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该数据标准，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteStan({
          stanIds: [this.$store.state.standard.stanId],
        }).then(() => {
          //同$confirm类似
          this.$message({
            type: "success",
            message: "删除成功！"
          })
          this.$router.push({name: 'myManage'})
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
    this.getCardInfo()
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
        display: block;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>