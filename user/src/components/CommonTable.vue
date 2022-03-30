<template>
  <div class="common-table">
    <div class="primary" v-if="hasPager===false">
      <!--tableData用于接收数据-->
      <el-table v-if="pageName==='edit'" :data="tableData" height="470px" style="width: 100%" @selection-change="handleSelectionChange" stripe>
      <el-table-column
          type="selection"
          fixed="left"
          width="55"/>
      <el-table-column
          show-overflow-tooltip
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :width="item.width ? item.width : 125"
          align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!--操作列-->
      <el-table-column fixed="right" label="操作" min-width="150" align="center">
        <!--template用于帮助拿到当前行的数据-->
        <template slot-scope="scope" >
          <el-button size="mini"  @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-table v-if="pageName==='check'" :data="tableData" height="500px" style="width: 100%" stripe>
        <el-table-column
            show-overflow-tooltip
            v-for="item in tableLabel"
            :key="item.prop"
            :label="item.label"
            :width="item.width ? item.width : 125"
            align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="better" v-if="hasPager===true">
      <!--tableData用于接收数据-->
      <el-table :data="tableData" height="calc(100% - 35px)" stripe>
        <el-table-column
            show-overflow-tooltip
            v-for="item in tableLabel"
            :key="item.prop"
            :label="item.label"
            :width="item.width ? item.width : 125"
            align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <!--操作列-->
        <el-table-column v-if="pageName==='home'" label="操作" min-width="200" align="center">
          <!--template用于帮助拿到当前行的数据-->
          <template slot-scope="scope" >
            <el-button size="mini" @click="handleCheckHome(scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleLoadHome(scope.row)">下载</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="pageName==='total'" label="操作" min-width="200" align="center">
          <!--template用于帮助拿到当前行的数据-->
          <template slot-scope="scope" >
            <el-button size="mini" type="danger" @click="handleDeleteTotal(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="pageName==='user'" label="操作" min-width="200" align="center">
          <!--template用于帮助拿到当前行的数据-->
          <template slot-scope="scope" >
            <el-button size="mini"  @click="handleEditUser(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--total为总页数,current.page.sync为当前页面数,page-size为当前分页数的默认值-->
      <el-pagination
          class="pager"
          layout="prev,pager,next"
          :total="config.total"
          :current-page.sync="config.pager"
          @current-change="changePage"
          :page-size="10"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonTable",

  //用于接收外部传入的数据
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
    pageName: String,
    hasPager:Boolean,
    height:String,
  },

  data() {
    return {}
  },

  methods: {
    handleEdit(row) {
      //向上传递操作
      this.$emit('editItem',row)
    },

    handleDelete(row) {
      this.$emit('deleteItem',row)
    },

    handleEditUser(row) {
      //向上传递操作
      this.$emit('editUser',row)
    },

    handleDeleteUser(row) {
      this.$emit('deleteUser',row)
    },

    handleSelectionChange(val) {
      this.$emit('selectionChange',val)
    },

    handleCheckHome(row){
      this.$emit('checkHome',row)
    },

    handleLoadHome(row){
      this.$emit('loadHome',row)
    },

    handleDeleteTotal(row){
      this.$emit('deleteTotal',row)
    },

    changePage(page){
      this.$emit('changePage',page)
    },


  }
}
</script>

<style lange="less" scoped>
.common-table{
  height: 100%;
  width: 100%;
  background-color: #fff;
  /*相对定位*/
  position: relative;
}
.primary{
  height:100%;
  width: 100%;
  background-color: #fff;
  /*相对定位*/
  position: relative;
}
.better{
  height: 100%;
  width: 100%;
  background-color: #fff;
  /*相对定位*/
  position: relative;
}
.pager{
  position: absolute;
  bottom: 0;
  right:50%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>