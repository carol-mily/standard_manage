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
import {addStan, getCard} from '../../api/data'
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
      pageName: 'myManage',
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
          model: 'creDay',
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
    }
  },
  methods: {
    getCardInfo(name = '') {
      let pageName = this.pageName
      getCard({
        phone: this.$store.state.user.user.phone,
        name,
        pageName
      }).then(({data: res}) => {
        //上面是使用es6的解构赋值为res
        console.log(res, 'res')
        this.cardData = res.data.list.map(item => {
          //映射
          item.manager = item.manager.name
          if(item.state===0){
            item.stateName='编写中'
          }else if(item.state===1){
            item.stateName='审核中'
          }else if(item.state===2){
            item.stateName='已发布'
          }
          return item
        })
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
          this.getCardInfo()
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
      let time = new Date();
      let year = time.getFullYear();
      let month = (time.getMonth()+1).toString().padStart(2,'0');
      let day = time.getDate().toString().padStart(2,'0');
      let creDay = year+'-'+month+'-'+day;
      this.stanIsShow = true
      //表内数据显示为当前行内的数据，回写
      this.stanData = {
        name:'',
        ename: '',
        manager: this.$store.state.user.user.name,
        editors: '',
        level:this.$store.state.level.level[0],
        creDay: creDay,
        description: '',
      }
    },

    //添加数据标准
    addStan() {
      addStan({
        pageName: this.$store.state.standard.stanPage,
        name: this.stanData.name,
        ename: this.stanData.ename,
        manager: this.$store.state.user.user, //直接添加该用户为负责人
        editors: [],
        creDay: this.stanData.creDay,
        level: this.stanData.level.length,
        level1:this.stanData.level[0],
        level2:this.stanData.level[1],
        level3:this.stanData.level[2],
        description: this.stanData.description
      }).then(() => {
        //同$confirm类似
        this.$message({
          type: "success",
          message: "添加成功！"
        })
        //更新列表
        this.stanIsShow = false
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
  created() {
    //在页面加载时就需要调用
    this.getCardInfo()
    this.$store.commit('setStanId', {stanId: 0, stanPage: this.pageName})
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
      margin: 10px 0 10px 430px;
      display: flex;
      height: 40px;
      width: 600px;
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