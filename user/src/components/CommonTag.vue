<template>
  <div class="tabs">
    <el-tag
        v-for="(tag,index) in tags"
        :key="tag.name"
        :closable="tag.name!=='home'"
        :effect="$route.name===tag.name ?'dark':'plain'"
        @click="changeMenu(tag)"
        @close="handleClose(tag,index)"
        size="small" >
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: "CommonTag",
  data(){
    return{}
  },

  methods:{
    ...mapMutations({
      //别名
     close:'closeTag'
    }),

    changeMenu(item){
      //路由切换
      this.$router.push((item.name))
    },

    handleClose(tag,index){
      const length=this.tags.length-1
      //删除标签
      this.close(tag)
      //判断是否为最后一个标签
      if(tag.name!==this.$route.name){
        return;
      }
      //当前为最后一个标签
      if(index===length){
        //向左跳转
        this.$router.push({
          name:this.tags[index-1].name
        })
      }else{
        //向右跳转
        this.$router.push({
          name:this.tags[index].name
        })
      }
    }
  },

  computed:{
    ...mapState({
      tags:state => state.tab.tabsList
    })
  }
}
</script>

<style lang="less" scoped>
.tabs{
  padding: 20px;
  //覆盖原本的样式
  .el-tag{
    margin-right:15px ;
    cursor: pointer;
  }
}
</style>