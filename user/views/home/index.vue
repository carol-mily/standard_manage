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
                   @click="getList(searchForm.keyword)"
                   style="height: 38px"
        >搜索
        </el-button>
      </common-form>
    </div>
    <div class="show">
      <div class="aside">
        <common-aside class="common-aside" :menu="this.$store.state.level.level" aside-name="home" @chooseTable="chooseMenu"></common-aside>
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
import {getTotal} from '../../api/data'
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
      tableData: [],
      tableLabel: [
        {
          //列的名称
          label: "序号",
          width: "100px"
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
          width: "250px"
        },
        {
          //数据中读取的字段的名称
          prop: "subDay",
          //列的名称
          label: "发布时间",
          width: "200px"
        },
        {
          //数据中读取的字段的名称
          prop: "manager",
          //列的名称
          label: "负责人",
          width: "150px"
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
      pageName: 'home',
    }
  },
  methods: {
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.pager = 1) : ''
      getTotal({
        pageName:this.pageName,
        phone:this.$store.state.user.user.phone,
        page: this.config.pager,
        name: this.searchForm.keyword,
        level:this.chooseLevel.level,
        levelId: this.chooseLevel.levelId[this.chooseLevel.level-1]
      }).then(({data: res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res, 'res')
        this.tableData = res.data.list.map(item => {
          //映射
          item.manager=item.manager.name
          item.levelName=Level.getLevelName(this.$store.state.level.level,item.level1,item.level2,item.level3)
          return item
        })
        this.config.total = res.data.count
        this.config.loading = false
      });
    },

    changeList(page) {
      this.config.loading = true
      this.config.pager = page
     this.getList()
      // getHomeList({
      //   page: this.config.pager,
      //   name: this.searchForm.keyword
      // }).then(({data: res}) => {
      //   //上面是使用es6的解构赋值为res
      //   console.log(res, 'res')
      //   this.tableData = res.list
      //   this.config.total = res.count
      //   this.config.loading = false
      // });
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

    checkHome(row) {
      console.log('Join:edit index:' + row.id)
      let pageName = this.pageName
      this.$store.commit('setStanId', {stanId: row.id, stanPage: pageName})
      console.log('添加 stanId:' + this.$store.state.stanId)
      this.$router.push({name: 'check'})
    },

    loadHome(row) {
      console.log('load:' + row.id)
      alert('下载中……')
    },

    //切换菜单
    chooseMenu(item){
      this.chooseLevel.level=item.level
      this.chooseLevel.levelId[item.level-1]=item.id
      this.getList()
    }
  },

  computed: {},

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
  created() {
    //在页面加载时就需要调用
    this.getList()
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
      justify-content: center;
      margin: 0 30% 0 30%;
      display: flex;
      height: 40px;
      width: 40%;
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