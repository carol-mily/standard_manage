<template>
  <!--model数据绑定-->
  <el-form class="form" ref="form" label-width="100px" :model="form" :rules="rules" :inline="inline">
    <!--表单渲染-->
    <el-form-item
        v-for="item in formLabel"
        :key="item.label"
        :prop="item.model"
        :label="item.label"
        :label-width="item.label?'100px':'0'">
<!--        :rules="item.rules">-->
      <el-input
          v-if="item.type==='input'"
          :placeholder="'请输入'+item.label"
          v-model="form[item.model]"
          :style="item.style"
          :disabled="item.disabled ? item.disabled : false"></el-input>
      <el-input
          v-if="item.type==='password'"
          :placeholder="'请输入'+item.label"
          v-model="form[item.model]"
          type="password"
          :style="item.style"
          :disabled="item.disabled ? item.disabled : false"></el-input>
      <el-input
          v-if="item.type==='search'"
          :placeholder="'请输入关键字'"
          prefix-icon="el-icon-search"
          clearable
          v-model="form[item.model]"
          :style="item.style"
          :disabled="item.disabled ? item.disabled : false"></el-input>
      <el-input
          v-if="item.type==='searchPhone'"
          :placeholder="'请输入手机号'"
          clearable
          v-model="form[item.model]"
          :style="item.style"
          :disabled="item.disabled ? item.disabled : false"></el-input>
      <el-input
          v-if="item.type==='textarea'"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 5}"
          :placeholder="'请输入'+item.label"
          v-model="form[item.model]"
          :style="item.style"
          :disabled="item.disabled ? item.disabled : false"></el-input>
      <el-upload
          v-if="item.type==='upload'"
          class="avatar-uploader"
          :action="item.url"
          :show-file-list="false"
          :on-success="success"
          :before-upload="beforeUpload">
        <img v-if="form[item.model]" :src="form[item.model]" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-switch
          v-if="item.type==='switch'"
          v-model="form[item.model]"
          :style="item.style"
          :disabled="item.disabled ? item.disabled : false"></el-switch>
      <el-date-picker
          v-if="item.type==='date'"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          v-model="form[item.model]"
          :style="item.style"
          :disabled="item.disabled ? item.disabled : false"></el-date-picker>
      <el-select
          v-if="item.type==='select'"
          placeholder="请选择"
          v-model="form[item.model]"
          :style="item.style"
          :disabled="item.disabled ? item.disabled : false">
        <el-option
            v-for="item in item.opts"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
      </el-select>
      <el-form-item
          v-if="item.type==='radio'">
        <el-radio-group v-model="form[item.model]">
          <el-radio label="通过" value="0"></el-radio>
          <el-radio label="不通过" value="1"></el-radio>
        </el-radio-group>
      </el-form-item>
<!--      利用props配置value和name-->
      <el-cascader
          v-if="item.type==='cascader'"
          v-model="form[item.model]"
          :props="{ value: 'id',label: 'name'}"
          :options="item.options"
          :style="item.style"
          :disabled="item.disabled ? item.disabled : false"></el-cascader>
      <el-form-item v-if="item.type==='changeManager'">
        <el-input v-model="form[item.model]" clearable :style="item.style" :disabled="true"></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="changeManager">转让</el-button>
      </el-form-item>
      <el-form-item v-if="item.type==='changeEditors'">
        <el-input v-model="form[item.model]" :style="item.style" :disabled="true"></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="changeEditors">管理</el-button>
      </el-form-item>
      <el-form-item v-if="item.type==='changeState'">
        <el-input v-model="form[item.model]" :style="item.style" :disabled="true"></el-input>
        <el-button v-if="form[item.model]==='审核中'" type="primary" style="margin-left: 20px" @click="changeState(0)">审核</el-button>
        <el-button v-if="form[item.model]==='已发布'" type="primary" style="margin-left: 20px" @click="changeState(1)">撤销</el-button>
      </el-form-item>
      <el-form-item v-if="item.type==='addUser'">
        <el-input v-model="form[item.model]" clearable :style="item.style" :placeholder="'请输入手机号'"></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="addUser">添加</el-button>
      </el-form-item>
    </el-form-item>
    <!--组件扩展，若当前组件均不满足，则使用slot插槽自定义传入内容-->
    <el-form-item label-width="0" style="text-align: center">
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CommonForm",

  data() {
    return {
      pickerOptions:{ //日期选择器限制日期
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
    }
  },

  props: {
    //表单配置
    formLabel: Array,
    //表单数据
    form: Object,
    rules:Object,
    //布局
    inline: Boolean,
  },

  methods:{
    changeManager(){
      this.$emit('changeManager')
    },

    changeEditors(){
      this.$emit('changeEditors')
    },

    changeState(val){
      this.$emit('changeState',val)
    },

    addUser(){
      this.$emit('addUser')
    },

    success(res){ //成功之后会有个返回值
      this.$emit('success',res)
    },

    beforeUpload(file){
      const isJPGorPNG = (file.type === 'image/jpeg'||file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGorPNG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');

      }else{
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
      }
      return isJPGorPNG && isLt2M;
    },

    isValid(validInfo){ //表单校验，在父组件中通过ref调用
      this.$refs["form"].validate((valid, msg) => {
        if (valid) {
          validInfo.value=1
        } else {
          validInfo.value=0
          for (let key in msg) {
            validInfo.message=msg[key][0].message
            return false;
          }
        }
      });
    }
  }
}
</script>

<style scoped lang="less">
.form{
  width: 100%;
  height: 100%;
  padding: 0;
  display: block;
  justify-content: center;
  align-items: center;
  .avatar-uploader{
    margin-top: 10px;
    position: relative;
    width: 100%;
    height:100px;
    text-align: center;

    .avatar-uploader-icon {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100%;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      border-radius: 6px;
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .avatar-uploader :hover {
    border-color: #409EFF;
    color: #409EFF;
  }
}


</style>