<template>
  <div class="message">
    <el-dialog
        :title="operateType==='send' ? '发送信息' : '查看信息'"
        :visible.sync="isShow"
        :show-close="false"
        :modal-append-to-body="false">
      <common-form
          :form-label="operateType==='send' ? sendFormLabel : checkFormLabel"
          :form="operateForm"
          :inline="true"
          :rules="rules"
          ref="form"></common-form>
      <div slot="footer" class="dialog__footer">
        <el-button v-if="operateType==='send'" @click="isShow=false">取消</el-button>
        <el-button v-if="operateForm.state===1||operateForm.state==='已读'||(operateForm.proType!=='1'&&operateForm.proType!=='2')" type="primary" @click="confirm">确认</el-button>
        <el-button v-if="(operateForm.state===0||operateForm.state==='未读')&&(operateForm.proType==='1'||operateForm.proType==='2')" @click="confirm">拒绝</el-button>
        <el-button v-if="(operateForm.state===0||operateForm.state==='未读')&&(operateForm.proType==='1'||operateForm.proType==='2')" type="primary" @click="accept">接受</el-button>
      </div>
    </el-dialog>

    <div class="aside">
      <common-aside :menu="this.$store.state.user.user.status===1 ? adminAsideLabel : userAsideLabel"
                    aside-name="primary"
                    @chooseTable="chooseMenu"></common-aside>
    </div>
    <div class="show">
      <div class="option">
        <div class="left">
          <el-button class="send" v-if="this.$store.state.user.user.status===1" type="primary" plain
                     @click="sendMessage">发送消息
          </el-button>
        </div>
        <div class="right">
          <el-select v-if="showState!==3" class="type" v-model="showType" placeholder="类型" @change="load">
            <el-option label="全部" value=2></el-option>
            <el-option label="系统" value=0></el-option>
            <el-option label="项目" value=1></el-option>
          </el-select>
          <el-select v-if="showState===3" class="type" v-model="showType" placeholder="类型" @change="load" disabled>
            <el-option label="全部" value=2></el-option>
            <el-option label="系统" value=0></el-option>
            <el-option label="项目" value=1></el-option>
          </el-select>
          <el-button class="read" type="primary" plain @click="setRead">设为已读</el-button>
          <el-button class="delete" type="primary" icon="el-icon-delete" plain @click="deleteMsgs"></el-button>
        </div>
      </div>
      <div class="table">
        <common-table
            :table-data="tableData"
            :table-label="tableLabel"
            :config="config"
            :page-name="pageName"
            :has-pager=true
            :message-type="showState.toString()"
            @changePage="changeList"
            @selectionChange="selectionChange"
            @check="checkMessage"
            @delete="deleteMsg"
        ></common-table>
      </div>
    </div>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import CommonAside from "@/components/CommonAside";
import CommonTable from "@/components/CommonTable";

