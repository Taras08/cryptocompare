<template>
<div class="global-model__chart chart">
    <p class="chart__title">USD | {{arrСurrency[activeСurrency]}}</p>   
    <div class="chart__hello" ref="chartdiv">
  </div>
</div>
  
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {mapGetters} from 'vuex'
am4core.useTheme(am4themes_animated);

export default {
  name: 'Chart',
  mounted() {
      this.getChart()
  },
  computed: {
      ...mapGetters(['arrСurrency','arrQuotation','activeСurrency'])
  },
  watch: {
      activeСurrency(val) {
          this.getChart()
      }
  },
   methods: {
       getChart() {
           let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

    chart.paddingRight = 5;

    let data = [];
    let visits = 0
    for (let i = 0; i < this.arrQuotation[this.activeСurrency].length - 1; i++) {
      visits = this.arrQuotation[this.activeСurrency][i].close
      data.push({ date: new Date(this.arrQuotation[this.activeСurrency][i].time * 1000), name: "name" + i, value: visits });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
       }
   },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
</script>

<style scoped lang='scss'>
.chart {
    text-align: center;
    background: white;
    &__title {
        margin: 0;
        margin-top: 5px;
    }
    &__hello {
        width: 100%;
        height: 80%;
    }
}
</style>