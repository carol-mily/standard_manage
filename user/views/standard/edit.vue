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
        v-if="operateType==='editTable'"
        :title="'编辑表'"
        :visible.sync="tableIsShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="asideTableLabel"
          :form="asideTableData"
          :inline="true"
          :rules="tableRules"
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
          :rules="tableRules"
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
          :rules="itemRules"
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
          :rules="itemRules"
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
            @checkStan="checkStanOpt"></info-card>
      </div>
      <div class="r-content" style="height: 100%">
        <!--        <div class="img">-->
        <!--          <img class="download" :src="downloadImg" style="width: 18px; height: 18px"/>-->
        <!--          <img class="edit" :src="editImg" style="width: 18px; height: 18px"/>-->
        <!--        </div>-->
        <el-button class="up" v-if="this.$store.state.standard.stanPage==='myJoin'||this.$store.state.standard.stanPage==='myManage'" type="primary" icon="el-icon-upload2" plain @click="upload"></el-button>
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
import Level from "../../util/level";
import Text from "../../util/text";

export default {
  name: "edit",
  components: {InfoCard,CommonAside,CommonTable,CommonForm},
  data() {
    let time = new Date();
    let year = time.getFullYear();
    let month = (time.getMonth()+1).toString().padStart(2,'0');
    let day = time.getDate().toString().padStart(2,'0');
    let today = year+'-'+month+'-'+day;
    return {
      downloadImg: require('@/assets/icon/download.png'),
      editImg: require('@/assets/icon/edit.png'),
      upImg:require('@/assets/icon/up.png'),
      eyeImg:require('@/assets/icon/eye.png'),
      operateType: 'checkStan',
      today:today,
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
          model: 'mname',
          label: "负责人",
          type: "input",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'editorsName',
          label: "编写者",
          type: "input",
          style: "width:200px;",
          disabled:true
        },
        {
          model: 'levelList',
          label: '分级',
          type: 'cascader',
          style: "width:200px;",
          options: this.$store.state.level.level,
          disabled:true
        },
        {
          model: 'creday',
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
      asideStanData: {},
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
          model: 'creday',
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
        creday: '',
        description: ''
      },
      tableRules: {
        name:[
          {
            required: true, //必填
            message: "请输入名称", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            min:1,
            max:20,
            message:"名称长度应在20个字符以内",
            trigger: "blur"
          },
        ],
        ename:[
          {
            required: true, //必填
            message: "请输入英文名称", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            min:1,
            max:20,
            message:"英文名称长度应在20个字符以内",
            trigger: "blur"
          },
        ],
        description:{
          max:200,
          message:"描述长度应在200个字符以内",
          trigger: "blur"
        }
      },
      cardStanData: {
        id: '',
        name: '',
        ename: '',
        mname: '',
        editorsName: '',
        creday: '',
        levelName:'',
        levelList: '',
        description: '',
      },
      tableList:[],
      tableId:null,
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
          prop: "typeName",
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
          prop: "decim",
          //列的名称
          label: "小数位数",
          width: "100px"
        },
        {
          //数据中读取的字段的名称
          prop: "cstraint",
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
          model: 'typeList',
          label: '字段类型',
          type: 'cascader',
          style: "width:200px;",
          options: this.$store.state.typeList.typeList
        },
        {
          model: 'length',
          label: "字段长度",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'decim',
          label: "小数位数",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'cstraint',
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
      itemRules: {
        name:[
          {
            required: true, //必填
            message: "请输入字段名称", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            min:1,
            max:20,
            message:"名字段称长度应在20个字符以内",
            trigger: "blur"
          },
        ],
        code:[
          {
            required: true, //必填
            message: "请输入字段编码", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            min:1,
            max:20,
            message:"字段编码长度应在20个字符以内",
            trigger: "blur"
          },
        ],
        length:[
          {
            required: true, //必填
            message: "请输入字段长度", //校验不通过的提示信息
            trigger: "blur"  //触法方式
          },
          {
            type: "number",
            transform: (value) => Number(value),
            message: '字段长度应为数字',
            trigger: "blur"  //触法方式
          }
        ],
        decim:{
          pattern: /^[0-9]*$/,
          transform: (value) => Number(value),
          message: '小数位数应为数字',
          trigger: "blur"  //触法方式
        },
        cstraint:{
          max:20,
          message:"约束条件长度应在20个字符以内",
          trigger: "blur"
        },
        remarks:{
          max:200,
          message:"描述长度应在200个字符以内",
          trigger: "blur"
        }
      },
      itemNum:null,
      itemId:null,
      validInfo:{ //检验form内信息是否通过校验
        value:0,
        message:''
      },
      selection:[],
      pageName:'edit',
    }
  },

  methods: {
    //刷新页面
    load(){
      this.request.get("/standard/findById/"+this.$store.state.standard.stanId).then(res=>{
        console.log("function：/standard/findById")
        console.log(res,'res')
        if(res.code==='200'){
          this.cardStanData=res.data
          this.cardStanData.levelName = Level.getLevelName(this.$store.state.level.level, this.cardStanData.levelList)
          if (this.cardStanData.state === 2) {
            this.cardStanData.stateName = '已发布'
          } else if (this.cardStanData.state === 1) {
            this.cardStanData.stateName = '审核中'
          } else {
            this.cardStanData.stateName = '编写中'
          }
          this.cardStanData.editorsName=Text.textFromArray(this.cardStanData.editors)
          this.loadTable()
        }else{
          this.$message.error(res.message)
        }
      })
    },

    //刷新tableList
    loadTable(){
      this.request.get("/table/findByStanId/"+this.$store.state.standard.stanId).then(res=>{
        console.log("function：/table/findByStanId")
        console.log(res,'res')
        if(res.code==='200'){
          this.tableList=res.data
          if(this.tableList.length!==0){ //当表不为空时
            this.tableId=this.tableId?this.tableId:this.tableList[0].id //tableId若不存在设置初始tableId
            this.loadItem()
          }
        }else{
          this.$message.error(res.message)
        }
      })
    },

    //刷新table的的item
    loadItem(){
      this.request.get("/item/findByTableId/"+this.tableId).then(res=>{
        console.log("function：/item/findByTableId")
        console.log(res,'res')
        if(res.code==='200'){
          this.itemData=res.data
        }else{
          this.$message.error(res.message)
        }
      })
    },

    //换表
    changeTable(item){
      this.tableId= item.id
      this.loadItem()
    },

    //查看数据标准详情
    checkStanOpt() {
      this.operateType='checkStan'
      this.stanIsShow=true
      //表内数据显示为当前行内的数据，回写
      this.asideStanData = this.cardStanData
    },

    //编辑表
    editTableOpt(item) {
      this.operateType='editTable'
      this.tableIsShow=true
      //表内数据显示为当前行内的数据，回写
      let table=this.tableList.filter(table=>table.id===item.id)[0]
      this.asideTableData = Object.assign({}, table)  //Object对象的assign方法解决传引用赋值
      //换表，可以尝试看看有方法调用之前的函数吗
      this.tableId= item.id
      this.changeTable(item)
    },

    //添加表的操作
    addTableOpt(){
      console.log('添加表')
      this.operateType='addTable'
      this.tableIsShow=true
      this.asideTableData = {
        name:'',
        ename:'',
        creday: this.today,
        description: '',
        stanId:this.$store.state.standard.stanId  //添加原本没有的stanId
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
        this.request.delete("/table/"+this.tableId).then(res=>{
          console.log("function：/table/delete")
          console.log(res,'res')
          if(res.code==='200'){
            this.$message.success(res.message)
            this.tableIsShow=false
            this.tableId=null
            this.loadTable()
          }else{
            this.$message.error(res.message)
          }
        })
      })
    },

    //添加表
    addTable(){
      this.$refs.form.isValid(this.validInfo) //调用form中的函数
      if (this.validInfo.value === 0) { //校验不通过
        this.$message.warning(this.validInfo.message)
      } else {
        this.request.post("/table/add",this.asideTableData).then(res=>{
          console.log("function：/table/add")
          console.log(res,'res')
          if(res.code==='200'){
            this.$message.success(res.message)
            this.tableIsShow=false
            this.tableId=null
            this.loadTable()
          }else{
            this.$message.error(res.message)
          }
        })
      }
    },

    //编辑表
    editTable(){
      this.$refs.form.isValid(this.validInfo) //调用form中的函数
      if (this.validInfo.value === 0) { //校验不通过
        this.$message.warning(this.validInfo.message)
      } else {
        this.request.post("/table/update",this.asideTableData).then(res=>{
          console.log("function：/table/update")
          console.log(res,'res')
          if(res.code==='200'){
            this.$message.success(res.message)
            this.tableIsShow=false
            this.loadTable()
          }else{
            this.$message.error(res.message)
          }
        })
      }
    },

    //编辑字段
    editItemOpt(item) {
      console.log('编辑字段'+item.id)
      this.itemId=item.id
      this.operateType='editItem'
      this.itemIsShow=true
      //表内数据显示为当前行内的数据，回写
      let itemData=this.itemData.filter(i=>i.id===item.id)[0]
      this.optItemData = Object.assign({}, itemData)  //Object对象的assign方法解决传引用赋值
      this.optItemData.typeList=[this.optItemData.typeId]


    },

    //添加字段
    addItemOpt(item) {
      console.log('添加字段'+item.id)
      this.operateType='addItem'
      this.itemIsShow=true
      //表内数据显示为当前行内的数据，回写
      this.optItemData= {
        typeList:[1],
        decim:null
      }
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
        this.request.delete("/item/"+item.id).then(res=>{
          console.log("function：/item/delete")
          console.log(res,'res')
          if(res.code==='200'){
            this.$message.success(res.message)
            this.loadItem()
          }else{
            this.$message.error(res.message)
          }
        })
      })
    },

    //删除多个字段
    deleteItem(){
      //通知，这里使用的是element-ui中MessageBox的confirm方法，因此需要在main.js中进行绑定
      this.$confirm("此操作将永久删除该信息，是否继续？","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        this.request.post("/item/delete/batch", this.selection).then(res => {
          console.log('function:/item/delete/batch')
          console.log(res, 'res')
          if (res.code === '200') {
            this.$message.success(res.message)
            //更新列表
            this.loadItem()
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },

    editItem(){
      this.$refs.form.isValid(this.validInfo) //调用form中的函数
      if (this.validInfo.value === 0) { //校验不通过
        this.$message.warning(this.validInfo.message)
      } else {
        //处理所传数据
        this.optItemData.typeId=this.optItemData.typeList[0]
        let type=this.$store.state.typeList.typeList.filter(item=>item.id===this.optItemData.typeId)[0]
        let typeName=type.name
        let minLen=type.minLen
        let maxLen=type.maxLen
        if(this.optItemData.length<minLen||this.optItemData.length>maxLen){ //判断类型长度
          if(minLen===maxLen){
            this.$message.warning(typeName+"类型长度应为"+minLen)
          }else{
            this.$message.warning(typeName+"类型长度应为"+minLen+'-'+maxLen)
          }
        }else{
          this.request.post("/item/update",this.optItemData).then(res=>{
            console.log("function：/item/update")
            console.log(res,'res')
            if(res.code==='200'){
              this.$message.success(res.message)
              this.itemIsShow=false
              this.loadItem()
            }else{
              this.$message.error(res.message)
            }
          })
        }
      }
    },

    //添加字段
    addItem(){
      if(this.tableId===null){
        this.$message.warning("数据标准不存在表")
      }else{
        this.$refs.form.isValid(this.validInfo) //调用form中的函数
        if (this.validInfo.value === 0) { //校验不通过
          this.$message.warning(this.validInfo.message)
        } else {
          //处理所传数据
          this.optItemData.tableId=this.tableId
          this.optItemData.typeId=this.optItemData.typeList[0]
          let type=this.$store.state.typeList.typeList.filter(item=>item.id===this.optItemData.typeId)[0]
          let typeName=type.name
          let minLen=type.minLen
          let maxLen=type.maxLen
          if(this.optItemData.length<minLen||this.optItemData.length>maxLen){ //判断类型长度
            if(minLen===maxLen){
              this.$message.warning(typeName+"类型长度应为"+minLen)
            }else{
              this.$message.warning(typeName+"类型长度应为"+minLen+'-'+maxLen)
            }
          }else{
            this.request.post("/item/add",this.optItemData).then(res=>{
              console.log("function：/item/add")
              console.log(res,'res')
              if(res.code==='200'){
                this.$message.success(res.message)
                this.itemIsShow=false
                this.loadItem()
              }else{
                this.$message.error(res.message)
              }
            })
          }
        }
      }
    },

    //提交审核
    upload(){
      this.$confirm("此操作将提交该数据标准并发送信息给负责人，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.request.post("/standard//changeState", {
          stanId: this.$store.state.standard.stanId,
          state: 1
        }).then(res => {
          console.log("function:/standard//changeState")
          console.log(res, 'res')
          if (res.code === '200') {
            this.request.post("/message/sendProMsg", {
              title: '项目 ' + this.cardStanData.name+ ' 审核',
              type: 1, //0表示系统消息,1代表项目消息
              subday: this.today,
              sphone: this.$store.state.user.user.phone,
              text: '项目名称：' + this.cardStanData.name + '\n提交人：' + this.$store.state.user.user.name + '(手机号' + this.$store.state.user.user.phone + ')\n项目已提交审核，请审核！',
              stanId: this.cardStanData.id,
              proType: 3,//项目消息类型：1添加，2转让，3申请，4审核，5删除
              uphones: [this.cardStanData.mphone]
            }).then(res => {
              console.log("function:/message/sendProMsg")
              console.log(res, 'res')
              if (res.code === '200') {
                this.$message.success(res.message)
                //更新列表
                this.isShow = false
                this.$router.push({name: this.$store.state.standard.stanPage}) //返回至我的参与
              } else {
                this.$message.error(res.message)
              }
            })
          }
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

  created() {
    this.load()
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