<template>
  <div class="level" style="height: 100%">
    <el-dialog
        :title="operateType==='add' ? '新增分级' : '编辑分级'"
        :visible.sync="isShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="operateFormLabel"
          :form="operateForm"
          :rules="rules"
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
                     style="height: 38px">搜索
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
          :choseLevel="choseLevel"
          @changePage="getLevel()"
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
          disabled: true,
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
          disabled: true,
        },
        {
          model: 'childrenNum',
          label: "下一级数目",
          type: "input",
          style: "width:200px;",
          disabled: true,
        },
        {
          model: 'stanNum',
          label: "数据标准数目",
          type: "input",
          style: "width:200px;",
          disabled: true,
        },
        {
          model: 'description',
          label: "描述",
          type: "textarea",
          style: "width:510px;",
        },
      ],
      operateForm: {},
      rules: {
        name: [
          {
            required: true, //必填
            message: "请输入分级名称", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            max: 15,
            message: "名称长度不应超过15个字符",
            trigger: "blur"
          }
        ],
        description: {
          max: 200,
          message: "描述长度不应超过200个字符",
          trigger: "blur"
        }
      },
      validInfo: { //检验form内信息是否通过校验
        value: 0,
        message: ''
      },
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
          width: 100
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
          width: 100
        },
        {
          //数据中读取的字段的名称
          prop: "stanNum",
          //列的名称
          label: "数据标准数目",
          width: 150
        },
        {
          //数据中读取的字段的名称
          prop: "description",
          //列的名称
          label: "描述",
          width: 300
        },
      ],
      choseLevel: {
        level: 1,
        levelInfo: [{}, {}, {}],
        levelNum:0  //当前级别的分级数目
      },   //当前的分级
      config: {
        pager: 1,
        total: 10,
        pageSize: 9
      }, //默认页数值
    }
  },

  methods: {
    //刷新整个level
    load() {
      this.request.get("/level/findAll").then(res => {
        console.log("function:/level/findAll")
        console.log(res, 'res')
        if (res.code === '200') {
          this.$store.state.level.level = Level.cleanChildren(res.data) //刷新store中的level
          console.log('level: level is')
          console.log(this.$store.state.level.level)
          this.getLevel()
        } else {
          this.$message.error(res.message)
        }
      })
    },

    getLevel() {
      this.config.loading = true
      this.request.get("/level/findPage", {
        params: {
          pageNum: this.config.pager,
          pageSize: this.config.pageSize,
          name: this.searchName,
          level: this.choseLevel.level,
          pid: this.choseLevel.level === 1 ? null : this.choseLevel.levelInfo[this.choseLevel.level - 2].id
        }
      }).then(res => {
        console.log("function:/level/findPge")
        console.log(res, 'res')
        if (res.code === '200') {
          this.choseLevel.levelNum=this.tableData.length  //当前级别的分级数目
          this.tableData = res.data.records.map(item=>{   //page返回的具体数据在data.records
            item.preName=item.level===1?'无':this.choseLevel.levelInfo[this.choseLevel.level - 2].name
            return item
          })
          this.config.total = res.data.total
          this.config.loading = false
        } else {
          this.$message.error(res.message)
        }
      })
    },

    //下一级
    nextItem(item) {
      this.searchForm.keyword = ''
      this.searchName = ''
      this.choseLevel.levelInfo[this.choseLevel.level - 1] = {id: item.id, name: item.name}
      this.choseLevel.level++
      this.getLevel()
    },

    //上一级
    preItem() {
      this.searchForm.keyword = ''
      this.searchName = ''
      this.choseLevel.levelInfo[this.choseLevel.level - 1] = {}
      this.choseLevel.level--
      this.getLevel()
    },

    confirm() {
      this.$refs.form.isValid(this.validInfo) //调用form中的函数
      if (this.validInfo.value === 0) { //校验不通过
        this.$message.warning(this.validInfo.message)
      } else {
        if (this.operateForm.name === '默认') {
          this.$message.warning('分级名称不能为“默认”')
        } else {
          if (this.operateType === 'edit') {  //编辑
            this.request.post("/level/update", {
              id:this.operateForm.id,
              level: this.operateForm.level,
              name: this.operateForm.name,
              pid: this.choseLevel.level === 1 ? 0 : this.choseLevel.levelInfo[this.choseLevel.level - 2].id,
              description: this.operateForm.description
            }).then(res => {
              console.log("function:/level/update")
              console.log(res, 'res')
              if (res.code === '200') {
                this.isShow = false
                this.$message.success(res.message)
                this.load()
              } else {
                this.$message.error(res.message)
              }
            })
          } else {  //新增
            this.request.post("/level/add", {
              level: this.operateForm.level,
              name: this.operateForm.name,
              pid: this.choseLevel.level === 1 ? 0 : this.choseLevel.levelInfo[this.choseLevel.level - 2].id,
              description: this.operateForm.description
            }).then(res => {
              console.log("function:/level/add")
              console.log(res, 'res')
              if (res.code === '200') {
                this.isShow = false
                this.$message.success(res.message)
                this.load()
              } else {
                this.$message.error(res.message)
              }
            })
          }
        }
      }
    },

    addItem() {
      this.isShow = true
      this.operateType = 'add'
      //数据初始化
      this.operateForm = {
        name: '',
        level: this.choseLevel.level,
        preName: this.choseLevel.level === 1 ? '无' : this.choseLevel.levelInfo[this.choseLevel.level - 2].name,
        childrenNum: 0,
        stanNum: 0,
      }
    },

    editItem(row){
      this.isShow = true
      this.operateType = 'edit'
      //数据初始化
      this.operateForm = {
        id:row.id,
        name: row.name,
        level: row.level,
        preName: this.choseLevel.level === 1 ? '无' : this.choseLevel.levelInfo[this.choseLevel.level - 2].name,
        childrenNum:row.childrenNum,
        stanNum: row.stanNum,
        description: row.description
      }
    },

    searchUser() {
      this.searchName = this.searchForm.keyword
      this.config.pager = 1
      this.getLevel()
    },

    //删除单个
    deleteItem(row) {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.request.delete("/level/"+row.id).then(res=>{
          console.log("function:/level/delete")
          console.log(res,'res')
          if(res.code==='200'){
            this.$message.success(res.message)
            this.load()
          }else{
            this.$message.error(res.message)
          }
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

      .add, .delete {
        margin: 0 10px 0 10px;
        height: 38px;
        width: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .back {
        margin: 0 10px 0 10px;
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .levelSelect {
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
