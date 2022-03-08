<!--Echart公共组件-->
<template>
  <div ref="echart"></div>
</template>

<script>
import * as echart from 'echarts'
export default {
  name: "Echarts",
  //属性用于区分是折线柱状（均匀x轴和y轴）还是饼状（无x轴、y轴）
  props:{
    isAxisChart:{
      type:Boolean,
      default:true
    },
    chartData:{
      type:Object,
      default(){
        return{
          xData:[],
          series:[]
        }
      }
    }
  },

  watch:{
    //当数据改变是表格需要重新绘制
    chartData:{
      handler:function (){
        this.initChart()
      },
      //首次对数据监听时也需要触发
      deep:true
    }
  },

  data(){
    return{
      //柱状图和折线图
      axisOption: {
        legend: {
          //图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        //提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", //类目轴
          //获取x轴数据，使用es6的箭头函数
          data:[],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            }
          }
        ],
        color: ["#2ec7c9", "#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3"],
        series: [],
      },
      //饼状图
      normalOption:{
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      //判断echart是否已经渲染
      echart:null
    }
  },

  methods:{
    initChart(){
      this.initChartData()
      //判断echart是否已经渲染
      if(this.echart){
        this.echart.setOption(this.options)
      }else{
        this.echart=echart.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    //从chartData里面获取相应option的数据
    initChartData(){
      if(this.isAxisChart){
        this.axisOption.xAxis.data=this.chartData.xData
        this.axisOption.series=this.chartData.series
      }else{
        this.normalOption.series=this.chartData.series
      }
    }
  },

  computed:{
    //判断为柱状图还是折线图
    options(){
      return this.isAxisChart ? this.axisOption : this.normalOption
    }
  }
}
</script>

<style scoped>

</style>