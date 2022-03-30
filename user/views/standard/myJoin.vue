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
                   @click="getCardInfo(searchForm.keyword)"
                   style="height: 38px"
        >搜索
        </el-button>
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
import {getCard} from '../../api/data'
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
      pageName:'join',
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
      cardData: [
        // {
        //   id: 1,
        //   name: '数据标准1',
        //   manager: '负责人1',
        //   creDay: '2022-01-01'
        // },
        // {
        //   id: 2,
        //   name: '数据标准2',
        //   manager: '负责人2',
        //   creDay: '2022-01-02'
        // },
        // {
        //   id: 3,
        //   name: '数据标准3',
        //   manager: '负责人3',
        //   creDay: '2022-01-03'
        // },
        // {
        //   id: 4,
        //   name: '数据标准4',
        //   manager: '负责人4',
        //   creDay: '2022-01-04'
        // },
      ],
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

    checkSta(index){
      // console.log('Join:check index:'+index)
      // let pageName=this.pageName
      // getStanInfo({
      //   stanId:index,
      //   pageName
      // }).then(({data:res}) => {
      //   //上面是使用es6的解构赋值为res
      //   console.log(res,'res')
      //   this.$store.commit('clearStandard')
      //   console.log('清理 standard:'+this.$store.state.standard.standard.name)
      //   this.$store.commit('setStandard',res.list[0])
      //   console.log('添加 standard:'+this.$store.state.standard.standard.name)
      // });
      // this.$router.push({name: 'check'})
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
  }
}
</script>

<style lang="less" scoped>
.join {
  background-color: white;

  .search {
    //padding: 40px 0 20px 0;
    //display: flex;
    //align-items: center;
    //justify-content: center;
    //position: absolute;
    //background-color: white;
    //width: 95%;
    //.searchForm {
    //  display: flex;
    //  align-items: center;
    //  justify-content: center;
    //}
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