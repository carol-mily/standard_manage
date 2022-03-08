<template>
  <div class="common-table">
    <!--tableData用于接收数据-->
    <el-table :data="tableData" height="90%" stripe>
      <el-table-column
          show-overflow-tooltip
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!--操作列-->
      <el-table-column label="操作" min-width="180">
        <!--template用于帮助拿到当前行的数据-->
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--total为总页数,current.page.sync为当前页面数,page-size为当前分页数的默认值-->
    <el-pagination
        class="pager"
        layout="prev,pager,next"
        :total="config.total"
        :current-page.sync="config.page"
        @current-change="changePage"
        :page-size="20"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "CommonTable",

  //用于接收外部传入的数据
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },

  data() {
    return {}
  },

  methods: {
    handleEdit(row) {
      //向上传递操作
      this.$emit('edit',row)
    },

    handleDelete(row) {
      this.$emit('del',row)
    },

    changePage(page){
      this.$emit('changePage',page)
    }
  }
}
</script>

<style lange="less" scoped>
.common-table{
  height: calc(100% - 62px);
  background-color: #fff;
  /*相对定位*/
  position: relative;

}
.pager{
  position: absolute;
  bottom: 0;
  right:20px
}

</style>