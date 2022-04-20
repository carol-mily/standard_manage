<template>
  <div class="level" style="height: 100%">
    <el-dialog
        :title="operateType==='add' ? '新增分级' : '编辑分级'"
        :visible.sync="isShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="operateFormLabel"
          :form="operateForm"
          :inline="true"
          ref="form"></common-form>
      <div slot="footer" class="dialog__footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>

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
                     @click="searchUser"
                     style="height: 38px"
          >搜索
          </el-button>
        </common-form>
      </div>
      <div class="r-content">
        <el-button class="back" v-if="choseLevel.level!==1" type="primary" plain @click="preItem">返回上一级</el-button>
        <el-input class="levelSelect" v-model="choseLevel.level" placeholder="级别" disabled></el-input>
        <el-button class="add" type="primary" icon="el-icon-plus" plain @click="addItem"></el-button>
      </div>
    </div>

    <div class="show">
      <common-table
          :table-data="tableData"
          :table-label="tableLabel"
          :config="config"
          :has-pager=true
          :page-name="pageName"
          :level="choseLevel.level"
          @changePage="getList()"
          @editItem="editItem"
          @deleteItem="deleteItem"
          @nextItem="nextItem"
      ></common-table>
    </div>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable";
import {addLevel,editLevel,deleteLevel,getTotalLevel, getLevel} from "../../api/data"
import Level from '../../util/level'

