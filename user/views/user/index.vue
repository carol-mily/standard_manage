<template>
  <div class="manage" style="height: 100%" >
    <el-dialog
        :title="operateType==='add' ? '新增用户' : '更新用户'"
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
        :has-pager=true
        :page-name="pageName"
        @changePage="getList"
        @editUser="editUser"
        @deleteUser="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable";
import {createUser,updateUser,deleteUser,getUser} from "../../api/data"

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
          label: "用户名",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'phone',
          label: "手机号",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          style: "width:200px;",
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
          label: "出生日期",
          type: "date",
          style: "width:200px;",
        },
        {
          model: 'email',
          label: "邮箱号",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'addr',
          label: "地址",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'status',
          label: "身份",
          type: "input",
          style: "width:200px;",
        },
      ],
      operateForm: {},
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
          prop: "phone",
          //列的名称
          label: "手机号码"
        },
        {
          //数据中读取的字段的名称
          prop: "status",
          //列的名称
          label: "身份"
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
          width: 200
        },
        {
          //数据中读取的字段的名称
          prop: "sex",
          //列的名称
          label: "性别",
          width: 100
        },
        {
          //数据中读取的字段的名称
          prop: "email",
          //列的名称
          label: "邮箱",
          width: 300
        }
      ],
      //默认页数值
      config: {
        pager: 1,
        total: 30
      },
      pageName:'user'
    }
  },

  methods: {
    confirm() {
      if (this.operateType === 'edit') {  //编辑
        updateUser(this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          //更新列表
          this.getList()
        })
      } else {  //新增
        createUser(this.operateForm).then(res => {
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
        deleteUser({
          id:id
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