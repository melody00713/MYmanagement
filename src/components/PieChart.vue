<template>
  <div :id="id" :style="{height: height + 'px'}"></div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    name: 'PieChart',
    props: ['data', 'id', 'name', 'height'],
    watch: {
      data: {
        handler (val) {
          this.drawChartHandler()
        },
        deep: true
      },
      height () {
        setTimeout(() => {
          this.chart.resize()
        }, 50)
      }
    },
    methods: {
      drawChartHandler() {
        const _this = this
        !this.chart && (this.chart = echarts.init(document.getElementById(_this.id)))
        this.chart.setOption(
          {
            baseOption: {
              color: ['#41D6C3', '#AFB9C8'],
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}:  {c}"
              },
              legend: {
                orient: 'vertical',
                x: '7%',
                y: 'middle',
                align: 'right',
                itemGap: 40,
                formatter: function (name) {
                  const value = name === '运行' ? _this.data.online : _this.data.offline
                  return value + '  ' + name
                },
                textStyle: {
                  color: '#2D3F49',
                  fontSize: 14
                },
                data:[{
                  name: '运行',
                  icon: 'circle'
                },{
                  name: '关机',
                  icon: 'circle'
                }]
              },
              series: [
                {
                  name: _this.name,
                  type:'pie',
                  radius: ['70%', '76%'],
                  hoverOffset: 3,
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: true,
                      formatter: function (params) {
                        return (['{a|' + (parseInt(_this.data.online) + parseInt(_this.data.offline)) + '}', '{b|' + _this.name + '}'].join('\n'))
                      },
                      position: 'center',
                      rich: {
                        a: {
                          fontSize: 42,
                          color: '#152934',
                          lineHeight: 50
                        },
                        b: {
                          fontSize: 14,
                          color: '#2D3F49',
                          lineHeight: 50
                        }
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data:[
                    {value:_this.data.online, name:'运行'},
                    {value:_this.data.offline, name:'关机'}
                  ]
                }
              ]
            },
            media: [
              {
                query: {
                  maxHeight: 210
                },
                option: {
                  legend: {
                    itemHeight: 12,
                    itemWidth: 12,
                    textStyle: {
                      fontSize: 12,
                    }
                  },
                  series: [
                    {
                      label: {
                        normal: {
                          rich: {
                            a: {
                              fontSize: 30,
                              color: '#152934',
                              lineHeight: 40
                            },
                            b: {
                              fontSize: 14,
                              color: '#2D3F49',
                              lineHeight: 40
                            }
                          }
                        }
                      }
                    }
                  ]
                }
              },
              {
                query: {
                  maxAspectRatio: 1.6
                },
                option: {
                  legend: {
                    x: '2%',
                    itemHeight: 12,
                    itemWidth: 12,
                    textStyle: {
                      fontSize: 12,
                    }
                  },
                  series: [
                    {
                      center: ['65%', '50%'],
                      radius: ['60%', '65%'],
                      label: {
                        normal: {
                          rich: {
                            a: {
                              fontSize: 30,
                              color: '#152934',
                              lineHeight: 40
                            },
                            b: {
                              fontSize: 14,
                              color: '#2D3F49',
                              lineHeight: 40
                            }
                          }
                        }
                      }
                    }
                  ]
                }
              },
            ]
          }
        )
      }
    },
    mounted() {
      this.$nextTick(_ => {
        this.drawChartHandler()
      })
    }
  }
</script>
<style scoped lang="less">

</style>
