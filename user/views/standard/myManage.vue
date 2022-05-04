<template>
  <div class="manage">
    <el-dialog
        class="cardDialog"
        :title="'添加数据标准'"
        :visible.sync="stanIsShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="stanLabel"
          :form="stanData"
          :inline="true"
          :rules="rules"
          ref="form"></common-form>
      <div slot="footer" class="stanDialog_footer" style="text-align: center">
        <el-button @click="stanIsShow=false">取消</el-button>
        <el-button type="primary" @click="add">确认</el-button>
      </div>
    </el-dialog>

    <el-container class="join">
      <el-header class="search">
        <div class="l-content">
          <common-form
              class="searchForm"
              :form-label="formLabel"
              :form="searchForm"
              :inline="true"
              ref="form">
            <el-button type="primary"
                       plain
                       @click="load"
                       style="height: 38px">搜索</el-button>
          </common-form>
        </div>

        <div class="r-content">
          <el-button class="add" type="primary" icon="el-icon-plus" plain @click="addStanOpt"></el-button>
        </div>
      </el-header>
      <el-main class="show">
        <common-card
            :card-data="cardData"
            :page-name="pageName"
            @check="checkSta"
            @edit="editSta"
            @manage="manageSta"></common-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import CommonCard from "@/components/CommonCard";
import Level from "../../util/level";

export default {
  name: "myManage",

  components: {
    CommonForm,
    CommonCard
  },

  data() {
    let time = new Date();
    let year = time.getFullYear();
    let month = (time.getMonth()+1).toString().padStart(2,'0');
    let day = time.getDate().toString().padStart(2,'0');
    let today = year+'-'+month+'-'+day;
    return {
      userImg: require('../../src/assets/images/logo.png'),
      pageName: 'myManage',
      today:today,
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
      cardData: [],
      stanLabel: [
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
          model: 'mname',
          label: "负责人",
          type: "input",
          style: "width:200px;",
          disabled:true,
        },
        // {
        //   model: 'editors',
        //   label: "编写者",
        //   type: "input",
        //   style: "width:200px;",
        // },
        {
          model: 'level',
          label: '分级',
          type: 'cascader',
          style: "width:200px;",
          options: this.$store.state.level.level
        },
        {
          model: 'creday',
          label: "创建日期",
          type: "date",
          style: "width:200px;",
          disabled:true,
        },
        {
          model: 'description',
          label: "简述",
          type: "textarea",
          style: "width:510px;",
        },

      ],
      stanData: {
        name:'',
        ename: '',
        manager: this.$store.state.user.user.name,
        managerPhone:this.$store.state.user.user.phone, //方便查找手机号
        editors: '',
        level:'',
        creDay:'',
        description: '',
      },
      stanIsShow: false,
      rules: {
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
      validInfo:{ //检验form内信息是否通过校验
        value:0,
        message:''
      },
    }
  },

  methods: {
    load(){
      this.request.get("/standard/findByMphone",{params:{
          mphone:this.$store.state.user.user.phone,
          name:this.searchForm.keyword
        }
      }).then(res=>{
        console.log("function：/standard/findByMphone")
        console.log(res,'res')
        if(res.code==='200'){
          this.cardData=res.data.map(item=>{
            if(item.state===0){
              item.stateName='编写中'
            }else if(item.state===1){
              item.stateName='审核中'
            }else if(item.state===2){
              item.stateName='已发布'
            }
            return item
          })
        }else{
          this.$message.error(res.message)
        }
      })
    },

    checkSta(item) {
      console.log('Join:check index:' + item.id)
      let pageName = this.pageName
      this.$store.commit('setStanId', {stanId: item.id, stanPage: pageName})
      console.log('添加 stanId:' + this.$store.state.standard.stanId)
      this.$router.push({name: 'check'})
    },

    editSta(item) {
      console.log('Join:edit index:' + item.id)
      if(item.state===0){
        let pageName=this.pageName
        this.$store.commit('setStanId',{stanId:item.id,stanPage:pageName})
        console.log('添加 stanId:'+this.$store.state.standard.stanId)
        this.$router.push({name: 'edit'})
      }else {
        this.$confirm("该数据标准当前处于" + item.stateName + "状态，无法编写！", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.load()
        })
      }
    },

    manageSta(item) {
      console.log('Join:manage index:' + item.id)
      let pageName = this.pageName
      this.$store.commit('setStanId', {stanId: item.id, stanPage: pageName})
      console.log('添加 stanId:' + this.$store.state.standard.stanId)
      this.$router.push({name: 'umanage'})
    },

    //添加数据标准详情
    addStanOpt() {
      console.log('添加数据标准')
      this.stanIsShow = true
      let fistLevel=Level.getFirstLevel(this.$store.state.level.level)
      console.log(fistLevel)
      //表内数据显示为当前行内的数据，回写
      this.stanData = {
        name:'',
        ename: '',
        mname: this.$store.state.user.user.name,
        mphone: this.$store.state.user.user.phone,
        editors: '',
        level:[fistLevel],
        creday: this.today,
        description: '',
      }
    },

    //添加数据标准
    add() {
      this.$refs.form.isValid(this.validInfo) //调用form中的函数
      if (this.validInfo.value === 0) { //校验不通过
        this.$message.warning(this.validInfo.message)
      } else {
        this.request.post("/standard/add",{
          name: this.stanData.name,
          ename: this.stanData.ename,
          mphone: this.$store.state.user.user.phone, //直接添加该用户为负责人
          creday: this.stanData.creday,
          state:0,
          levelId:this.stanData.level[this.stanData.level.length-1],
          description: this.stanData.description
        }).then(res=>{
          console.log("function:/standard/add")
          console.log(res,'res')
          if(res.code==='200'){
            this.$message.success(res.message)
            this.stanIsShow = false
            this.load()
          }else{
            this.$message.error(res.message)
          }
        })
      }
    },
  },

  mounted() {},

  //生命周期
  created() {
    //在页面加载时就需要调用
    this.load()
    // this.$store.commit('setStanId', {stanId: 0, stanPage: this.pageName})
  }
}
</script>

<style lang="less" scoped>
.manage {
  background-color: white;
  min-height: 100% !important;
  width: 100%;

  .search {
    padding: 0;
    position: absolute;
    background-color: white;
    width: 97%;
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;

    .searchForm {
      justify-content: center;
      padding: 10px 0 0 0;
      margin: 10px 0 0 430px;
      display: flex;
      height: 100%;
      width: auto;
    }

    .add {
      margin: 10px 40px 10px 0;
      height: 35px;
      width: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .show {
    margin-top: 70px;
  }
}

</style>