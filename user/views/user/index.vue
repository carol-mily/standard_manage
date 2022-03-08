<template>
  <div class="manage" style="height: 100%" >
    <el-dialog
        :title="operateType==='add' ? '新增用户' : '更新用户'"
        :visible.sync="isShow">
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
    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <common-form
          :form-label="formLabel"
          :form="searchForm"
          :inline="true"
          ref="form">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
    <common-table
        :table-data="tableData"
        :table-label="tableLabel"
        :config="config"
        @changePage="getList"
        @edit="editUser"
        @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable";
import {getUser} from "../../api/data"

export default {
  name: "index",

  components: {
    CommonForm,
    CommonTable
  },

  data() {
    return {
      operateType: 'add',
      isShow: false,
      operateFormLabel: [
        {
          model: 'name',
          label: "姓名",
          type: "input",
        },
        {
          model: 'age',
          label: "年龄",
          type: "input",
        }, {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      formLabel: [
        {
          model: "keyword",
          label: '',
          type: 'input'
        }
      ],
      searchForm: {
        keyword: ''
      },
      tableData: [],
      tableLabel: [
        {
          //数据中读取的字段的名称
          prop: "name",
          //列的名称
          label: "姓名"
        },
        {
          //数据中读取的字段的名称
          prop: "age",
          //列的名称
          label: "年龄"
        },
        {
          //数据中读取的字段的名称
          prop: "sexLabel",
          //列的名称
          label: "性别"
        },
        {
          //数据中读取的字段的名称
          prop: "birth",
          //列的名称
          label: "出生日期",
          width: 200
        },
        {
          //数据中读取的字段的名称
          prop: "addr",
          //列的名称
          label: "地址",
          width: 320
        }
      ],
      //默认页数值
      config: {
        pager: 1,
        total: 30
      }
    }
  },

  methods: {
    confirm() {
      if (this.operateType === 'edit') {  //编辑
        this.$http.post('/user/edit', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          //更新列表
          this.getList()
        })
      } else {  //新增
        this.$http.post('/user/add', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          //更新列表
          this.getList()
        })
      }
    },

    addUser() {
      this.isShow = true
      this.operateType = 'add'
      //数据初始化
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      }
    },

    getList(name = '') {
      this.config.loading = true
      name ? (this.config.pager = 1) : ''
      getUser({
        page: this.config.pager,
        name
      }).then(({data:res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res,'res')
        this.tableData=res.list.map(item => {
          //对sexLabel字段进行映射
          item.sexLabel = item.sex === 0 ? "女" : "男"
          return item
        })
        this.config.total=res.count
        this.config.loading=false
      });
    },

    editUser(row) {
      this.operateType='edit'
      this.isShow=true
      //表内数据显示为当前行内的数据，回写
      this.operateForm = row
    },

    delUser(row) {
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        const id= row.id
        this.$http.post("user/del",{
          params:[id]
        }).then(()=>{
          //同$confirm类似
          this.$message({
            type:"success",
            message:"删除成功！"
          })
          //更新列表
          this.getList()
        })
      })
    }
  },


  //生命周期
  created(){
    //在页面加载时就需要调用
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>