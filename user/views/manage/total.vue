<template>
  <div class="total">
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
      <el-aside>
        <common-aside :menu="level" aside-name="primary"></common-aside>
      </el-aside>
      <div class="table">
        <common-table
            :table-data="tableData"
            :table-label="tableLabel"
            :config="config"
            :page-name="pageName"
            :has-pager=true
            @changePage="changeList"
            @deleteTotal="deleteTotal"
        ></common-table>
      </div>
    </div>
  </div>
</template>

<script>
import {getTotal,deleteTotal} from '../../api/data'
import CommonForm from "@/components/CommonForm";
import CommonAside from "@/components/CommonAside";
import CommonTable from "@/components/CommonTable";


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
      tableData: [],
      tableLabel: [
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
          label: "名称",
          width:"300px"
        },
        {
          //数据中读取的字段的名称
          prop: "creDay",
          //列的名称
          label: "创建时间",
          width: "300px"
        },
        {
          //数据中读取的字段的名称
          prop: "manager",
          //列的名称
          label: "负责人",
          width: "300px"
        },
      ],
      //默认页数值
      config: {
        pager: 1,
        total: 30
      },
      pageName:'total',
      level:[]
    }
  },
  methods: {
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.pager = 1) : ''
      getTotal({
        page: this.config.pager,
        name
      }).then(({data:res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res,'res')
        this.tableData=res.list
        this.config.total=res.count
        this.config.loading=false
        this.level=res.level
      });
    },

    changeList(page){
      this.config.loading = true
      this.config.pager=page
      getTotal({
        page: this.config.pager,
        name:this.searchForm.keyword
      }).then(({data:res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res,'res')
        this.tableData=res.list
        this.config.total=res.count
        this.config.loading=false
      });
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

    deleteTotal(row) {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const id = row.id
        console.log('66666666:'+id)
        deleteTotal({
          stanId: id
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
  padding: 0;

  .search {
    padding: 10px 0 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .searchForm {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.show{
  display: flex;
  padding: 0;
  .el-aside {
    width: 250px !important;
    text-align: center;
    height: 100% !important;
    common-aside{
      height: 100%;
    }
  }
  .table{
    height: 500px;
  }
}
</style>