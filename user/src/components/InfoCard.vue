<template>
    <div class="stanCard">
      <div class="main">
        <div class="left">
          <span class="manager">负责人：{{ cardData.managerName }}</span>
          <span class="editor">编写者：{{ cardData.editors }}</span>
        </div>
        <div class="right">
          <span class="creDay">创建时间：{{ cardData.creDay }}</span>
          <span class="level">分 级：{{ cardData.levelName }}</span>
        </div>
      </div>
      <div class="rooter">
        <span class="description">简 述：{{ cardData.description }}</span>
        <el-link class="link" type="primary" @click="checkStan">查看详情</el-link>
      </div>
    </div>
</template>

<script>
export default {
  name: "InfoCard",

  data() {
    return {
      cardId: 0
    }
  },

  //用于接收外部传入的数据
  props: {
    cardData: Object,
    cardName: String
  },

  methods: {
    checkStan() {
      this.$emit('checkStan')
    }
  },
}
</script>

<style scoped lang="less">
.stanCard {
  display: flex;
  align-items: center;
  flex-wrap: wrap; //实现自动换行功能
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left, .right {
      span {
        display: block;
        width: 410px;
        margin: 5px 100px 5px 0;
        white-space: nowrap; /*强制单行显示*/
        text-overflow: ellipsis; /*超出部分省略号表示*/
        overflow: hidden; /*超出部分隐藏*/
      }
    }
  }

  .rooter {
    width: 100%;

    .description {
      display: block;
      width: 1005px;
      white-space: nowrap; /*强制单行显示*/
      text-overflow: ellipsis; /*超出部分省略号表示*/
      overflow: hidden; /*超出部分隐藏*/
    }

    .link {
      display: block;
      width: 60px;
      margin-left: 950px;
    }
  }

}
</style>