export default {
  name: "level",

  components: {
    CommonForm,
    CommonTable
  },

  data() {
    return {
      pageName: 'level',
      //表单相关
      operateType: 'add',
      isShow: false,
      operateFormLabel: [
        {
          model: 'name',
          label: "名称",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'level',
          label: '级数',
          type: 'select',
          style: "width:200px;",
          disabled:true,
          opts: [
            {
              label: '1',
              value: 1
            },
            {
              label: '2',
              value: 2
            },
            {
              label: '3',
              value: 3
            }
          ]
        },
        {
          model: 'preName',
          label: "上一级名称",
          type: "input",
          style: "width:200px;",
          disabled:true,
        },
        {
          model: 'childrenNum',
          label: "下一级数目",
          type: "input",
          style: "width:200px;",
          disabled:true,
        },
        {
          model: 'stanNum',
          label: "数据标准数目",
          type: "input",
          style: "width:200px;",
          disabled:true,
        },
      ],
      operateForm: {},
      //搜索功能相关
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
      //表格相关
      tableData: [],
      tableLabel: [
        {
          //列的名称
          label: "序号",
          width: 50
        },
        {
          //数据中读取的字段的名称
          prop: "name",
          //列的名称
          label: "名称",
          width: 250
        },
        {
          //数据中读取的字段的名称
          prop: "level",
          //列的名称
          label: "级数",
          width: 200
        },
        {
          //数据中读取的字段的名称
          prop: "preName",
          //列的名称
          label: "上一级名称",
          width: 250
        },
        {
          //数据中读取的字段的名称
          prop: "childrenNum",
          //列的名称
          label: "下一级数目",
          width: 200
        },
        {
          //数据中读取的字段的名称
          prop: "stanNum",
          //列的名称
          label: "数据标准数目",
          width: 250
        },
      ],
      choseLevel: {
        level: 1,
        levelId: [0, 0, 0]
      },   //当前的分级
      config: {
        pager: 1,
        total: 10,
        pageSize: 10
      }, //默认页数值
    }
  },

  methods: {
    getLevel() {
      getLevel({
        page: this.config.pager,
        name: this.searchName,
        level: this.choseLevel.level,
        preLevel:this.choseLevel.level===1 ? 0 : this.choseLevel.levelId[this.choseLevel.level-2]
      }).then(({data: res}) => {
            //上面是使用es6的解构赋值为res
            console.log(res, 'res')
            if (res.code === 20000) {
              this.tableData = res.data.list
              this.tableData = this.tableData.map(item => {
                //对sexLabel字段进行映射
                item.childrenNum = Level.getNextNum(this.$store.state.level.level,this.choseLevel.level,this.choseLevel.levelId,item.id)
                item.preName = Level.getPreName(this.$store.state.level.level,this.choseLevel.level,this.choseLevel.levelId)
                return item
              })
            }
          }
      )
    },

    //下一级
    nextItem(item) {
      this.searchForm.keyword=''
      this.searchName = ''
      this.choseLevel.levelId[this.choseLevel.level - 1] = item.id
      this.choseLevel.level++
      this.getLevel()
    },

    //上一级
    preItem(){
      this.searchForm.keyword=''
      this.searchName = ''
      this.choseLevel.levelId[this.choseLevel.level - 1] = 0
      this.choseLevel.level--
      this.getLevel()
    },

    confirm() {
      if (this.operateType === 'edit') {  //编辑
        this.$confirm("此操作将更改您的身份信息并返回登录页，是否继续？", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          editLevel({
            level:this.operateForm.level,
            id: this.operateForm.id,
            name:this.operateForm.name
          }).then(({data: res}) => {
            console.log(res,'res')
            this.isShow = false
            //同$confirm类似
            this.$message({
              type: "success",
              message: "修改成功！"
            })
            getTotalLevel().then(({data: res}) => {
              console.log(res,'res')
              this.$store.commit('clearLevel')
              let level=Level.handleLevel(res.data.level)
              this.$store.commit('setLevel',level)
              this.$store.commit('addLevel',this.$router)
              console.log('level: level is')
              console.log(res.data.level)
              this. getLevel()
            })
          })
        })
      } else {  //新增
        addLevel({
          level:this.operateForm.level,
          name:this.operateForm.name,
          preLevel:this.choseLevel.level===1 ? 0 : this.choseLevel.levelId[this.choseLevel.level-2]
        }).then(({data: res}) => {
          console.log(res,'res')
          if (res.code === 20000) {
            this.isShow = false
            //同$confirm类似
            this.$message({
              type: "success",
              message: "添加成功"
            })
            getTotalLevel().then(({data: res}) => {
              console.log(res,'res')
              this.$store.commit('clearLevel')
              let level=Level.handleLevel(res.data.level)
              this.$store.commit('setLevel',level)
              this.$store.commit('addLevel',this.$router)
              console.log('level: level is')
              console.log(res.data.level)
              this. getLevel()
            })
          }
        })
      }
    },

    addItem() {
      this.isShow = true
      this.operateType = 'add'
      //数据初始化
      this.operateForm = {
        name: '',
        level: this.choseLevel.level,
        preName: Level.getPreName(this.$store.state.level.level,this.choseLevel.level,this.choseLevel.levelId),
        childrenNum: 0,
        stanNum: 0,
      }
    },

    searchUser() {
      this.searchName = this.searchForm.keyword
      this.config.pager = 1
      this.getLevel()
    },

    editItem(row) {
      this.operateType = 'edit'
      this.isShow = true
      //表内数据显示为当前行内的数据，回写
      this.operateForm = {
        id:row.id,
        name: row.name,
        level: row.level,
        preName: row.preName,
        childrenNum: row.childrenNum,
        stanNum: row.stanNum,
      }
    },

    //删除单个用户
    deleteItem(row) {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteLevel({
          level:this.choseLevel.level,
          id: row.id,
        }).then(() => {
          //同$confirm类似
          this.$message({
            type: "success",
            message: "删除成功！"
          })
          //更新列表
          getTotalLevel().then(({data: res}) => {
            console.log(res,'res')
            this.$store.commit('clearLevel')
            let level=Level.handleLevel(res.data.level)
            this.$store.commit('setLevel',level)
            this.$store.commit('addLevel',this.$router)
            console.log('level: level is')
            console.log(res.data.level)
            this. getLevel()
          })
        })
      })
    },
  },


  //生命周期
  created() {
    //在页面加载时就需要调用
    this.getLevel()
  }
}
</script>

<style lang="less" scoped>
.level {
  background-color: white;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;

  .dialog__footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }


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

      .add, .delete{
        margin: 0 10px 0 10px;
        height: 38px;
        width: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .back{
        margin: 0 10px 0 10px;
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .levelSelect{
        margin: 0 10px 0 10px;
        height: 38px;
        width: 40px;
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
    justify-content: center;
    align-items: center;
  }
}

</style>
