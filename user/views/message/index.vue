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
          ref="form"></common-form>
      <div slot="footer"  class="dialog__footer">
        <el-button v-if="operateType==='send'" @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>

    <div class="aside">
      <common-aside :menu="this.$store.state.user.user.status===1 ? adminAsideLabel : userAsideLabel" aside-name="primary" @chooseTable="chooseMenu"></common-aside>
    </div>
    <div class="show">
      <div class="option">
        <div class="left">
          <el-button class="send" v-if="this.$store.state.user.user.status===1" type="primary" plain
                     @click="sendMessage">发送消息
          </el-button>
        </div>
        <div class="right">
          <el-select class="type" v-model="showType" placeholder="类型" @change="changeType">
            <el-option label="全部" value=2></el-option>
            <el-option label="系统" value=0></el-option>
            <el-option label="项目" value=1></el-option>
          </el-select>
          <el-button class="read" type="primary" plain @click="setRead">设为已读</el-button>
          <el-button class="delete" type="primary" icon="el-icon-delete" plain @click="deleteMessages"></el-button>
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
            @delete="deleteMessage"
        ></common-table>
      </div>
    </div>
  </div>
</template>

<script>
import {getMessageList, setRead, deleteMessage, sendMessage} from '../../api/data'
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
      showType: '2',  //全部
      showState:0,  //未读
      userAsideLabel: [
        {
          id: 0,
          value: 0,
          name: '未读'
        },
        {
          id: 1,
          value: 1,
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
          id: 1,
          value: 1,
          name: '全部'
        },
        {
          id:2,
          value:2,
          name:'我的发送'
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
          model: 'subDay',
          label: '时间',
          type: 'date',
          style: "width:200px;",
          disabled: true
        },
        {
          model: 'sender',
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
          model: 'subDay',
          label: '时间',
          type: 'date',
          style: "width:200px;",
          disabled: true
        },
        {
          model: 'sender',
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
          prop: "subDay",
          //列的名称
          label: "时间",
          width: "200px"
        },
        {
          //数据中读取的字段的名称
          prop: "sender",
          //列的名称
          label: "发送人",
          width: "200px"
        },
      ],
      //默认页数值
      config: {
        pager: 1,
        total: 30,
        pageSize: 10,
      },
      selection: [],
      pageName: 'message',
    }
  },
  methods: {
    //得到消息列表
    getList() {
      this.config.loading = true
      getMessageList({
        phone: this.$store.state.user.user.phone,
        type:this.showType,
        state:this.showState,
        page: this.config.pager,
      }).then(({data: res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res, 'res')
        this.tableData=res.data.list
        this.tableData = this.tableData.map(item => {
          //映射
          item.sender = item.sender.name
          item.type= item.type.toString() === '0' ? '系统':'项目'
          item.state=item.state.toString() === '0' ? '未读':'已读'
          return item
        })
        this.config.total = res.data.count
        this.config.loading = false
      });
    },

    //换页
    changeList(page) {
      this.config.loading = true
      this.config.pager = page
      this.getList()
    },

    //发送消息
    sendMessage() {
      // let subDay=new Date().toLocaleDateString()
      let time = new Date();
      let year = time.getFullYear();
      let month = (time.getMonth()+1).toString().padStart(2,'0');
      let day = time.getDate().toString().padStart(2,'0');
      let subDay = year+'-'+month+'-'+day;
      this.operateType = 'send'
      this.isShow = true
      //表内数据显示为当前行内的数据，回写
      this.operateForm = {
        title: '',
        type:'系统',
        subDay: subDay,
        sender: this.$store.state.user.user.name,
        text:''
      }
    },

    //查看信息
    checkMessage(row) {
      this.operateType = 'check'
      this.isShow = true
      //表内数据显示为当前行内的数据，回写
      this.operateForm = {
        id:row.id,
        title: row.title,
        state:row.state,
        type:row.type,
        subDay: row.subDay,
        sender: row.sender,
        text:row.text
      }
    },

    //确认
    confirm(){
      if(this.operateType==='check'){ //查看
        this.isShow=false
        if(this.operateForm.state==='未读'||this.operateForm.state===0){
          this.selection=[this.operateForm.id]
          this.setRead()  //设为已读
        }
      }else{  //发送
        sendMessage({
          title:this.operateForm.title,
          type:1,
          state:0,
          senderPhone: this.$store.state.user.user.phone,
          subDay:this.operateForm.subDay,
          text:this.operateForm.text
        }).then(({data: res}) => {
          //上面是使用es6的解构赋值为res
          console.log(res,'res')
          //同$confirm类似
          this.$message({
            type: "success",
            message: "发送成功！"
          })
          this.isShow=false
          //更新列表
          this.getList()
        });
      }
    },

    //设为已读
    setRead(){
      setRead({
        phone: this.$store.state.user.user.phone,
        messageIds:this.selection
      }).then(({data: res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res,'res')
        //更新列表
        this.getList()
      });
    },

    //复选框多选
    selectionChange(val) {
      this.selection = []
      for (let i = 0; i < val.length; i++) {
        this.selection.push(val[i].id)
      }
      console.log('复选框' + this.selection)
    },

    //删除多个
    deleteMessages() {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteMessage({
          phone: this.$store.state.user.user.phone,
          messageIds:this.selection
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

    //删除一个
    deleteMessage(row) {
      this.selection=[row.id]
      this.deleteMessages()
    },

    //切换菜单
    chooseMenu(item) {
      this.showState=item.id
      this.getList()
    },

    //切换类型
    changeType(){
      this.config.pager=1
      this.getList()
    }
  },

  computed: {},

  mounted() {
  },

  //生命周期
  created() {
    //在页面加载时就需要调用
    this.getList()
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