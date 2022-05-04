<template>
  <div class="home">
    <div class="search">
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
    <div class="show">
      <div class="aside">
        <common-aside class="common-aside"
                      :menu="level"
                      aside-name="home"
                      @chooseTable="chooseMenu"
                      @getAll="getAll"></common-aside>
      </div>
      <div class="table">
        <common-table
            :table-data="tableData"
            :table-label="tableLabel"
            :config="config"
            :page-name="pageName"
            :has-pager=true
            @changePage="changeList"
            @checkHome="checkHome"
            @loadHome="loadHome"
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
  name: "index",

  components: {
    CommonAside,
    CommonForm,
    CommonTable
  },

  data() {
    return {
      userImg: require('../../src/assets/images/logo.png'),
      level:[], //左菜单分级
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
      searchName:'',
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
          prop: "subday",
          //列的名称
          label: "发布时间",
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
        pageSize:9,
      },
      chooseLevel: null,
      pageName: 'home',
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
          state:2 //代表所有的数据标准
        }
      }).then(res => {
        console.log("function:/standard/getPage")
        console.log(res, 'res')
        if (res.code === '200') {
          this.tableData = res.data.records.map(item=>{
            item.levelName=Level.getLevelName(this.level,item.levelList)
            return item;
          })
          this.config.total = res.data.total
          this.config.loading = false
        }else{
          this.$message.error(res.message)
        }
      })
    },

    changeList(page) {
      this.config.loading = true
      this.config.pager = page
      this.load()
    },

    searchStan() {
      this.searchName = this.searchForm.keyword
      this.config.pager = 1
      this.load()
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    checkHome(row) {
      console.log('Join:edit index:' + row.id)
      let pageName = this.pageName
      this.$store.commit('setStanId', {stanId: row.id, stanPage: pageName})
      console.log('添加 stanId:' + this.$store.state.stanId)
      this.$router.push({name: 'check'})
    },

    loadHome(row) {
      if(this.$store.state.user.user.phone!==undefined){
        console.log('function:standard/export')
        window.open("http://localhost:9090/standard/export/"+row.id)
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

    //切换菜单
    chooseMenu(item){
      this.chooseLevel = item.id
      this.load()
    },

    getAll(){
      this.chooseLevel = null
      this.load()
    }
  },

  computed: {},

  mounted() {},
  //生命周期
  created() {
    //在页面加载时就需要调用
    this.load()
  }
}
</script>

<style lang="less" scoped>
.home {
  background-color: white;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;

  .search{
    padding: 0;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .searchForm {
      padding: 10px 0 0 0;
      display: inline-block;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: auto;
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

      .common-aside{
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