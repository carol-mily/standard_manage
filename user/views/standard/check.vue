<template>
  <el-container class="check">
    <el-dialog
        class="stanDialog"
        v-if="operateType==='checkStan'"
        :title="'标准详情'"
        :visible.sync="stanIsShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="asideStanLabel"
          :form="asideStanData"
          :inline="true"
          ref="form"></common-form>
      <div slot="footer" class="stanDialog_footer">
        <el-button type="primary" @click="stanIsShow=false">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog
        class="tableDialog"
        v-if="operateType==='checkTable'"
        :title="'表的信息'"
        :visible.sync="tableIsShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="asideTableLabel"
          :form="asideTableData"
          :inline="true"
          ref="form"></common-form>
      <div slot="footer" class="tableDialog_footer">
        <el-button type="primary" @click="tableIsShow=false">确认</el-button>
      </div>
    </el-dialog>

    <el-header class="header" style="height: 100px">
      <div class="l-content" style="height: 100%">
        <span>{{ cardStanData.name }}</span>
      </div>
      <div class="c-content" style="height: 100%">
        <info-card
            :card-data="cardStanData"
            @checkStan="checkStan"></info-card>
      </div>
      <div class="r-content" style="height: 100%">
        <!--        <div class="img">-->
        <!--          <img class="download" :src="downloadImg" style="width: 18px; height: 18px"/>-->
        <!--          <img class="edit" :src="editImg" style="width: 18px; height: 18px"/>-->
        <!--        </div>-->
        <el-button class="download" v-if="this.$store.state.standard.stanPage!=='myManage'" type="primary" icon="el-icon-download" plain @click="download"></el-button>
        <el-button class="edit" v-if="this.$store.state.standard.stanPage==='myJoin'" type="primary" icon="el-icon-edit" plain @click="editStan"></el-button>
        <el-button class="download1" v-if="this.$store.state.standard.stanPage==='myManage'" type="primary" icon="el-icon-download" plain @click="download"></el-button>
        <el-button class="edit1" v-if="this.$store.state.standard.stanPage==='myManage'" type="primary" icon="el-icon-edit" plain @click="editStan"></el-button>
        <el-button class="manage" v-if="this.$store.state.standard.stanPage==='myManage'" type="primary" icon="el-icon-user" plain @click="manageStan"></el-button>
      </div>
    </el-header>
    <el-container class="mcontainer">
      <div class="aside">
          <common-aside
              :aside-name="'check'"
              :menu="tableList"
              @chooseTable="changeTable"
              @checkTable="checkTable"></common-aside>
      </div>
      <div class="main">
          <common-table
              :table-data="itemData"
              :table-label="itemLabel"
              :page-name="pageName"
              :has-pager=false
              style="height: 100%;width:100%"
          ></common-table>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import InfoCard from "@/components/InfoCard";
import CommonAside from "@/components/CommonAside";
import CommonTable from "@/components/CommonTable";
import CommonForm from "@/components/CommonForm";
import Level from '../../util/level'
import Text from '../../util/text'

