<template>
  <div>
    <el-dialog
        class="cardDialog"
        :title="'添加数据标准'"
        :visible.sync="stanIsShow"
        :modal-append-to-body="false">
      <common-form
          :form-label="stanLabel"
          :form="stanData"
          :inline="true"
          ref="form"></common-form>
      <div slot="footer" class="stanDialog_footer">
        <el-button @click="stanIsShow=false">取消</el-button>
        <el-button type="primary" @click="addStan">确认</el-button>
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
                     @click="getCardInfo(searchForm.keyword)"
                     style="height: 38px"
          >搜索
          </el-button>
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
import {addStan,getCard} from '../../api/data'
import CommonForm from "@/components/CommonForm";
import CommonCard from "@/components/CommonCard";

export default {
  name: "myManage",

  components: {
    CommonForm,
    CommonCard
  },

  data() {
    return {
      userImg: require('../../src/assets/images/logo.png'),
      pageName:'manage',
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
          model: 'manager',
          label: "负责人",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'editors',
          label: "编写者",
          type: "input",
          style: "width:200px;",
        },
        {
          model: 'level',
          label: '分级',
          type: 'input',
          style: "width:200px;",
        },
        {
          model: 'creDay',
          label: "创建日期",
          type: "date",
          style: "width:200px;",
        },
        {
          model: 'description',
          label: "简述",
          type: "textarea",
          style: "width:510px;",
        },

      ],
      stanData: {
        name: '',
        ename: '',
        manager: '',
        editors: '',
        level: '',
        creDay: '',
        description: ''
      },
      stanIsShow:false,
    }
  },
  methods: {
    getCardInfo(name = '') {
      let pageName=this.pageName
      getCard({
        name,
        pageName
      }).then(({data:res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res,'res')
        this.cardData=res.list
      });
    },

    check(index, row) {
      console.log('用吗？')
      console.log(index, row);
    },
    edit(index, row) {
      console.log('用吗？')
      console.log(index, row);
    },
    manage(index, row) {
      console.log('用吗？')
      console.log(index, row);
    },

    checkSta(index){
      console.log('Join:check index:'+index)
      let pageName=this.pageName
      this.$store.commit('setStanId',{stanId:index,stanPage:pageName})
      console.log('添加 stanId:'+this.$store.state.standard.stanId)
      this.$router.push({name: 'check'})
    },

    editSta(index){
      console.log('Join:edit index:'+index)
      let pageName=this.pageName
      this.$store.commit('setStanId',{stanId:index,stanPage:pageName})
      console.log('添加 stanId:'+this.$store.state.standard.stanId)
      this.$router.push({name: 'edit'})
    },

    manageSta(index) {
      console.log('Join:manage index:'+index)
      let pageName=this.pageName
      this.$store.commit('setStanId',{stanId:index,stanPage:pageName})
      console.log('添加 stanId:'+this.$store.state.standard.stanId)
      this.$router.push({name: 'umanage'})
    },

    //添加数据标准详情
    addStanOpt() {
      console.log('添加数据标准')
      this.stanIsShow=true
      //表内数据显示为当前行内的数据，回写
      this.stanData = {}
    },

    //添加数据标准
    addStan(){
      addStan({
        pageName: this.$store.state.standard.stanPage,
        name:this.stanData.name,
        ename:this.stanData.ename,
        manager:this.stanData.manager,
        editors:this.stanData.editors,
        creDay:this.stanData.creDay,
        level:this.stanData.level,
        description:this.stanData.description
      }).then(()=>{
        //同$confirm类似
        this.$message({
          type:"success",
          message:"添加成功！"
        })
        //更新列表
        this.stanIsShow=false
        this.getCardInfo()
      })
    },
  },
  mounted() {
    // getData().then(res => {
    //   //解析获得所需数据
    //   const {code, data} = res.data
    //   if (code === 20000) {
    //     //请求成功，赋值到tableData
    //     this.tableData = data.tableData
    //   }
    //   console.log(res)
    // })
  },
  //生命周期
  created(){
    //在页面加载时就需要调用
    this.getCardInfo()
    this.$store.commit('setStanId',{stanId:0,stanPage:this.pageName})
  }
}
</script>

<style lang="less" scoped>
.join {
  background-color: white;

  .search {
    padding: 0;
    position: absolute;
    background-color:white;
    width: 97%;
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    .searchForm {
      justify-content: center;
      margin: 10px 0 10px 430px;
      display: flex;
      height: 40px;
      width: 600px;
    }
    .add{
      margin: 10px 40px 10px 0;
      height: 35px;
      width: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .show{
    margin-top: 70px;
  }
}

</style>