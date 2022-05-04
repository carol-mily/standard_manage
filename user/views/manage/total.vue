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
                     style="height: 38px">搜索
          </el-button>
        </common-form>
      </div>
      <div class="r-content">
        <el-button class="delete" type="primary" icon="el-icon-delete" plain @click="deleteStans"></el-button>
      </div>
    </div>
    <div class="show">
      <div class="aside">
        <common-aside :menu="level" aside-name="total" @chooseTable="chooseMenu" @getAll="getAll"></common-aside>
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
            @checkHome="checkHome"
            @selectionChange="selectionChange"
        ></common-table>
      </div>
    </div>
  </div>
</template>

<script>
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
      level: this.$store.state.level.level, //左菜单分级
      formLabel: [
        {
          model: "keyword",
          label: '',
          type: 'search',
          style: "width:500px;"
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
          width: "50px"
        },
        {
          //数据中读取的字段的名称
          prop: "name",
          //列的名称
          label: "名称",
          width: "300px"
        },
        {
          //数据中读取的字段的名称
          prop: "levelName",
          //列的名称
          label: "分级",
          width: "200px"
        },
        {
          //数据中读取的字段的名称
          prop: "stateName",
          //列的名称
          label: "状态",
          width: "100px"
        },
        {
          //数据中读取的字段的名称
          prop: "creday",
          //列的名称
          label: "创建时间",
          width: "200px"
        },
        {
          //数据中读取的字段的名称
          prop: "mname",
          //列的名称
          label: "负责人",
          width: "150px"
        },
      ],
      //默认页数值
      config: {
        pager: 1,
        total: 30,
        pageSize: 9,
      },
      chooseLevel: null,
      selection: [],
      pageName: 'total',
    }
  },
  methods: {
    load() {
      this.loadLevel()
      this.loadType()
      this.getList()
    },

    loadLevel() {
      this.request.get("/level/findAll").then(res => {
        console.log("function:/level/findAll")
        console.log(res, 'res')
        if (res.code === '200') {
          this.level = res.data
          //处理多余的children
          this.level = Level.cleanChildren(this.level)
          //level存入store中以供form使用
          this.$store.state.level.level = this.level
        } else {
          this.$message.error(res.message)
        }
      })
    },

    loadType(){
      this.request.get("/type/findAll").then(res=>{
        console.log("function：/type/findAll")
        console.log(res,'res')
        if(res.code==='200'){
          this.$store.state.typeList.typeList=res.data
        }else{
          this.$message.error(res.message)
        }
      })
    },

    getList() {
      this.config.loading = true
      this.request.get("/standard/getPage", {
        params: {
          pageNum: this.config.pager,
          pageSize: this.config.pageSize,
          levelid: this.chooseLevel,
          name: this.searchName,
        }
      }).then(res => {
        console.log("function:/standard/getPage")
        console.log(res, 'res')
        if (res.code === '200') {
          this.tableData = res.data.records.map(item => {
            //映射
            if (item.state === 2) {
              item.stateName = '已发布'
            } else if (item.state === 1) {
              item.stateName = '审核中'
            } else {
              item.stateName = '编写中'
            }
            item.levelName = Level.getLevelName(this.level, item.levelList)
            return item
          })
        }
        this.config.total = res.data.total
        this.config.loading = false
      })
    },

    searchStan() {
      this.searchName = this.searchForm.keyword
      this.config.pager = 1
      this.load()
    },

    changeList(page) {
      this.config.loading = true
      this.config.pager = page
      this.load()
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
        this.request.delete("/standard/" + row.id).then(res => {
          console.log("function:/stanard/delete")
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

    checkHome(row) {
      console.log('Join:edit index:' + row.id)
      let pageName = this.pageName
      this.$store.commit('setStanId', {stanId: row.id, stanPage: pageName})
      console.log('添加 stanId:' + this.$store.state.stanId)
      this.$router.push({name: 'check'})
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
        this.request.post("/standard/delete/batch", this.selection).then(res => {
          console.log('function:/standard/delete/batch')
          console.log(res, 'res')
          if (res.code === '200') {
            this.$message.success(res.message)
            //更新列表
            this.load()
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },

    //切换菜单
    chooseMenu(item) {
      this.chooseLevel = item.id
      this.load()
    },

    getAll(){
      this.chooseLevel = null
      this.load()
    }
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
        margin: 0 0 0 25%;
        padding: 10px 0 0 0;
        display: inline-block;
        justify-content: center;
        align-items: center;
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

      .delete {
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

      common-aside {
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