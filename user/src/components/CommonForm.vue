<template>
  <!--model数据绑定-->
  <el-form class="form" ref="form" label-width="100px" :model="form" :inline="inline">
    <!--表单渲染-->
    <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
      <el-input
          v-if="item.type==='input'"
          :placeholder="'请输入'+item.label"
          v-model="form[item.model]"
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
          v-if="item.type==='textarea'"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 5}"
          :placeholder="'请输入'+item.label"
          v-model="form[item.model]"
          :style="item.style"
          :disabled="item.disabled ? item.disabled : false"></el-input>
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
    </el-form-item>
    <!--组件扩展，若当前组件均不满足，则使用slot插槽自定义传入内容-->
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CommonForm",

  data() {
    return {}
  },

  props: {
    //表单配置
    formLabel: Array,
    //表单数据
    form: Object,
    //布局
    inline: Boolean
  }
}
</script>

<style scoped>
</style>