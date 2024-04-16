<template>
  <div class="container">
    <div class="echarts-container" ref="chartContainer"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 使用必要的组件
echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]);

export default {
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chartContainer = this.$refs.chartContainer;
      const chart = echarts.init(chartContainer);
      
      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }]
      };

      chart.setOption(option);
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.echarts-container {
  width: 80%;
  height: 300px; /* 设置容器高度 */
}
</style>
