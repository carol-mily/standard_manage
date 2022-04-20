<template>
  <el-container class="edit">
    <el-dialog
        class="stanDialog"
        v-if="operateType==='checkStan'"
        :title="'标准详情'"
        :visible.sync="stanIsShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="asideStanLabel"
          :form="asideStanData"
          :inline="true"
          ref="form"></common-form>
      <div slot="footer" class="stanDialog_footer">
        <el-button type="primary" @click="stanIsShow=false">确认</el-button>
<!--        <el-button type="primary" @click="editStan">确认</el-button>-->
      </div>
    </el-dialog>

    <el-dialog
        class="editTableDialog"
        v-if="operateType==='checkTable'"
        :title="'编辑表'"
        :visible.sync="tableIsShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="asideTableLabel"
          :form="asideTableData"
          :inline="true"
          ref="form"></common-form>
      <div slot="footer" class="tableDialog_footer">
        <el-button type="danger" @click="deleteTable">删除</el-button>
        <el-button type="primary" @click="editTable">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog
        class="addTableDialog"
        v-if="operateType==='addTable'"
        :title="'添加表'"
        :visible.sync="tableIsShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="asideTableLabel"
          :form="asideTableData"
          :inline="true"
          ref="form"></common-form>
      <div slot="footer" class="tableDialog_footer">
        <el-button @click="tableIsShow=false">取消</el-button>
        <el-button type="primary" @click="addTable">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
        class="editItemDialog"
        v-if="operateType==='editItem'"
        :title="'编辑字段'"
        :visible.sync="itemIsShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="optItemLabel"
          :form="optItemData"
          :inline="true"
          ref="form"></common-form>
      <div slot="footer" class="itemDialog_footer">
        <el-button @click="itemIsShow=false">取消</el-button>
        <el-button type="primary" @click="editItem">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog
        class="addItemDialog"
        v-if="operateType==='addItem'"
        :title="'添加字段'"
        :visible.sync="itemIsShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="optItemLabel"
          :form="optItemData"
          :inline="true"
          ref="form"></common-form>
      <div slot="footer" class="itemDialog_footer">
        <el-button @click="itemIsShow=false">取消</el-button>
        <el-button type="primary" @click="addItem">确认</el-button>
      </div>
    </el-dialog>

    <el-header class="header" style="height: 100px;" >
      <div class="l-content" style="height: 100%">
        <span>{{ cardStanData.name }}</span>
      </div>
      <div class="c-content" style="height: 100%">
        <info-card
            :card-data="cardStanData"
            @checkStan="editStanOpt"></info-card>
      </div>
      <div class="r-content" style="height: 100%">
        <!--        <div class="img">-->
        <!--          <img class="download" :src="downloadImg" style="width: 18px; height: 18px"/>-->
        <!--          <img class="edit" :src="editImg" style="width: 18px; height: 18px"/>-->
        <!--        </div>-->
        <el-button class="up" v-if="this.$store.state.standard.stanPage==='myJoin'" type="primary" icon="el-icon-upload2" plain @click="upload"></el-button>
        <el-button class="eye" type="primary" icon="el-icon-view" plain @click="checkStan"></el-button>
        <el-button class="manage" v-if="this.$store.state.standard.stanPage==='myManage'" type="primary" icon="el-icon-user" plain @click="manageStan"></el-button>
      </div>
    </el-header>
    <el-container class="mcontainer">
      <div class="aside">
        <common-aside
            :aside-name="'edit'"
            :menu="tableList"
            @chooseTable="changeTable"
            @checkTable="editTableOpt"
            @addTable="addTableOpt"></common-aside>
      </div>
      <div class="main">
        <div class="option">
          <el-button class='deleteItem'
                     type="primary"
                     plain
                     @click="deleteItem"
          >删除</el-button>
          <el-button class='addItem'
                     type="primary"
                     plain @click="addItemOpt"
          >添加</el-button>
        </div>
        <div class="table">
          <common-table
              :table-data="itemData"
              :table-label="itemLabel"
              :page-name="pageName"
              :has-pager=false
              @editItem="editItemOpt"
              @deleteItem="deleteItemOpt"
              @selectionChange="selectionChange"
              style="height: 100%;width:100%"
          ></common-table>
        </div>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import InfoCard from "@/components/InfoCard";
