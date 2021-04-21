<template>
  <div class="map-demo-container">
     map-demo-container
     <!-- 1.  为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div ref="main" id="main" style="width: 600px;height:400px;"></div>
 </div>
</template>

<script>
// 2. 加载 echarts
import echarts from 'echarts'
export default {
  // 指定 name 选项的另一个好处是便与调试
  // 有名字的组件有更好的警告信息
  // 另外，当在有 vue-devtools, 未命名组件将显示成 <AnonymousComponent>, 这很没有语义。 通过提供 name 选项， 可以获得更有语义信息的组件树。
  // 结论： 给一个组件起个名字是非常有意义的， 尽量不要让组件的名字重复
  name: 'MapDemo',
  data () {
    return {

    }
  },
  props: {

  },
  components: {
  },
  mounted () {
  // 3. 基于准备好的dom， 初始化echarts实例
  // var myChart = echarts.init(document.getElementById('main'));
    var myChart = echarts.init(this.$refs.main)
    // 注意： 初始化 DOM  一定要写到 mounted 钩子函数中
    // 指定图表的配置项和数据
    // 4 逻辑 ....
    // 5 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(option)
  },
  methods: {

  }
}
</script>

<style lang='less'>
</style>
