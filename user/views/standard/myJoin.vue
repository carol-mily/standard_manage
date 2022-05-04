<template>
  <el-container class="join">
    <el-header class="search">
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
    </el-header>
    <el-main class="show">
      <common-card
      :card-data="cardData"
      :page-name="pageName"
      @check="checkSta"
      @edit="editSta"></common-card>
    </el-main>
  </el-container>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import CommonCard from "@/components/CommonCard";

export default {
  name: "myJoin",

  components: {
    CommonForm,
    CommonCard
  },

  data() {
    return {
      userImg: require('../../src/assets/images/logo.png'),
      pageName:'myJoin',
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
    }
  },
  methods: {
    load(){
      this.request.get("/standard/findByUphone",{params:{
          uphone:this.$store.state.user.user.phone,
          name:this.searchForm.keyword
        }
      }).then(res=>{
        console.log("function：/standard/findByUphone")
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

    checkSta(item){
      console.log('Join:check index:'+item.id)
      let pageName=this.pageName
      this.$store.commit('setStanId',{stanId:item.id,stanPage:pageName})
      console.log('添加 stanId:'+this.$store.state.standard.stanId)
      this.$router.push({name: 'check'})
    },

    editSta(item){
      console.log('Join:edit index:'+item.id)
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
  },
  mounted() {},

  //生命周期
  created(){
    //在页面加载时就需要调用
    this.load()
  }
}
</script>

<style lang="less" scoped>
.join {
  background-color: white;
  min-height: 100% !important;
  width: 100%;

  .search {
    padding: 0;
    position: absolute;
    width: 97%;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    .searchForm {
      padding: 10px 0 0 0;
      margin: 10px 0 0 0;
      display: inline-block;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: auto;
    }
  }
  .show{
    margin-top: 70px;
    .el-aside {
      width: 250px !important;
      text-align: center;
      height: 500px !important;
    }
    .table{
      height: 500px;
    }
  }
}

</style>