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
            :card-name="'check'"
            :card-data="cardStanData"
            @checkStan="checkStan"></info-card>
      </div>
      <div class="r-content" style="height: 100%">
        <!--        <div class="img">-->
        <!--          <img class="download" :src="downloadImg" style="width: 18px; height: 18px"/>-->
        <!--          <img class="edit" :src="editImg" style="width: 18px; height: 18px"/>-->
        <!--        </div>-->
        <el-button class="download" type="primary" icon="el-icon-download" plain @click="download"></el-button>
        <el-button class="edit" v-if="this.$store.state.standard.pageName" type="primary" icon="el-icon-edit" plain @click="editStan"></el-button>
      </div>
    </el-header>
    <el-container class="mcontainer">
      <el-aside class="aside">
          <common-aside
              :aside-name="'check'"
              :menu="tableList"
              @chooseTable="changeTable"
              @checkTable="checkTable"></common-aside>
      </el-aside>
      <el-main class="main">
          <common-table
              :table-data="itemData"
              :table-label="itemLabel"
              :page-name="pageName"
              :has-pager=false
              style="height: 100%;width:100%"
          ></common-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import InfoCard from "@/components/InfoCard";
import CommonAside from "@/components/CommonAside";
import CommonTable from "@/components/CommonTable";
import CommonForm from "@/components/CommonForm";
import {getStanInfo, getStanItem} from "../../api/data";

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
          model: 'description',
          label: "简述",
          type: "textarea",
          style: "width:510px;",
          disabled:true
        },

      ],
      asideStanData: {
        name: '',
        ename: '',
        manager: '',
        editors: '',
        level: '',
        creDay: '',
        description: ''
      },
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
          model: 'editors',
          label: "编写者",
          type: "input",
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
        manager: '',
        editors: '',
        level: '',
        creDay: '',
        description: ''
      },
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
      tableList:[],
      itemData: [],
      itemLabel: [
        {
          //数据中读取的字段的名称
          prop: "id",
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
          prop: "type",
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
          prop: "decimal",
          //列的名称
          label: "小数位数",
          width: "100px"
        },
        {
          //数据中读取的字段的名称
          prop: "constraint",
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
        this.cardStanData = res.list[0]
        this.cardStanData.editors = editor
        this.tableList=res.list[0].table
        this.itemData=res.stanItem
      });
    },

    //换表
    changeTable(item){
      this.itemNum= item.id
      getStanItem({
        stanId:this.$store.state.standard.stanId,
        tableId: item.id,
        pageName: this.$store.state.standard.stanPage,
      }).then(({data: res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res, 'res')
        this.itemData=res.stanItem
      });
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
      this.asideTableData = this.tableList[item.id]
      console.log('表的信息：'+this.asideTableData)
      //换表，可以尝试看看有方法调用之前的函数吗
      this.itemNum= item.id
      getStanItem({
        stanId:this.$store.state.standard.stanId,
        tableId: item.id,
        pageName: this.$store.state.standard.stanPage,
      }).then(({data: res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res, 'res')
        this.itemData=res.stanItem
      });
    },

    //下载数据标准
    download(){
      alert('下载文件中……')
    },

    //编辑数据标准
    editStan(){
      console.log('Join:check -> edit index:'+this.cardStanData.id)
      this.$router.push({name: 'edit'})
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
    this.getCardInfo()
  }
}
</script>

<style scoped lang="less">
.check {
  background-color: white;
  padding: 0;
  max-width: 100%;

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
      height: 500px !important;
    }

    .main {
      width: 100%;
      height: 500px !important;
      padding: 0;
      common-table{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>