<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top:20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="userImg"/>
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021-12-31</span></p>
          <p>上次登录地点：<span>长沙</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;height:460px">
        <el-table ref="multipleTable" :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <!--prop为读取数据中所对应的名称-->
          <el-table-column v-for="(value,key) in tableLabel" :key="key" :prop="key" :label="value">
          </el-table-column>
          <el-table-column width="180" label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top: 20px" :span="16">
      <div class="num" style="display: flex">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}" style="width:30%">
          <i :class="'el-icon-'+item.icon" :style="{background:item.color}" style="width: 20%"></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!--ref用于获取当前的dom-->
        <!--<div style="height: 280px;width: 100%" ref="echarts"></div>-->
        <!--使用公共组件-->
        <echarts :chart-data="echartData.order" style="height: 280px"></echarts>
      </el-card>
      <div class="graph" style="display: flex">
        <el-card style="height: 260px;width: 50%">
        <!--<div style="height: 260px;width: 100%" ref="userEcharts"></div>-->
          <!--使用公共组件-->
          <echarts :chart-data="echartData.user" style="height: 260px"></echarts>
        </el-card>
        <el-card style="height: 260px;width: 50%">
          <!--<div style="height: 240px" ref="videoEcharts"></div>-->
          <!--使用公共组件-->
          <echarts :chart-data="echartData.video" :is-axis-chart="false" style="height: 240px"></echarts>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {getData} from '../../api/data'
//引入无版本的echart组件
// import * as echarts from 'echarts'
import Echarts from "@/components/Echarts";

export default {
  name: "index",

  components: {
    Echarts
  },

  data() {
    return {
      userImg: require('../../src/assets/images/logo.png'),
      tableData: [
        // {
        //   name:'oppo',
        //   todayBuy:100,
        //   monthBuy:300,
        //   totalBuy:800
        // },
        // {
        //   name:'vivo',
        //   todayBuy:100,
        //   monthBuy:400,
        //   totalBuy:800
        // },
        // {
        //   name:'华为',
        //   todayBuy:200,
        //   monthBuy:300,
        //   totalBuy:900
        // },
        // {
        //   name:'苹果',
        //   todayBuy:100,
        //   monthBuy:200,
        //   totalBuy:700
        // }
      ],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        }
      ],
      //标签，用于渲染
      tableLabel: {
        name: '品牌',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      multipleSelection: [],
      echartData: {
        //折线图
        order: {
          xData: [],
          series: []
        },
        //柱状图
        user: {
          xData: [],
          series: []
        },
        //饼状图
        video: {
          series: []
        }
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  mounted() {
    // //请求一般写在mounted里面
    // this.$http.get('/user?ID=12345')
    //     .then(function (response) {
    //       // 处理成功情况
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       // 处理错误情况
    //       console.log(error);
    //     })
    getData().then(res => {
      //解析获得所需数据
      const {code, data} = res.data
      if (code === 20000) {
        //请求成功，赋值到tableData
        this.tableData = data.tableData

        //折线图数据处理
        const order = data.orderData
        const xData = order.date
        //获得key值
        const keyArray = Object.keys(order.data[0])
        //组装echarts中的series
        const series = []
        keyArray.forEach(key => {
          series.push({
            name: key,
            //获取每一项key值对应的数据
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })
        // //组装option(配置)
        // const option = {
        //   //x轴为时间
        //   xAxis: {
        //     data: xData
        //   },
        //   yAxis: {},
        //   //图例
        //   legend: {
        //     data: keyArray
        //   },
        //   series
        // }
        // //初始化echarts,在css中使用了ref来获取dom节点
        // const E = echarts.init(this.$refs.echarts)
        // //绘图
        // E.setOption(option)

        //使用Echart公共组件
        this.echartData.order.xData = xData
        this.echartData.order.series = series

        //柱状用户图
        // const userOption = {
        //   legend: {
        //     //图例文字颜色
        //     textStyle: {
        //       color: "#333",
        //     },
        //   },
        //   grid: {
        //     left: "20%",
        //   },
        //   //提示框
        //   tooltip: {
        //     trigger: "axis",
        //   },
        //   xAxis: {
        //     type: "category", //类目轴
        //     //获取x轴数据，使用es6的箭头函数
        //     data: data.userData.map(item => item.date),
        //     axisLine: {
        //       lineStyle: {
        //         color: "#17b3a3",
        //       },
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: "#333",
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: "value",
        //       axisLine: {
        //         lineStyle: {
        //           color: "#17b3a3",
        //         },
        //       }
        //     }
        //   ],
        //   color: ["#2ec7c9", "#b6a2de"],
        //   series: [{
        //     name: '新增用户',
        //     data: data.userData.map(item => item.new),
        //     type: 'bar'
        //   },
        //     {
        //       name: '活跃用户',
        //       data: data.userData.map(item => item.active),
        //       type: 'bar'
        //     },
        //   ],
        // }
        // const U = echarts.init(this.$refs.userEcharts)
        // U.setOption(userOption)

        //使用公共组件
        this.echartData.user.xData = data.userData.map(item => item.date)
        this.echartData.user.series = [{
          name: '新增用户',
          data: data.userData.map(item => item.new),
          type: 'bar'
        },
          {
            name: '活跃用户',
            data: data.userData.map(item => item.active),
            type: 'bar'
          },
        ]

        //饼状图
        // const videoOption = {
        //   tooltip: {
        //     trigger: "item",
        //   },
        //   color: [
        //     "#0f78f4",
        //     "#dd536b",
        //     "#9462e5",
        //     "#a6a6a6",
        //     "#e1bb22",
        //     "#39c362",
        //     "#3ed1cf",
        //   ],
        //   series: [
        //     {
        //       data: data.videoData,
        //       type: 'pie'
        //     }
        //   ],
        // }
        // const V = echarts.init(this.$refs.videoEcharts)
        // V.setOption(videoOption)

        //使用公共组件
        this.echartData.video.series =[
          {
            data: data.videoData,
            type: 'pie'
          }
        ]
      }
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>
.home {
  margin-left: 10px;
}
</style>