export default {
  name: "message",

  components: {
    CommonAside,
    CommonForm,
    CommonTable
  },

  data() {
    return {
      userImg: require('../../src/assets/images/logo.png'),
      showType: "2",  //全部
      showState: 0,  //未读
      userAsideLabel: [
        {
          id: 0,
          value: 0,
          name: '未读'
        },
        {
          id: 2,
          value: 2,
          name: '全部'
        },
      ],
      adminAsideLabel: [
        {
          id: 0,
          value: 0,
          name: '未读'
        },
        {
          id: 2,
          value: 2,
          name: '全部'
        },
        {
          id: 3,
          value: 3,
          name: '我的发送'
        },
      ],
      //表单相关
      operateType: 'check',
      isShow: false,
      checkFormLabel: [
        {
          model: 'title',
          label: "主题",
          type: "input",
          style: "width:200px;",
          disabled: true
        },
        {
          model: 'type',
          label: "类型",
          type: "input",
          style: "width:200px;",
          disabled: true
        },
        {
          model: 'subday',
          label: '时间',
          type: 'date',
          style: "width:200px;",
          disabled: true
        },
        {
          model: 'sname',
          label: "发送人",
          type: "input",
          style: "width:200px;",
          disabled: true
        },
        {
          model: 'text',
          label: '正文',
          type: "textarea",
          style: "width:510px;",
          disabled: true
        }
      ],
      sendFormLabel: [
        {
          model: 'title',
          label: "主题",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'type',
          label: "类型",
          type: "input",
          style: "width:200px;",
          disabled: true
        },
        {
          model: 'subday',
          label: '时间',
          type: 'date',
          style: "width:200px;",
          disabled: true
        },
        {
          model: 'sname',
          label: "发送人",
          type: "input",
          style: "width:200px;",
          disabled: true
        },
        {
          model: 'text',
          label: '正文',
          type: "textarea",
          style: "width:510px;",
        }
      ],
      operateForm: {},
      rules: {
        title:[
          {
            required: true, //必填
            message: "请输入标题", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            min:1,
            max:20,
            message:"标题长度应为1-20个字符",
            trigger: "blur"
          },
        ],
        text:[
          {
            required: true, //必填
            message: "请输入正文", //校验不通过的提示信息
          },
          {
            min:1,
            max:200,
            message:"正文长度应在200个字符以内",
            trigger: "blur"
          },
        ],
      },
      validInfo:{ //检验form内信息是否通过校验
        value:0,
        message:''
      },
      //表格相关
      tableData: [],
      tableLabel: [
        {
          //列的名称
          label: "序号",
          width: "50px"
        },
        {
          //数据中读取的字段的名称
          prop: "title",
          //列的名称
          label: "主题",
          width: "300px"
        },
        {
          //数据中读取的字段的名称
          prop: "state",
          //列的名称
          label: "状态",
          width: "100px"
        },
        {
          //数据中读取的字段的名称
          prop: "type",
          //列的名称
          label: "类型",
          width: "100px"
        },
        {
          //数据中读取的字段的名称
          prop: "subday",
          //列的名称
          label: "时间",
          width: "200px"
        },
        {
          //数据中读取的字段的名称
          prop: "sname",
          //列的名称
          label: "发送人",
          width: "200px"
        },
      ],
      //默认页数值
      config: {
        pager: 1,
        total: 30,
        pageSize: 9,
      },
      selection: [],
      pageName: 'message',
    }
  },
  methods: {
    load() {
      if (this.showState !== 3) {
        this.loadReceive()
      } else {  //得到发送的信息
        this.loadSend()
      }
    },

    loadReceive() {
      this.config.loading = true
      this.request.get("/message/getReceive", {
        params: {
          pageNum: this.config.pager,
          pageSize: this.config.pageSize,
          uphone: this.$store.state.user.user.phone,
          type: this.showType,
          state: this.showState
        }
      }).then(res => {
        console.log("function:/message/getReceive")
        console.log(res, 'res')
        if (res.code === '200') {
          this.tableData = res.data.records
          this.tableData = this.tableData.map(item => {
            //映射
            item.type = item.type === 0 ? '系统' : '项目'
            item.state = item.state === 0 ? '未读' : '已读'
            return item
          })
          this.config.total = res.data.total
          this.config.loading = false
        } else {
          this.$message.error(res.message)
        }
      })
    },

    loadSend() {
      this.config.loading = true
      this.request.get("/message/getSend", {
        params: {
          pageNum: this.config.pager,
          pageSize: this.config.pageSize,
          sphone: this.$store.state.user.user.phone,
          type: this.showType
        }
      }).then(res => {
        console.log("function:/message/getSend")
        console.log(res, 'res')
        if (res.code === '200') {
          this.tableData = res.data.records
          this.tableData = this.tableData.map(item => {
            //映射
            item.type = item.type === 0 ? '系统' : '项目'
            item.state = '已发送'
            return item
          })
          this.config.total = res.data.total
          this.config.loading = false
        } else {
          this.$message.error(res.message)
        }
      })
    },

    //换页
    changeList(page) {
      this.config.loading = true
      this.config.pager = page
      this.load()
    },

    //发送消息
    sendMessage() {
      let time = new Date();
      let year = time.getFullYear();
      let month = (time.getMonth() + 1).toString().padStart(2, '0');
      let day = time.getDate().toString().padStart(2, '0');
      let subday = year + '-' + month + '-' + day;
      this.operateType = 'send'
      this.isShow = true
      //表内数据显示为当前行内的数据，回写
      this.operateForm = {
        title: '',
        type: '系统',
        subday: subday,
        sname: this.$store.state.user.user.name,
        sphone: this.$store.state.user.user.phone,
        text: ''
      }
    },

    //查看信息
    checkMessage(row) {
      this.operateType = 'check'
      this.isShow = true
      this.selection = [row.id]
      //表内数据显示为当前行内的数据，回写
      this.operateForm = {
        id: row.id,
        title: row.title,
        state: row.state,
        type: row.type,
        subday: row.subday,
        sname: row.sname,
        text: row.text,
        stanId: row.stanId,  //项目消息的相关项目id
        proType: row.proType  //项目消息类型：1添加，2转让，3申请，4审核，5删除，6撤销
      }
    },

    //确认（查看 && 发消息）
    confirm() {
      if (this.operateType === 'check') { //查看
        this.isShow = false
        if (this.operateForm.state === '未读' || this.operateForm.state === 0) {
          if(this.showState!==3){
            this.setRead()  //设为已读
          }else{
            this.isShow = false
          }
        }
      } else {
        this.$refs.form.isValid(this.validInfo) //调用form中的函数
        if (this.validInfo.value === 0) { //校验不通过
          this.$message.warning(this.validInfo.message)
        } else {
          this.request.post("/message/sendSysMsg", {
            title: this.operateForm.title,
            type: 0,
            subday: this.operateForm.subday,
            sphone: this.$store.state.user.user.phone,
            text: this.operateForm.text
          }).then(res => {
            console.log("function:/message/sendSysMsg")
            console.log(res, 'res')
            if (res.code === '200') {
              this.$message.success(res.message)
              this.isShow = false
              this.load()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      }
    },

    //接受邀请或转让
    accept(){
      if(this.operateForm.proType==='1'){
        this.request.post("/standard/addEditor/"+this.operateForm.stanId+"/"+this.$store.state.user.user.phone).then(res=>{
            console.log("function:/standard/addEditor")
            console.log(res, 'res')
            if (res.code === '200') {
              this.setRead()
              this.isShow = false
            }else{
              this.$message.error(res.message)
              this.setRead()
              this.isShow = false
            }
        })
      }else{
        this.request.post("/standard/changeMphone",{
          stanId: this.operateForm.stanId,
          mphone: this.$store.state.user.user.phone
        }).then(res=>{
          console.log("function:/standard/addEditor")
          console.log(res, 'res')
          if (res.code === '200') {
            this.setRead()
            this.isShow = false
          }else{
            this.$message.error(res.message)
            this.setRead()
            this.isShow = false
          }
        })
      }
    },

    //设为已读
    setRead() {
      this.request.post("/message/setRead", {
        ids: this.selection,
        phone: this.$store.state.user.user.phone
      }).then(res => {
        console.log("function:/message/setRead")
        console.log(res, 'res')
        if (res.code === '200') {
          this.load()
        } else {
          this.$message.error(res.message)
        }
      })
    },

    //复选框多选
    selectionChange(val) {
      this.selection = []
      for (let i = 0; i < val.length; i++) {
        this.selection.push(val[i].id)
      }
      console.log('复选框' + this.selection)
    },

    delete() {
      if (this.showState !== 3) { //删除接收到的信息
        this.request.post("/message/deleteRec", {
          ids: this.selection,
          phone: this.$store.state.user.user.phone
        }).then(res => {
          console.log("function:/message/deleteRec")
          console.log(res, 'res')
          if (res.code === '200') {
            this.load()
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      } else {  //删除发送的信息
        this.request.post("/message/deleteSend", this.selection).then(res => {
          console.log("function:/message/deleteSend")
          console.log(res, 'res')
          if (res.code === '200') {
            this.load()
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },

    //删除多个
    deleteMsgs() {
      if (this.showState !== 3) { //删除接收到的信息
        //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
        this.$confirm("此操作将永久删除该信息记录，是否继续？", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.delete()
        })
      } else {
        //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
        this.$confirm("此操作将永久删除该信息发布，是否继续？", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.delete()
        })
      }
    },

    //删除一个
    deleteMsg(row) {
      this.selection = [row.id]
      this.deleteMsgs()
    },

    //切换菜单
    chooseMenu(item) {
      this.showState = item.id
      this.load()
    },
  },

  computed: {},

  mounted() {
  },

  //生命周期
  created() {
    //在页面加载时就需要调用
    this.load()
  }
}
</script>

<style lang="less" scoped>
.message {
  background-color: white;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .dialog__footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .aside {
    width: 250px;
    text-align: center;
    height: 100%;
    padding: 0;

    common-aside {
      width: 100%;
      height: 100%;
    }
  }

  .show {
    margin: 0;
    padding: 0;
    width: calc(100% - 250px);
    height: 100%;


    .option {
      padding: 0;
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        width: 50%;
        display: flex;
        align-items: center;

        .send {
          margin-left: 30px;
          height: 38px;
          width: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .right {
        width: 50%;
        display: flex;
        align-items: center;

        .type {
          margin-left: 50%;
          height: 38px;
          width: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .read {
          margin-left: 20px;
          height: 38px;
          width: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .delete {
          margin-left: 20px;
          height: 38px;
          width: 38px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .table {
      margin: 0;
      padding: 0;
      height: calc(100% - 50px);
      width: 100%;
    }
  }
}
</style>