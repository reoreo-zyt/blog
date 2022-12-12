<template>
  <div class="dashboard-container">
    <div class="dashboard-status">
      <div class="dashboard-status-headline">系统状态</div>
      <div>
        <v-chart class="dashboard-status-chart" :option="option1" />
      </div>
    </div>
    <div class="dashboard-last">
      <div class="dashboard-last-active">
        <div class="dashboard-last-active-headline">活跃用户</div>
        <div>
          <v-chart class="dashboard-status-chart" :option="option2" />
        </div>
      </div>
      <div class="dashboard-last-sys">
        <div class="dashboard-last-sys-headline">系统信息</div>
        <div>
          <v-chart class="dashboard-status-chart" :option="option3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 按需引入 echart
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

export default {
  name: "Dashboard",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "normal",
  },
  created() {
    // 处理 option1 饼图数据
    for (let i = 0; i < this.apiData1.finishSta.length; i++) {
      this.apiData1.finishSta[i]["itemStyle"] = {
        normal: {
          borderWidth: 5,
          shadowBlur: 20,
          borderColor: this.color[i],
          shadowColor: this.color[i],
        },
      };
    }
    for (let i = 0; i < this.apiData1.userType.length; i++) {
      this.apiData1.userType[i]["itemStyle"] = {
        normal: {
          borderWidth: 5,
          shadowBlur: 20,
          borderColor: this.color[i],
          shadowColor: this.color[i],
        },
      };
    }
    for (let i = 0; i < this.apiData1.resource.length; i++) {
      this.apiData1.resource[i]["itemStyle"] = {
        normal: {
          borderWidth: 5,
          shadowBlur: 20,
          borderColor: this.color[i],
          shadowColor: this.color[i],
        },
      };
    }
    for (let i = 0; i < this.apiData1.questionSta.length; i++) {
      this.apiData1.questionSta[i]["itemStyle"] = {
        normal: {
          borderWidth: 5,
          shadowBlur: 20,
          borderColor: this.color[i],
          shadowColor: this.color[i],
        },
      };
    }
    this.option1 = {
      backgroundColor: "#0A2E5D",
      // color: this.color,
      tooltip: {
        trigger: "item",
      },
      legend: [],
      title: [
        {
          text: "作业完成情况",
          left: "10%", //居中显示
          top: "80%", //底部显示
          textStyle: {
            color: "#cccccc",
            fontSize: 18,
          },
        },
        {
          text: "用户类型分布",
          left: "30%", //居中显示
          top: "80%", //底部显示
          textStyle: {
            color: "#cccccc",
            fontSize: 18,
          },
        },
        {
          text: "资源类型分布",
          left: "50%", //居中显示
          top: "80%", //底部显示
          textStyle: {
            color: "#cccccc",
            fontSize: 18,
          },
        },
        {
          text: "提问答疑状况",
          left: "70%", //居中显示
          top: "80%", //底部显示
          textStyle: {
            color: "#cccccc",
            fontSize: 18,
          },
        },
      ],
      series: [
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: [60, 65],
          center: ["15%", "50%"],
          data: this.apiData1.finishSta,
          label: {
            show: true,
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: "{b} :\n  {c} \n ({d}%)",
                position: "inner",
              },
            },
          },
        },
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: [60, 65],
          center: ["35%", "50%"],
          data: this.apiData1.userType,
          label: {
            show: true,
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: "{b} :\n  {c} \n ({d}%)",
                position: "inner",
              },
            },
          },
        },
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: [60, 65],
          center: ["55%", "50%"],
          data: this.apiData1.resource,
          label: {
            show: false,
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: "{b} :\n  {c} \n ({d}%)",
                position: "inner",
              },
            },
          },
        },
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: [60, 65],
          center: ["75%", "50%"],
          data: this.apiData1.questionSta,
          label: {
            show: false,
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: "{b} :\n  {c} \n ({d}%)",
                position: "inner",
              },
            },
          },
        },
      ],
    };
    this.option2 = {
      backgroundColor: "#0A2E5D",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(0, 255, 233,0)",
                },
                {
                  offset: 0.5,
                  color: "rgba(255, 255, 255,1)",
                },
                {
                  offset: 1,
                  color: "rgba(0, 255, 233,0)",
                },
              ],
              global: false,
            },
          },
        },
      },
      grid: {
        top: "15%",
        left: "10%",
        right: "5%",
        bottom: "15%",
      },
      legend: {
        data: ["教师", "学生"],
        textStyle: {
          color: "#fff",
          align: "center",
          fontSize: 16,
        },
        x: "center",
      },
      xAxis: [
        {
          type: "category",
          // 轴线
          axisLine: {
            show: true,
            lineStyle: {
              color: "#85B1B4",
            },
          },
          // 轴刻度线
          axisTick: {
            show: false,
          },
          // 坐标轴名称
          axisLabel: {
            color: "#fff",
            margin: 6,
          },
          // 轴分隔线
          splitLine: {
            show: false,
          },
          // 轴两侧留白
          boundaryGap: ["5%", "5%"],
          data: this.apiData2.date,
        },
      ],
      yAxis: [
        {
          type: "value",
          min: 0,
          // max: 140,
          splitNumber: 4,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#85B1B4",
            },
          },
          axisLabel: {
            show: true,
            margin: 10,
            textStyle: {
              color: "#fff",
            },
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "教师",
          type: "line",
          showAllSymbol: true,
          symbol: "circle",
          symbolSize: 4,
          lineStyle: {
            normal: {
              color: "#FF8736",
            },
          },
          label: {
            show: false,
          },
          itemStyle: {
            color: "#FF8736",
            borderColor: "#FF8736",
            borderWidth: 2,
          },
          data: this.apiData2.data1, //data.values
        },
        {
          name: "学生",
          type: "line",
          showAllSymbol: true,
          symbol: "circle",
          symbolSize: 4,
          lineStyle: {
            normal: {
              color: "#13EFB7",
            },
          },
          label: {
            show: false,
          },
          itemStyle: {
            color: "#13EFB7",
            borderColor: "#13EFB7",
            borderWidth: 2,
          },
          // TODO: LinearGradient未定义
          // areaStyle: {
          //   normal: {
          //     color: new VChart.graphic.LinearGradient(
          //       0,
          //       0,
          //       0,
          //       1,
          //       [
          //         {
          //           offset: 0,
          //           color: "rgba(81,150,164,0.3)",
          //         },
          //         {
          //           offset: 1,
          //           color: "rgba(81,150,164,0)",
          //         },
          //       ],
          //       false
          //     ),
          //   },
          // },
          data: this.apiData2.data2, //data.values
        },
      ],
    };
    this.option3 = {
      backgroundColor: "#0A2E5D",
      legend: {
        data: this.apiData3.xAxis,
        type: "scroll",
        //icon: 'ret',
        height: "88%",
        left: "15%",
        bottom: "2",
        itemGap: 200,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          fontSize: "12",
          color: "#666",
        },
      },
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: [
        {
          show: false,
          left: "8%",
          top: "2%",
          bottom: "8%",
          containLabel: true,
          width: "25%",
        },
        {
          show: false,
          left: "50%",
          top: "2%",
          bottom: "8%",
          width: "0%",
        },
        {
          show: false,
          right: "8%",
          top: "2%",
          bottom: "8%",
          containLabel: true,
          width: "25%",
        },
      ],
      xAxis: [
        {
          type: "value",
          inverse: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        {
          gridIndex: 1,
          show: false,
        },
        {
          gridIndex: 2,
          type: "value",

          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: "category",
          inverse: true,
          position: "right",
          data: this.apiData3.xAxis,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        {
          gridIndex: 1,
          type: "category",
          inverse: true,
          position: "center",
          data: this.apiData3.xAxis,
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#666666", //X轴文字颜色
              fontSize: "12",
              align: "center",
            },
          },
          axisTick: {
            show: false,
          },
        },
        {
          gridIndex: 2,
          type: "category",
          inverse: true,
          position: "left",
          data: this.apiData3.xAxis,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "总数",
          type: "bar",
          barWidth: 8,
          itemStyle: {
            normal: {
              color: "#6D9BFF",
            },
          },
          // TODO: 渐变
          // itemStyle: {
          //   normal: {
          //     color: new VChart.graphic.LinearGradient(
          //       0,
          //       0,
          //       0,
          //       1,
          //       [
          //         {
          //           offset: 0,
          //           color: "#6D9BFF", // 0% 处的颜色
          //         },
          //         {
          //           offset: 1,
          //           color: "#2E64EF", // 100% 处的颜色
          //         },
          //       ],
          //       false
          //     ),
          //     barBorderRadius: [4, 0, 0, 4],
          //   },
          // },
          label: {
            show: true,
            position: "left",
          },
          data: this.apiData3.data1,
        },
        {
          xAxisIndex: 2,
          yAxisIndex: 2,
          name: "总数",
          type: "bar",
          barWidth: 8,
          itemStyle: {
            normal: {
              color: "#FFAF25",
            },
          },
          // TODO: 渐变
          // itemStyle: {
          //   normal: {
          //     color: new VChart.graphic.LinearGradient(
          //       0,
          //       0,
          //       0,
          //       1,
          //       [
          //         {
          //           offset: 0,
          //           color: "#FFAF25", // 0% 处的颜色
          //         },
          //         {
          //           offset: 1,
          //           color: "#E83D79", // 100% 处的颜色
          //         },
          //       ],
          //       false
          //     ),
          //     barBorderRadius: [0, 4, 4, 0],
          //   },
          // },
          label: {
            show: true,
            position: "right",
          },
          data: this.apiData3.data2,
        },
      ],
    };
  },
  data() {
    return {
      color: [
        "#00ffff",
        "#00cfff",
        "#006ced",
        "#ffe000",
        "#ffa800",
        "#ff5b00",
        "#ff3000",
      ],
      // TODO: 系统状态的 api 数据
      apiData1: {
        finishSta: [
          {
            name: "已批改",
            value: 10,
          },
          {
            name: "未批改",
            value: 6,
          },
        ],
        userType: [
          {
            name: "教师",
            value: 9,
          },
          {
            name: "学生",
            value: 62,
          },
        ],
        resource: [
          {
            name: "提问",
            value: 12,
          },
          {
            name: "课件",
            value: 9,
          },
          {
            name: "资料",
            value: 8,
          },
        ],
        questionSta: [
          {
            name: "答疑回复",
            value: 32,
          },
          {
            name: "开启的提问",
            value: 8,
          },
          {
            name: "关闭的提问",
            value: 4,
          },
        ],
      },
      // TODO: 活跃用户的 api 数据
      apiData2: {
        data1: [12, 8, 15, 6, 13, 9, 7],
        data2: [2, 1, 3, 1, 0, 2, 3],
        date: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      // TODO: 系统信息的 api 数据
      apiData3: {
        xAxis: [
          "（教师）用户（学生）",
          "（发布）作业（上交）",
          "（课件）课件资料（资料）",
          "（提问）答疑（回复）",
        ],
        // data1为：教师、发布、课件、提问
        data1: [11, 7, 9, 12],
        // data2为：学生、上交、资料、回复
        data2: [62, 16, 8, 32],
      },
      option1: null,
      option2: null,
      option3: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  &-status {
    flex: 1;
    &-headline {
      background-color: burlywood;
      padding: 10px 5px;
    }
    &-chart {
      height: 250px;
    }
  }
  &-last {
    flex: 1.2;
    display: flex;
    &-active {
      flex: 1;
      &-headline {
        background-color: burlywood;
        padding: 10px 5px;
      }
    }
    &-sys {
      flex: 1;
      &-headline {
        background-color: burlywood;
        padding: 10px 5px;
        margin: 0 0 0 2px;
      }
    }
  }
}
</style>
