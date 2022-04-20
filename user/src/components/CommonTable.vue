<template>
  <div class="common-table">
    <div class="primary" v-if="hasPager===false">
      <!--tableData用于接收数据-->
      <el-table  :data="tableData" height="100%" style="width: 100%"
                @selection-change="handleSelectionChange" stripe>
        <el-table-column
            v-if="pageName==='edit'"
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
            <span v-if="item.label==='序号'" style="margin-left: 10px">{{ scope.$index + 1 }}</span>
            <span v-if="item.label!=='序号'" style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <!--操作列-->
        <el-table-column v-if="pageName==='edit'" fixed="right" label="操作" min-width="150" align="center">
          <!--template用于帮助拿到当前行的数据-->
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <!-- manage -->
        <el-table-column v-if="pageName==='manage'" fixed="right" label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteMessage(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="better" v-if="hasPager===true">
      <!--tableData用于接收数据-->
      <el-table :data="tableData" class="table" height="calc(100% - 35px)" width="100%" style="width: 100%" @selection-change="handleSelectionChange" stripe>
        <!--复选框-->
        <el-table-column
            v-if="pageName!=='home'&&pageName!=='level'"
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
          <!--template用于帮助拿到当前行的数据-->
          <template slot-scope="scope">
            <span v-if="item.label==='序号'" style="margin-left: 10px">{{ (config.pager-1)*config.pageSize+scope.$index + 1 }}</span>
            <span v-if="item.label!=='序号'" style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <!--操作列-->
        <!-- home -->
        <el-table-column v-if="pageName==='home'" fixed="right" label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleCheckHome(scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleLoadHome(scope.row)">下载</el-button>
          </template>
        </el-table-column>
        <!-- total -->
        <el-table-column v-if="pageName==='total'" fixed="right" label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDeleteTotal(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <!-- level -->
        <el-table-column v-if="pageName==='level'" fixed="right" label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" v-if="level.toString()!=='3'&&scope.row.name!=='默认'"  @click="handleNext(scope.row)">查看下一级</el-button>
            <el-button size="mini" v-if="scope.row.name!=='默认'"  @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" v-if="scope.row.name!=='默认'" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <!-- manage -->
        <el-table-column v-if="pageName==='manage'" fixed="right" label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteMessage(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <!-- user -->
        <el-table-column v-if="pageName==='user'" fixed="right" label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEditUser(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <!-- message -->
        <el-table-column v-if="pageName==='message'" fixed="right" label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="checkMessage(scope.row)">查看</el-button>
            <el-button v-if="messageType==='2'" size="mini" type="danger" @click="deleteMessage(scope.row)">删除</el-button>
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
          :page-size="config.pageSize"
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
    hasPager: Boolean,
    height: String,
    level:String,
    messageType:String,
  },

  data() {
    return {}
  },

  methods: {
    handleEdit(row) {
      //向上传递操作
      this.$emit('editItem', row)
    },

    handleDelete(row) {
      this.$emit('deleteItem', row)
    },

    handleNext(row) {
      this.$emit('nextItem', row)
    },

    handleEditUser(row) {
      //向上传递操作
      this.$emit('editUser', row)
    },

    handleDeleteUser(row) {
      this.$emit('deleteUser', row)
    },

    handleSelectionChange(val) {
      this.$emit('selectionChange', val)
    },

    handleCheckHome(row) {
      this.$emit('checkHome', row)
    },

    handleLoadHome(row) {
      this.$emit('loadHome', row)
    },

    handleDeleteTotal(row) {
      this.$emit('deleteTotal', row)
    },

    changePage(page) {
      this.$emit('changePage', page)
    },

    deleteMessage(row){
      this.$emit('delete', row)
    },

    checkMessage(row){
      this.$emit('check', row)
    }
  }
}
</script>

<style lange="less" scoped>
.common-table {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  /*相对定位*/
  position: relative;
}

.primary {
  height: 100%;
  width: 100%;
  background-color: #fff;
  /*相对定位*/
  position: relative;
}

.better {
  height: 100%;
  width: 100%;
  background-color: #fff;
  /*相对定位*/
  position: relative;
}


.pager {
  position: absolute;
  bottom: 0;
  right: 40%;
  height: 30px;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>