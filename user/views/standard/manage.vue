<template>
  <el-container class="manage">
    <el-dialog
        class="stanDialog"
        :title="'修改信息'"
        :visible.sync="stanIsShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="editFormLabel"
          :form="editForm"
          :inline="true"
          ref="form"></common-form>
      <div slot="footer" class="stanDialog_footer">
        <el-button @click="stanIsShow=false">取消</el-button>
        <el-button type="primary" @click="editStan">确认</el-button>
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
            :form="checkForm"
            class="form">
        </common-form>
        <common-form
            v-if="this.formName==='state'"
            :form-label="sateFormLabel"
            :form="stateForm"
            class="form">
          <el-button v-if="this.formName==='state'" @click="exam">确定</el-button>
        </common-form>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "@/components/CommonAside";
import CommonForm from "@/components/CommonForm";
import {deleteStan, editStan, getStanInfo} from "../../api/data";

export default {
  name: "manage",
  components: {CommonForm, CommonAside},
  data() {
    return {
      downloadImg: require('@/assets/icon/download.png'),
      editImg: require('@/assets/icon/edit.png'),
      tableList:[
        {
          id:0,
          name:'基本信息'
        },
        {
          id:1,
          name:'修改信息'
        },
        {
          id:2,
          name:'状态信息'
        },
        {
          id:3,
          name:'删除'
        }
      ],
      cardStanData: {
        id: '',
        name: '',
        ename: '',
        manager: '',
        editors: '',
        creDay: '',
        level: '',
        description: '',
      },
      formName:'check',
      checkFormLabel:[
        {
          model: 'name',
          label: "名称",
          type: "input",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'ename',
          label: "英文名称",
          type: "input",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'manager',
          label: "负责人",
          type: "input",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'editors',
          label: "编写者",
          type: "input",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'level',
          label: '分级',
          type: 'input',
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'creDay',
          label: "创建日期",
          type: "date",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'state',
          label: "当前状态",
          type: "input",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'description',
          label: "简述",
          type: "textarea",
          style: "width:510px;",
          disabled:true
        },
      ],
      checkForm:{},
      editFormLabel:[
        {
          model: 'name',
          label: "名称",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'ename',
          label: "英文名称",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'manager',
          label: "负责人",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'editors',
          label: "编写者",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'level',
          label: '分级',
          type: 'input',
          style: "width:200px;",
        },
        {
          model: 'creDay',
          label: "创建日期",
          type: "date",
          style: "width:200px;",
        },
        {
          model: 'description',
          label: "简述",
          type: "textarea",
          style: "width:510px;",
        },
      ],
      editForm:{},
      sateFormLabel:[
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
      stateForm:{
      },
      stanIsShow:false,
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
        let editor = ''
        for (let i = 0; i < res.list[0].editors.length; i++) {
          editor = editor + res.list[0].editors[i] + ' '
        }
        //设置全局变量
        // this.$store.commit('clearStandard')
        // this.$store.commit('setStandard',res.list[0])
        // this.cardData=this.asyncStan
        this.checkForm = res.list[0]
        this.checkForm.editors = editor
        this.itemData=res.stanItem
      });
    },

    //换表
    changeTable(item){
      console.log('item:'+item.id)
      if(item.id===0){
        this.formName='check'
      } else if(item.id===1){
        this.editStanOpt()
      }else if(item.id===2){
        this.formName='state'
      }else if(item.id===3){
        this.deleteStan()
      }
    },

    //编辑数据标准详情
    editStanOpt() {
      console.log('查看数据标准详情')
      this.operateType='checkStan'
      this.stanIsShow=true
      //表内数据显示为当前行内的数据，回写
      this.editForm = this.checkForm
    },

    //修改信息
    editStan(){
      editStan({
        stanId:this.$store.state.standard.stanId,
        pageName: this.$store.state.standard.stanPage,
        name:this.editForm.name,
        ename:this.editForm.ename,
        manager:this.editForm.manager,
        editors:this.editForm.editors,
        creDay:this.editForm.creDay,
        level:this.editForm.level,
        description:this.editForm.description
      }).then(()=>{
        //同$confirm类似
        this.$message({
          type:"success",
          message:"修改成功！"
        })
        //更新列表
        this.stanIsShow=false
        this.getCardInfo()
      })
    },

    //删除信息
    deleteStan(){
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该数据标准，是否继续？","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        deleteStan({
          stanId:this.$store.state.standard.stanId,
          pageName: this.$store.state.standard.stanPage,
        }).then(()=>{
          //同$confirm类似
          this.$message({
            type:"success",
            message:"删除成功！"
          })
          this.$router.push({name: 'myManage'})
        })
      })
    },

    //审核
    exam(){
      console.log('123'+this.stateForm.result)
      console.log(this.stateForm.suggestion)

    }
  },

  computed: {
    //动态获取菜单
    asyncStan() {
      return this.$store.state.standard.standard
    }
  },

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
      .form{
        height: auto;
        display: block;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>