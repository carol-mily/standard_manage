<template>
  <div class="total">
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
                     @click="searchStan"
                     style="height: 38px"
          >搜索
          </el-button>
        </common-form>
      </div>
      <div class="r-content">
        <el-button class="delete" type="primary" icon="el-icon-delete" plain @click="deleteStans"></el-button>
      </div>
    </div>
    <div class="show">
      <div class="aside">
        <common-aside :menu="this.$store.state.level.level" aside-name="total" @chooseTable="chooseMenu"></common-aside>
      </div>
      <div class="table">
        <common-table
            :table-data="tableData"
            :table-label="tableLabel"
            :config="config"
            :page-name="pageName"
            :has-pager=true
            @changePage="changeList"
            @deleteTotal="deleteStan"
            @selectionChange="selectionChange"
        ></common-table>
      </div>
    </div>
  </div>
</template>

<script>
import {getTotal,deleteStan} from '../../api/data'
import CommonForm from "@/components/CommonForm";
import CommonAside from "@/components/CommonAside";
import CommonTable from "@/components/CommonTable";
import Level from "../../util/level";

export default {
  name: "total",

  components: {
    CommonAside,
    CommonForm,
    CommonTable
  },

  data() {
    return {
      userImg: require('../../src/assets/images/logo.png'),
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
      tableData: [],
      tableLabel: [
        {
          //列的名称
          label: "序号",
          width:"100px"
        },
        {
          //数据中读取的字段的名称
          prop: "name",
          //列的名称
          label: "名称",
          width:"300px"
        },
        {
          //数据中读取的字段的名称
          prop: "levelName",
          //列的名称
          label: "分级",
          width:"200px"
        },
        {
          //数据中读取的字段的名称
          prop: "stateName",
          //列的名称
          label: "状态",
          width:"100px"
        },
        {
          //数据中读取的字段的名称
          prop: "creDay",
          //列的名称
          label: "创建时间",
          width: "200px"
        },
        {
          //数据中读取的字段的名称
          prop: "manager",
          //列的名称
          label: "负责人",
          width: "200px"
        },
      ],
      //默认页数值
      config: {
        pager: 1,
        total: 30,
        pageSize:10,
      },
      chooseLevel:{ //选择的分级
        level:1,
        levelId:[0,-1,-1]
      },
      selection:[],
      pageName:'total',
    }
  },
  methods: {
    getList() {
      this.config.loading = true
      getTotal({
        pageName:this.pageName,
        phone:this.$store.state.user.user.phone,
        page: this.config.pager,
        name: this.searchName,
        level:this.chooseLevel.level,
        levelId: this.chooseLevel.levelId[this.chooseLevel.level-1]
      }).then(({data:res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res,'res')
        this.tableData = res.data.list.map(item => {
          //映射
          item.manager=item.manager.name
          item.levelName=Level.getLevelName(this.$store.state.level.level,item.level1,item.level2,item.level3)
          if(item.state===2){
            item.stateName='已发布'
          }else if(item.state===1){
            item.stateName='审核中'
          }else{
            item.stateName='编写中'
          }
          return item
        })
        this.config.total = res.data.count
        this.config.loading = false
      });
    },

    searchStan() {
      this.searchName = this.searchForm.keyword
      this.config.pager = 1
      this.getList()
    },

    changeList(page){
      this.config.loading = true
      this.config.pager=page
      this.getList()
    },

    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    deleteStan(row) {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const id = row.id
        deleteStan({
          stanIds: [id]
        }).then(() => {
          //同$confirm类似
          this.$message({
            type: "success",
            message: "删除成功！"
          })
          //更新列表
          this.getList('')
        })
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

    //删除多个
    deleteStans() {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteStan({
          stanIds: this.selection
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

    //切换菜单
    chooseMenu(item){
      this.chooseLevel.level=item.level
      this.chooseLevel.levelId[item.level-1]=item.id
      this.getList()
    }
  },

  computed:{},

  mounted() {
    // getData().then(res => {
    //   //解析获得所需数据
    //   const {code, data} = res.data
    //   if (code === 20000) {
    //     //请求成功，赋值到tableData
    //     this.tableData = data.tableData
    //   }
    //   console.log(res)
    // })
  },
  //生命周期
  created(){
    //在页面加载时就需要调用
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.total {
  background-color: white;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;

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

      .delete{
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
    justify-content: space-between;
    align-items: center;

    .aside {
      width: 250px;
      text-align: left;
      height: 100%;
      padding: 0;

      common-aside{
        width: 100%;
        height: 100%;
      }
    }

    .table {
      margin: 0;
      padding: 0;
      height: 100%;
      width: calc(100% - 250px);
    }
  }
}
</style>