import CommonAside from "@/components/CommonAside";
import CommonTable from "@/components/CommonTable";
import CommonForm from "@/components/CommonForm";
import {
  addItem,
  editItem,
  editStan,
  editTable,
  addTable,
  deleteTable,
  deleteItem,
  getStanInfo,
  getStanItem,
  editStanState, sendMessage
} from "../../api/data";
import Level from "../../util/level";

export default {
  name: "edit",
  components: {InfoCard,CommonAside,CommonTable,CommonForm},
  data() {
    return {
      downloadImg: require('@/assets/icon/download.png'),
      editImg: require('@/assets/icon/edit.png'),
      upImg:require('@/assets/icon/up.png'),
      eyeImg:require('@/assets/icon/eye.png'),
      operateType: 'checkStan',
      stanIsShow: false,
      tableIsShow: false,
      itemIsShow:false,
      asideStanLabel: [
        {
          model: 'name',
          label: "名称",
          type: "input",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'ename',
          label: "英文名称",
          type: "input",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'managerName',
          label: "负责人",
          type: "input",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'editors',
          label: "编写者",
          type: "input",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'level',
          label: '分级',
          type: 'cascader',
          style: "width:200px;",
          options: this.$store.state.level.level,
          disabled:true
        },
        {
          model: 'creDay',
          label: "创建日期",
          type: "date",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'description',
          label: "简述",
          type: "textarea",
          style: "width:510px;",
          disabled:true
        },

      ],
      asideStanData: {
      },
      asideTableLabel: [
        {
          model: 'name',
          label: "名称",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'ename',
          label: "英文名称",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'creDay',
          label: "创建日期",
          type: "date",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'description',
          label: "简述",
          type: "textarea",
          style: "width:510px;",
        },
      ],
      asideTableData: {
        name: '',
        ename: '',
        level: '',
        creDay: '',
        description: ''
      },
      cardStanData: {
        id: '',
        name: '',
        ename: '',
        managerName: '',
        editors: '',
        creDay: '',
        levelName:'',
        level: '',
        description: '',
      },
      tableList:[],
      tableId:0,
      itemData: [],
      itemLabel: [
        {
          //列的名称
          label: "序号",
          width:"50px"
        },
        {
          //数据中读取的字段的名称
          prop: "name",
          //列的名称
          label: "字段名称",
          width:"200px"
        },
        {
          //数据中读取的字段的名称
          prop: "code",
          //列的名称
          label: "字段代码",
          width:"100px"
        },
        {
          //数据中读取的字段的名称
          prop: "type",
          //列的名称
          label: "字段类型",
          width: "100px"
        },
        {
          //数据中读取的字段的名称
          prop: "length",
          //列的名称
          label: "字段长度",
          width: "100px"
        },
        {
          //数据中读取的字段的名称
          prop: "decimal",
          //列的名称
          label: "小数位数",
          width: "100px"
        },
        {
          //数据中读取的字段的名称
          prop: "constraint",
          //列的名称
          label: "约束条件",
          width: "100px"
        },
        {
          //数据中读取的字段的名称
          prop: "remarks",
          //列的名称
          label: "备注",
          width: "300px"
        },
      ],
      optItemData: [],
      optItemLabel: [
        {
          model: 'name',
          label: "字段名称",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'code',
          label: "字段编码",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'type',
          label: "字段类型",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'length',
          label: "字段长度",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'decimal',
          label: "小数位数",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'constraint',
          label: "约束条件",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'remarks',
          label: "备注",
          type: "textarea",
          style: "width:510px;",
        },
      ],
      itemNum:0,
      itemId:0,
      selection:[],
      pageName:'edit',
    }
  },

  methods: {
    //得到完整数据结构信息
    getCardInfo() {
      getStanInfo({
        stanId: this.$store.state.standard.stanId,
        pageName: this.$store.state.standard.stanPage
      }).then(({data: res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res, 'res')
        let editor = ''
        for (let i = 0; i < res.data.list.editors.length; i++) {
          editor = editor + res.data.list.editors[i].name + ' '
        }
        //设置全局变量
        // this.$store.commit('clearStandard')
        // this.$store.commit('setStandard',res.list[0])
        // this.cardData=this.asyncStan
        this.cardStanData = res.data.list
        this.cardStanData.managerName=res.data.list.manager.name
        this.cardStanData.editors = editor
        this.cardStanData.levelName=Level.getLevelName(this.$store.state.level.level,res.data.list.level1,res.data.list.level2,res.data.list.level3)
        this.cardStanData.level=Level.getLevelList(this.$store.state.level.level,res.data.list.level1,res.data.list.level2,res.data.list.level3)
        this.tableList=res.data.list.table
        this.itemData=res.data.list.table[0].item
      });
    },

    //换表
    changeTable(item){
      this.tableId=item.id
      getStanItem({
        stanId:this.$store.state.standard.stanId,
        tableId: item.id,
        pageName: this.$store.state.standard.stanPage,
      }).then(({data: res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res, 'res')
        this.itemData=res.data.stanItem
      });
    },

    //编辑数据标准详情
    editStanOpt() {
      console.log('查看数据标准详情')
      this.operateType='checkStan'
      this.stanIsShow=true
      //表内数据显示为当前行内的数据，回写
      this.asideStanData = this.cardStanData
    },

    //编辑数据标准
    editStan(){
      editStan({
        stanId:this.$store.state.standard.stanId,
        pageName: this.$store.state.standard.stanPage,
        name:this.cardStanData.name,
        ename:this.cardStanData.ename,
        manager:this.cardStanData.managerName,
        editors:this.cardStanData.editors,
        creDay:this.cardStanData.creDay,
        level:this.cardStanData.level,
        description:this.cardStanData.description
      }).then(()=>{
        //同$confirm类似
        this.$message({
          type:"success",
          message:"修改成功！"
        })
        //更新列表
        this.stanIsShow=false
        this.getCardInfo()
      })
    },

    //编辑表
    editTableOpt(item) {
      console.log('查看表的详情'+item)
      this.operateType='checkTable'
      this.tableIsShow=true
      //表内数据显示为当前行内的数据，回写
      this.asideTableData = this.tableList[item.id]
      console.log('表的信息：'+this.asideTableData)
      //换表，可以尝试看看有方法调用之前的函数吗
      this.tableId= item.id
      getStanItem({
        stanId:this.$store.state.standard.stanId,
        tableId: item.id,
        pageName: this.$store.state.standard.stanPage,
      }).then(({data: res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res, 'res')
        this.itemData=res.stanItem
      });
    },

    //添加表的操作
    addTableOpt(){
      console.log('添加表')
      let time = new Date();
      let year = time.getFullYear();
      let month = (time.getMonth()+1).toString().padStart(2,'0');
      let day = time.getDate().toString().padStart(2,'0');
      let creDay = year+'-'+month+'-'+day;
      this.operateType='addTable'
      this.tableIsShow=true
      this.asideTableData = {
        name:'',
        ename:'',
        creDay: creDay,
        description: ''
      }
    },

    //删除表
    deleteTable(){
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        deleteTable({
          stanId:this.$store.state.standard.stanId,
          tableId: this.tableId,
          pageName: this.$store.state.standard.stanPage,
        }).then(()=>{
          //同$confirm类似
          this.$message({
            type:"success",
            message:"删除成功！"
          })
          this.tableIsShow=false
          //更新列表
          this.getCardInfo()
        })
      })
    },

    //添加表
    addTable(){
      addTable({
        stanId:this.$store.state.standard.stanId,
        pageName: this.$store.state.standard.stanPage,
        name:this.asideTableData.name,
        ename:this.asideTableData.ename,
        editors:this.asideTableData.editors,
        creDay:this.asideTableData.creDay,
        description:this.asideTableData.description
      }).then(()=>{
        //同$confirm类似
        this.$message({
          type:"success",
          message:"添加成功！"
        })
        //更新列表
        this.tableIsShow=false
        this.getCardInfo()
      })
    },

    //编辑表
    editTable(){
      editTable({
        stanId:this.$store.state.standard.stanId,
        tableId:this.tableId,
        pageName: this.$store.state.standard.stanPage,
        name:this.asideTableData.name,
        ename:this.asideTableData.ename,
        editors:this.asideTableData.editors,
        creDay:this.asideTableData.creDay,
        description:this.asideTableData.description
      }).then(()=>{
        //同$confirm类似
        this.$message({
          type:"success",
          message:"修改成功！"
        })
        //更新列表
        this.tableIsShow=false
        this.getCardInfo()
      })
    },

    //编辑字段
    editItemOpt(item) {
      console.log('编辑字段'+item.id)
      this.itemId=item.id
      this.operateType='editItem'
      this.itemIsShow=true
      //表内数据显示为当前行内的数据，回写
      this.optItemData=this.itemData[item.id]
    },

    //添加字段
    addItemOpt(item) {
      console.log('添加字段'+item.id)
      this.operateType='addItem'
      this.itemIsShow=true
      //表内数据显示为当前行内的数据，回写
      this.optItemData= {}
    },

    //复选框里多选
    selectionChange(val){
      this.selection=[]
      for(let i=0;i<val.length;i++){
        this.selection.push(val[i].id)
      }
      console.log('复选框'+this.selection)
    },

    //表格中删除字段的操作
    deleteItemOpt(item){
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        const id= item.id
        deleteItem({
          stanId:this.$store.state.standard.stanId,
          tableId: this.tableId,
          pageName: this.$store.state.standard.stanPage,
          itemId:[id]
        }).then(()=>{
          //同$confirm类似
          this.$message({
            type:"success",
            message:"删除成功！"
          })
          //更新列表
          getStanItem({
            stanId:this.$store.state.standard.stanId,
            tableId: this.tableId,
            pageName: this.$store.state.standard.stanPage,
          }).then(({data: res}) => {
            //上面是使用es6的解构赋值为res
            console.log(res, 'res')
            this.itemData=res.stanItem
          });
        })
      })
    },

    //删除字段
    deleteItem(){
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        deleteItem({
          stanId:this.$store.state.standard.stanId,
          tableId: this.tableId,
          pageName: this.$store.state.standard.stanPage,
          itemId:this.selection
        }).then(()=>{
          //同$confirm类似
          this.$message({
            type:"success",
            message:"删除成功！"
          })
          //更新列表
          getStanItem({
            stanId:this.$store.state.standard.stanId,
            tableId: this.tableId,
            pageName: this.$store.state.standard.stanPage,
          }).then(({data: res}) => {
            //上面是使用es6的解构赋值为res
            console.log(res, 'res')
            this.itemData=res.stanItem
          });
        })
      })
    },

    editItem(){
      editItem({
        stanId:this.$store.state.standard.stanId,
        tableId:this.tableId,
        itemId:this.itemId,
        pageName: this.$store.state.standard.stanPage,
        name:this.optItemData.name,
        code:this.optItemData.code,
        type:this.optItemData.type,
        length:this.optItemData.length,
        decimal:this.optItemData.decimal,
        constraint:this.optItemData.constraint,
        remarks:this.optItemData.remarks,
      }).then(()=>{
        //同$confirm类似
        this.$message({
          type:"success",
          message:"修改成功！"
        })
        this.itemIsShow=false
        //更新列表
        getStanItem({
          stanId:this.$store.state.standard.stanId,
          tableId: this.tableId,
          pageName: this.$store.state.standard.stanPage,
        }).then(({data: res}) => {
          //上面是使用es6的解构赋值为res
          console.log(res, 'res')
          this.itemData=res.stanItem
        });
      })
    },

    //添加字段
    addItem(){
      addItem({
        stanId:this.$store.state.standard.stanId,
        tableId:this.tableId,
        pageName: this.$store.state.standard.stanPage,
        name:this.optItemData.name,
        code:this.optItemData.code,
        type:this.optItemData.type,
        length:this.optItemData.length,
        decimal:this.optItemData.decimal,
        constraint:this.optItemData.constraint,
        remarks:this.optItemData.remarks,
      }).then(()=>{
        //同$confirm类似
        this.$message({
          type:"success",
          message:"添加成功！"
        })
        this.itemIsShow=false
        //更新列表
        getStanItem({
          stanId:this.$store.state.standard.stanId,
          tableId: this.tableId,
          pageName: this.$store.state.standard.stanPage,
        }).then(({data: res}) => {
          //上面是使用es6的解构赋值为res
          console.log(res, 'res')
          this.itemData=res.stanItem
        });
      })
    },

    //提交审核
    upload(){
      this.$confirm("此操作将提交该数据标准并发送信息给负责人，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        editStanState({
          stanId: this.$store.state.standard.stanId,
          state: 1
        }).then(() => {
          sendMessage({
            title: '项目 ' + this.cardStanData.name+ ' 审核',
            type: 2, //0表示系统消息，1表示项目消息(需要确认的)，2表示项目消息(不需要确认的)
            senderPhone: this.$store.state.user.user.phone,
            receiverPhone: [this.cardStanData.manager.phone],
            subDay: this.subDay,
            text: '项目名称：' + this.cardStanData.name + '\n提交人：' + this.$store.state.user.user.name + '(手机号' + this.$store.state.user.user.phone + ')\n项目已提交审核，请审核！',
          }).then(() => {
            //同$confirm类似
            this.$message({
              type: "success",
              message: "已发送信息！"
            })
            this.$router.push({name: 'myJoin'}) //返回至我的参与
          })
        })
      })
    },

    //查看数据标准
    checkStan(){
      console.log('Join:edit -> check index:'+this.cardStanData.id)
      this.$router.push({name: 'check'})
    },

    //管理数据标准
    manageStan(){
      console.log('Join:edit -> manage index:'+this.cardStanData.id)
      this.$router.push({name: 'umanage'})
    },
  },

  computed: {
    //动态获取菜单
    asyncStan() {
      return this.$store.state.standard.standard
    }
  },

  //对store监听
  // watch:{
  //   '$store.state.standard.standId'(){
  //     alert('变化')
  //     this.getCardInfo()
  //   }
  // },

  created() {
    this.getCardInfo()
  }
}
</script>

