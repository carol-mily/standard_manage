<template>
  <div class="card">
    <el-card class="box-card" v-for="item in cardData" :index="item.id" :key="item.id">
      <!--      <div slot="header" class="clearfix">-->
      <!--        <span class="title">{{ item.name }}</span>-->
      <!--        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      <!--      </div>-->
      <!--      <div class="text item">-->
      <!--        <span class="manager">负责人：{{ item.manager }}</span><br>-->
      <!--        <span class="day">创建时间：{{ item.creDay }}</span>-->
      <!--      </div>-->
      <div class="case">
        <div class="case1" v-if="show===false||cardId!==item.id" @click="overCard(item.id)">
          <h3 >{{ item.name }}</h3>
          <span class="manager">负责人：{{ item.mname }}</span><br>
          <span class="day">创建时间：{{ item.creday }}</span><br>
          <span class="state">状态：{{ item.stateName }}</span>
        </div>
        <div class="case2" v-if="show===true&&cardId===item.id&&pageName==='myJoin'">
          <div class="l-content2" @click="check(item)">
            <img class="check" :src="eyeImg" style="width: 40px; height: 40px"/>
          </div>
          <div class="r-content2"  @click="edit(item)">
            <img class="edit" :src="editImg" style="width: 40px; height: 40px"/>
          </div>
        </div>
        <div class="case3" v-if="show===true&&cardId===item.id&&pageName==='myManage'">
          <div class="l-content3" @click="check(item)">
            <img class="check" :src="eyeImg" style="width: 30px; height: 30px"/>
          </div>
          <div class="c-content3" @click="edit(item)">
            <img class="edit" :src="editImg" style="width: 30px; height: 30px"/>
          </div>
          <div class="r-content3" @click="manage(item)">
            <img class="manage" :src="manageImg" style="width: 30px; height: 30px"/>
          </div>
        </div>
      </div>

    </el-card>
<!--    <el-card class="add-card" v-if="pageName==='manage'">-->
<!--      <img class="add" :src="addImg" style="width: 50px; height: 50px"/>-->
<!--    </el-card>-->
  </div>
</template>

<script>
export default {
  name: "CommonCard",

  data() {
    return {
      addImg: require('../assets/icon/add.png'),
      eyeImg: require('../assets/icon/eye.png'),
      editImg: require('../assets/icon/edit.png'),
      manageImg: require('../assets/icon/manage.png'),
      show: false,
      cardId: 0
    }
  },

  //用于接收外部传入的数据
  props: {
    cardData: Array,
    pageName: String,
  },

  methods: {
    overCard(id) {
      this.show = true
      this.cardId = id
    },

    check(item){
      this.$emit('check',item)
      // this.$router.push({name: 'check'})
    },

    edit(item){
      this.$emit('edit',item)
      // this.$router.push({name: 'edit'})
    },

    manage(item){
      this.$emit('manage',item)
      // this.$router.push({name: 'umanage'})
    }
  },

  mounted(){
    // 模拟外部点击
    document.addEventListener('click', (e) => {
      if(!this.$el.contains(e.target)){
        this.show = false
        this.cardId = 0
      }
    })
  },
// 在组件生命周期结束时销毁
  beforeDestroy() {
    window.removeEventListener('click', () => {}, true)
  }
}
</script>

<style scoped lang="less">
.card {
  display: flex;
  align-items: center;
  flex-wrap: wrap; //实现自动换行功能
}


.box-card {
  height: 150px;
  width: calc(25% - 52px);
  margin: 10px 25px 30px 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  .case {
    display: flex;

    .case1 {
      width: 300px;
      height: 150px;
      padding: 0;

      h3 {
        margin-top: 30px;
        margin-left: 20px;
      }

      .manager, .day,.state {
        display: inline;
        color: #999999;
        font-size: 15px;
        margin-left: 20px;
      }
    }

    .case2 {
      width: 300px;
      height: 150px;
      display: flex;
      justify-content: space-between;

      .l-content2, .r-content2 {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .case3 {
      width: 300px;
      height: 150px;
      display: flex;
      justify-content: space-between;

      .l-content3, .c-content3, .r-content3 {
        width: 30%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }


}

.add-card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: calc(25% - 52px);
  margin: 10px 25px 30px 25px;
}
</style>