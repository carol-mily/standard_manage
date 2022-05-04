<template class="aside">
  <aside>
    <el-col :span="24">
      <el-menu
          :default-active="defaultAct"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#BBCFE1"
          text-color="#000"
          active-text-color="#0076FF"
          :unique-opened="true">
        <!-- home和total 其唯一标识为value-->
        <div v-if="asideName==='home'||asideName==='total'" class="state1">
          <!--        添加表的操作-->
          <el-menu-item
              :key="'全部'"
              :index="'全部'"
              @click="getAll">
            <template slot="title">
              <span slot="title" style="font-size: 17px">全部</span>
            </template>
          </el-menu-item>
          <template  v-for="item1 in menu">
          <!--循环读取无子菜单的item1-->
          <el-menu-item
              v-if="!item1.children"
              :index="item1.id.toString()"
              :key="item1.id.toString()"
              @click="clickMenu(item1)">
            <template slot="title">
<!--              <i class='el-icon-my-menu1'></i>-->
              <span slot="title" style="font-size: 17px">{{ item1.name }}</span>
            </template>
          </el-menu-item>

          <!--循环读取有子菜单的item1-->
          <el-submenu
              v-if="item1.children"
              :index="item1.id.toString()"
              :key="item1.id.toString()"
              @click="clickMenu(item1)">
            <template slot="title">
<!--              <i class='el-icon-my-menu1'></i>-->
              <span slot="title" style="font-size: 17px">{{ item1.name }}</span>
            </template>
            <!--二级菜单渲染-->
            <el-menu-item-group v-for="item2 in item1.children" :key="item2.id" :unique-opened="true">
              <!--循环读取无子菜单的item2-->
              <el-menu-item
                  v-if="!item2.children"
                  @click="clickMenu(item2)"
                  :index="item2.id.toString()"
                  :key="item2.id.toString()">
                <template slot="title">
<!--                  <i class='el-icon-my-menu2'></i>-->
                  <span slot="title" style="font-size: 15px">{{ item2.name }}</span>
                </template>
              </el-menu-item>

              <!--循环读取有子菜单的item2-->
              <el-submenu
                  v-if="item2.children"
                  :index="item2.id.toString()"
                  :key="item2.id.toString()"
                  @click="clickMenu(item2)">
                <template slot="title">
<!--                  <i class='el-icon-my-menu2'></i>-->
                  <span slot="title" style="font-size: 15px">{{ item2.name }}</span>
                </template>
                <!--三级菜单渲染-->
                <el-menu-item-group v-for="item3 in item2.children" :key="item3.id">
                  <!--循环读取有子菜单的item3-->
                  <el-menu-item
                      @click="clickMenu(item3)"
                      :index="item3.id.toString()"
                      :key="item3.id.toString()">
                    <template slot="title">
<!--                      <i class='el-icon-my-menu3'></i>-->
                      <span slot="title" style="font-size: 14px">{{ item3.name }}</span>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        </template>
        </div>

        <!-- edit、check、info的操作-->
        <div v-if="asideName!=='home'&&asideName!=='total'"  class="state2">
          <template  v-for="item in menu">
          <el-menu-item
              v-if="!item.children"
              :index="item.id.toString()"
              :key="item.id.toString()"
              style="font-size: 17px ;display:flex;align-content: center;justify-content: center; padding: 0">
            <template slot="title" class="primary" v-if="asideName==='primary'">
              <span slot="title" @click="clickMenu(item)" style="width: 100%">{{ item.name }}</span>
            </template>
            <template slot="title" class="check" v-if="asideName==='check'">
              <span slot="title" @click="clickMenu(item)" style="width: 205px">{{ item.name }}</span>
              <el-button class="checkButton"
                         icon="el-icon-view"
                         plain
                         @click="checkMenu(item)"
                         style="display: flex;justify-content: center;align-items: center;width:45px;height:100%;margin-right:0;border-color:transparent;background-color:transparent;"></el-button>
            </template>
            <template slot="title" class="edit" v-if="asideName==='edit'">
              <span slot="title" @click="clickMenu(item)" style="width: 205px">{{ item.name }}</span>
              <el-button class="editButton"
                         icon="el-icon-edit"
                         plain
                         @click="checkMenu(item)"
                         style="display: flex;justify-content: center;align-items: center;width:45px;height:100%;margin-right:0;border-color:transparent;background-color:transparent;"></el-button>
            </template>
          </el-menu-item>
        </template>
        </div>

        <!--        添加表的操作-->
        <el-menu-item
            v-if="asideName==='edit'"
            :key="'添加'"
            :index="'添加'"
            @click="addMenu"
            style="font-size: 17px ;display:flex;align-content: center;justify-content: center; padding: 0">
          <template slot="title">
            <span slot="title">添加</span>
            <i class="el-icon-plus"
               style="display: flex;justify-content: center;align-items: center;width:45px;height:100%;margin-right:0;"></i>
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
      defaultAct:'全部',
      editImg: require('../../src/assets/icon/edit.png'),
    }
  },

  //用于接收外部传入的数据
  props: {
    menu: Array,
    asideName: String
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getAll(){
      this.$emit('getAll')
    },
    clickMenu(item) {
      console.log(item)
      this.$emit('chooseTable', item)
      // //跳转
      // this.$router.push({
      //   name:item.name
      // })
      // //将当前选中菜单提交给store，调用selectMenu
      // this.$store.commit('selectMenu',item)
    },
    checkMenu(item) {
      this.$emit('checkTable', item)
    },
    addMenu() {
      this.$emit('addTable')
    },
  },

  watch: {
    'menu': function(){
      if(this.asideName==='home'||this.asideName==='total'){
        this.defaultAct='全部'
      }else if(this.asideName==='message'){
        this.defaultAct='未读'
      }else{
        this.defaultAct=this.menu.length===0?'':this.menu[0].id.toString()
      }
    },
  },

  created() {
    if(this.asideName==='home'||this.asideName==='total'){
      this.defaultAct='全部'
    }else if(this.asideName==='message'){
      this.defaultAct='未读'
    }else{
      this.defaultAct=this.menu.length===0?'':this.menu[0].id.toString()
    }
  }
}
</script>

<style lang="less" scoped>
aside {
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  background-color: #BBCFE1;


  .el-menu {
    height: 100%;
    border: none;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    min-height: 500px;
  }
}

//自定义图标名el-icon-my-menu1
.el-icon-my-menu1{
  background: url("../assets/icon/menu1.png") center no-repeat;
}
//content中是中文的Unicode编码； font-size:图标大小； visibility: hidden;来隐藏文字
.el-icon-my-menu1:before{
  content: "\onepoint";
  font-size: 20px;
  visibility: hidden;
}

//自定义图标名el-icon-my-menu2
.el-icon-my-menu2{
  background: url("../assets/icon/menu2.png") center no-repeat;
}
//content中是中文的Unicode编码； font-size:图标大小； visibility: hidden;来隐藏文字
.el-icon-my-menu2:before{
  content: "\onepoint";
  font-size: 20px;
  visibility: hidden;
}

//自定义图标名el-icon-my-menu3
.el-icon-my-menu3{
  background: url("../assets/icon/menu3.png") center no-repeat;
}
//content中是中文的Unicode编码； font-size:图标大小； visibility: hidden;来隐藏文字
.el-icon-my-menu3:before{
  content: "\onepoint";
  font-size: 20px;
  visibility: hidden;
}
</style>