<style scoped lang="less">
.edit {
  background-color: white;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;

  .stanDialog,.editTableDialog,.addTableDialog,.editItemDialog,.addItemDialog{
    display: flex;
    justify-content: center;
    align-items: center;
    .stanDialog_footer,.tableDialog_footer,.itemDialog_footer{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .header {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;

    .l-content {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 22px;
      }
    }

    .c-content {
      width: 70%;
      height: 100%;
      display: flex;
      align-items: center;

    }

    .r-content {
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      //.img{
      //  margin-right: 0;
      //  margin-bottom: 0;
      //  background-color: white;
      //  display: flex;
      //  justify-content: center;
      //  align-items: center;
      //  height: 20px;
      //  img{
      //    margin-right: 20px;
      //  }
      //}
      .up, .eye,.manage {
        margin: 10px 10px 10px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        width: 45px;
        height: 30px;
      }
    }
  }

  .mcontainer {
    padding: 0;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;

    .aside {
      width: 250px;
      text-align: center;
      height: 100%;
    }

    .main {
      padding: 0;
      margin: 0;
      width: calc(100% - 250px);
      height: 100%;
      .option{
        display: flex;
        align-items: center;
        width: 100%;
        height:30px;

        .deleteItem{
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 10px;
          width: 45px;
          height: 30px
        }

        .addItem{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 45px;
          height: 30px
        }
      }
      .table{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: calc(100% - 30px);
      }
    }
  }
}
</style>