export default {
  name: "check",
  components: {InfoCard,CommonAside,CommonTable,CommonForm},
  data() {
    return {
      downloadImg: require('@/assets/icon/download.png'),
      editImg: require('@/assets/icon/edit.png'),
      operateType: 'checkStan',
      stanIsShow: false,
      tableIsShow: false,
      asideStanLabel: [
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
          model: 'mname',
          label: "负责人",
          type: "input",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'editorsName',
          label: "编写者",
          type: "input",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'levelList',
          label: '分级',
          type: 'cascader',
          style: "width:200px;",
          options: this.$store.state.level.level,
          disabled:true
        },
        {
          model: 'creday',
          label: "创建日期",
          type: "date",
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
      asideStanData: {},
      asideTableLabel: [
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
          model: 'creday',
          label: "创建日期",
          type: "date",
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
      asideTableData: {
        name: '',
        ename: '',
        level: '',
        creday: '',
        description: ''
      },
      cardStanData: {
        id: '',
        name: '',
        ename: '',
        mname: '',
        editorsName: '',
        creday: '',
        levelName:'',
        level: '',
        description: '',
      },
      tableList:[],
      chooseTable:0,
      itemData: [],
      itemLabel: [
        {
          //列的名称
          label: "序号",
          width:"100px"
        },
        {
          //数据中读取的字段的名称
          prop: "name",
          //列的名称
          label: "字段名称",
          width:"200px"
        },
        {
          //数据中读取的字段的名称
          prop: "code",
          //列的名称
          label: "字段代码",
          width:"100px"
        },
        {
          //数据中读取的字段的名称
          prop: "typeName",
          //列的名称
          label: "字段类型",
          width: "100px"
        },
        {
          //数据中读取的字段的名称
          prop: "length",
          //列的名称
          label: "字段长度",
          width: "100px"
        },
        {
          //数据中读取的字段的名称
          prop: "decim",
          //列的名称
          label: "小数位数",
          width: "100px"
        },
        {
          //数据中读取的字段的名称
          prop: "cstraint",
          //列的名称
          label: "约束条件",
          width: "200px"
        },
        {
          //数据中读取的字段的名称
          prop: "remarks",
          //列的名称
          label: "备注",
          width: "300px"
        },
      ],
      itemNum:0,
      pageName:'check',
    }
  },

  methods: {
    load(){
      this.request.get("/standard/findById/"+this.$store.state.standard.stanId).then(res=>{
        console.log("function：/standard/findById")
        console.log(res,'res')
        if(res.code==='200'){
          this.cardStanData=res.data
          this.cardStanData.levelName = Level.getLevelName(this.$store.state.level.level, this.cardStanData.levelList)
          if (this.cardStanData.state === 2) {
            this.cardStanData.stateName = '已发布'
          } else if (this.cardStanData.state === 1) {
            this.cardStanData.stateName = '审核中'
          } else {
            this.cardStanData.stateName = '编写中'
          }
          this.cardStanData.editorsName=Text.textFromArray(this.cardStanData.editors)
          this.loadTable()
        }else{
          this.$message.error(res.message)
        }
      })
    },

    loadTable(){
      this.request.get("/table/findByStanId/"+this.$store.state.standard.stanId).then(res=>{
        console.log("function：/table/findByStanId")
        console.log(res,'res')
        if(res.code==='200'){
          this.tableList=res.data
          if(this.tableList.length!==0){ //当表不为空时
            this.chooseTable=this.tableList[0].id //设置初始tableId
            this.loadItem()
          }
        }else{
          this.$message.error(res.message)
        }
      })
    },

    loadItem(){
      if(this.chooseTable){
        this.request.get("/item/findByTableId/"+this.chooseTable).then(res=>{
          console.log("function：/item/findByTableId")
          console.log(res,'res')
          if(res.code==='200'){
            this.itemData=res.data
          }else{
            this.$message.error(res.message)
          }
        })
      }
    },

    //换表
    changeTable(item){
      this.chooseTable= item.id
      this.loadItem()
    },

    //查看数据标准详情
    checkStan() {
      console.log('查看数据标准详情')
      this.operateType='checkStan'
      this.stanIsShow=true
      //表内数据显示为当前行内的数据，回写
      this.asideStanData = this.cardStanData
    },

    //查看表的详情
    checkTable(item) {
      console.log('查看表的详情'+item)
      this.operateType='checkTable'
      this.tableIsShow=true
      //表内数据显示为当前行内的数据，回写
      this.asideTableData = this.tableList.filter(table=>table.id===item.id)[0] //找到对应的table信息
      console.log('表的信息：'+this.asideTableData)
      //换表
      this.changeTable(item)
    },

    //下载数据标准
    download(){
      if(this.$store.state.user.user.phone!==undefined){
        if(this.cardStanData.state===2){  //已发布
          console.log('function:standard/export')
          window.open("http://localhost:9090/standard/export/"+this.$store.state.standard.stanId)
        }else{
          this.$confirm("数据标准未发布，无法下载！", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.load()
          })
        }
      }else{
        this.$confirm("请登录以获得更多权限", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.load()
        })
      }
    },

    //编辑数据标准
    editStan(){
      console.log('Join:check -> edit index:'+this.cardStanData.id)
      if(this.cardStanData.state===0){
        console.log('添加 stanId:'+this.$store.state.standard.stanId)
        this.$router.push({name: 'edit'})
      }else {
        this.$confirm("该数据标准当前处于" + this.cardStanData.stateName + "状态，无法编写！", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.load()
        })
      }
    },

    //管理数据标准
    manageStan(){
      console.log('Join:check -> manage index:'+this.cardStanData.id)
      this.$router.push({name: 'umanage'})
    },
  },

  computed: {
    //动态获取菜单
    asyncStan() {
      return this.$store.state.standard.standard
    }
  },

  //对store监听
  // watch:{
  //   '$store.state.standard.standId'(){
  //     alert('变化')
  //     this.getCardInfo()
  //   }
  // },

  created() {
    this.load()
  }
}
</script>

<style scoped lang="less">
.check {
  background-color: white;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;

  .stanDialog,.tableDialog{
    display: flex;
    justify-content: center;
    align-items: center;
    .stanDialog_footer,.tableDialog_footer{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .header {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;

    .l-content {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 22px;
      }
    }

    .c-content {
      width: 70%;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .r-content {
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      //.img{
      //  margin-right: 0;
      //  margin-bottom: 0;
      //  background-color: white;
      //  display: flex;
      //  justify-content: center;
      //  align-items: center;
      //  height: 20px;
      //  img{
      //    margin-right: 20px;
      //  }
      //}
      .download, .edit {
        margin: 10px 10px 10px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        width: 45px;
        height: 30px;
      }
      .download1, .edit1,.manage {
        margin: 5px 5px 5px 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        width: 40px;
        height: 30px;
      }
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
      width: 250px;
      text-align: center;
      height: 100%;
    }

    .main {
      width: calc(100% - 250px);
      height: 100%;
      padding: 0;
      common-table{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>