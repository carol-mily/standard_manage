<template class="aside">
  <aside>
    <el-col :span="24">
      <el-menu
          default-active="1-0-0"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          unique-opened="true"
          background-color="#BBCFE1"
          text-color="#000"
          active-text-color="#0076FF">
        <template v-for="item in menu">
          <!--循环读取无子菜单的item-->
          <el-menu-item
              v-if="!item.children"
              :index="item.id"
              :key="item.id"
              style="font-size: 17px ;display:flex;align-content: center;justify-content: center; padding: 0">
            <template slot="title" class="primary" v-if="asideName==='primary'">
              <span slot="title" @click="clickMenu(item)" style="width: 100%">{{ item.name }}</span>
            </template>
            <template slot="title" class="check" v-if="asideName==='check'">
              <span slot="title" @click="clickMenu(item)"  style="width: 205px" >{{ item.name }}</span>
              <el-button class="checkButton"
                         icon="el-icon-view"
                         plain
                         @click="checkMenu(item)"
                         style="display: flex;justify-content: center;align-items: center;width:45px;height:100%;margin-right:0;border-color:transparent;background-color:transparent;"></el-button>
            </template>
            <template slot="title" class="edit" v-if="asideName==='edit'">
              <span slot="title" @click="clickMenu(item)"  style="width: 205px" >{{ item.name }}</span>
              <el-button class="editButton"
                         icon="el-icon-edit"
                         plain
                         @click="checkMenu(item)"
                         style="display: flex;justify-content: center;align-items: center;width:45px;height:100%;margin-right:0;border-color:transparent;background-color:transparent;"></el-button>
            </template>
          </el-menu-item>

          <!--循环读取有子菜单的item-->
          <el-submenu
              v-if="item.children"
              :index="item.id"
              :key="item.id">
            <template slot="title">
              <span style="font-size: 17px ;display:flex;align-content: center;justify-content: center">{{ item.name }}</span>
<!--              <i class="el-icon-menu"></i>-->
            </template>
            <!--二级菜单渲染-->
            <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.id" >
              <el-menu-item
                  @click="clickMenu(subItem)"
                  :index="subIndex"
                  style="font-size: 15px ;display:flex;align-content: center;justify-content: center; ">{{ subItem.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>

<!--        添加表的操作-->
        <el-menu-item
            v-if="asideName==='edit'"
            :key="-1"
            :index="-1"
            @click="addMenu"
            style="font-size: 17px ;display:flex;align-content: center;justify-content: center; padding: 0">
          <template slot="title">
            <span slot="title" >添加</span>
            <i class="el-icon-plus" style="display: flex;justify-content: center;align-items: center;width:45px;height:100%;margin-right:0;"></i>
          </template>
        </el-menu-item>
      </el-menu>
    </el-col>
  </aside>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
      editImg: require('../../src/assets/icon/edit.png'),
    }
  },

  //用于接收外部传入的数据
  props: {
    menu: Array,
    asideName:String
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
      console.log(item)
      this.$emit('chooseTable',item)
      // //跳转
      // this.$router.push({
      //   name:item.name
      // })
      // //将当前选中菜单提交给store，调用selectMenu
      // this.$store.commit('selectMenu',item)
    },
    checkMenu(item){
      this.$emit('checkTable',item)
    },
    addMenu() {
      this.$emit('addTable')
    }
  },

  // computed: {
  //   //动态获取菜单
  //   asyncLevel(){
  //     return this.$store.state.level.level
  //   }
  // }
}
</script>

<style lang="less" scoped>
aside{
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  background-color:#BBCFE1;
  .el-menu{
    height: 100%;
    border: none;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    min-height: 500px;
  }
}

</style>