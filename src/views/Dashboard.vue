<template>
  <div class="page-dashboard-warpper">
    <Card class="dashboard-card">
      <Row>
        <Col span="8">
          <p class="card-title">终端运行状况</p>
          <div class="card-chart-warpper">
            <EfPieChart :height="chartHeight" :data="data.terminal" id="terminalchart" name="终端" ref="terminalChart"/>
          </div>
        </Col>
        <Col span="16">
          <p class="card-title">终端设备 <router-link to="/terminal">更多</router-link></p>
          <div class="card-chart-warpper scroll" ref="terChartWarpper">
            <EfTable :height="tableMaxHeight" :total="terTotal" :loading="terLoading" simple :columns="terColumns" :data="terData" :info="terTableInfo" @tableInfoChange="tableInfoChangeHandler('Terminal')"/>
          </div>
        </Col>
      </Row>
    </Card>
    <Card class="dashboard-card">
      <Row>
        <Col span="8">
          <p class="card-title">桌面运行状况</p>
          <div class="card-chart-warpper">
            <EfPieChart :height="chartHeight" :data="data.vm" id="vmchart" name="桌面" ref="vmChart"/>
          </div>
        </Col>
        <Col span="16">
          <p class="card-title">桌面列表 <router-link to="/desktop">更多</router-link></p>
          <div class="card-chart-warpper scroll">
            <EfTable :height="tableMaxHeight" :total="vmTotal" :loading="vmLoading" simple :columns="vmColumns" :data="vmData" :info="vmTableInfo" @tableInfoChange="tableInfoChangeHandler('Desktop')"/>
          </div>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import API from '../api/api'
import Table from '@/components/Table'
import PieChart from '@/components/PieChart'
export default {
  name: 'Dashboard',
  data () {
    return {
      data: {
        terminal: {
          offline: 0,
          online: 0
        },
        vm: {
          offline: 0,
          online: 0
        }
      },
      terTableInfo: {
        orderName: 'name',
        order: 'asc',
        start: 0,
        pageSize: 0,
        status: '',
        all: '',
        page: 1,
      },
      terCoading: false,
      terData: [],
      terColumns: [
        {
          title: '终端',
          key: 'name',
          sortable: 'custom',
          ellipsis: true,
          render: (h, params) => {
            return h('router-link', {
              props: {
                to: `/terminal/detail/${params.row.id}`
              }
            }, params.row.name)
          }
        },
        {
          title: '用户',
          key: 'lastloginuser',
          ellipsis: true,
          render: (h, params) => {
            return h('span', params.row.lastloginuser || '-')
          }
        },
        {
          title: '在线时长',
          key: 'onlinetime',
          ellipsis: true,
          render: (h, params) => {
            return h('span', params.row.status === 'Up' && this.Common.calcOnlineTime(params.row.laststarttime) || '-')
          }
        },
        {
          title: '状态',
          key: 'status',
          ellipsis: true,
          filters: [
            {
              label: '运行',
              value: 'Up'
            },
            {
              label: '关机',
              value: 'Down'
            }
          ],
          filterMultiple: false,
          filterRemote: (a, b, c) => {
            this.terTableInfo.status = a[0]
            this.terTableInfo.page = 1
            this.terTableInfo.start = 0
          },
          render: (h, params) => {
            return h('span',
              [
                h('i', {
                  attrs: {
                    class: `icon-status ${params.row.status}`
                  }
                }),
                h('span', this.Common.statusCN(params.row.status))
              ])
          }
        }
      ],
      vmTableInfo: {
        orderName: 'name',
        order: 'asc',
        start: 0,
        pageSize: 0,
        status: '',
        all: '',
        page: 1,
      },
      vmCoading: false,
      vmData: [],
      vmColumns: [
        {
          title: '虚拟机',
          key: 'name',
          sortable: true,
          ellipsis: true,
          render: (h, params) => {
            return h('router-link', {
              props: {
                to: `/desktop/detail/${params.row.id}`
              }
            }, params.row.name)
          }
        },
        {
          title: '用户',
          key: 'age',
          ellipsis: true,
          render: (h, params) => {
            return h('span', params.row.lastloginuser || '-')
          }
        },
        {
          title: '在线时长',
          key: 'onlinetime',
          ellipsis: true,
          render: (h, params) => {
            return h('span', params.row.status === 'Up' && this.Common.calcOnlineTime(params.row.laststarttime) || '-')
          }
        },
        {
          title: '状态',
          key: 'status',
          filters: [
            {
              label: '运行',
              value: 'Up'
            },
            {
              label: '关机',
              value: 'Down'
            }
          ],
          filterMultiple: false,
          filterRemote: (a, b, c) => {
            this.vmTableInfo.status = a[0]
            this.vmTableInfo.page = 1
            this.vmTableInfo.start = 0
          },
          render: (h, params) => {
            return h('span',
              [
                h('i', {
                  attrs: {
                    class: `icon-status ${params.row.status}`
                  }
                }),
                h('span', this.Common.statusCN(params.row.status))
              ])
          }
        }
      ],
      terLoading: false,
      vmLoading: false,
      terTotal: 0,
      vmTotal: 0,
      chartHeight: 200,
      tableMaxHeight: 200
    }
  },
  components: {
    EfTable: Table,
    EfPieChart: PieChart
  },
  methods: {
    getDataHandler(loop) {
      this.chartHeight = this.$refs.terChartWarpper.offsetHeight
      const TableCel = Math.floor((this.$refs.terChartWarpper.offsetHeight - 106) / 50)
      if (TableCel > 0) {
        this.terTableInfo.pageSize = this.vmTableInfo.pageSize = TableCel
        this.tableMaxHeight = this.$refs.terChartWarpper.offsetHeight - 106
      } else {
        this.terTableInfo.pageSize = this.vmTableInfo.pageSize = 1
      }
      this.getChartData()
      if(loop) {
        this.getTerminalData(loop)
        this.getDesktopData(loop)
      }
    },
    getChartData() {
      API.dashboardData().then(res => {
        this.data = res
      })
    },
    getTerminalData(loop) {
      if(!loop) this.terLoading = true
      API.terminalList(this.terTableInfo).then(res => {
        this.terLoading = false
        this.terTotal = res.searchCount
        this.terData = res.data
      })
    },
    getDesktopData(loop) {
      if(!loop) this.vmLoading = true
      API.desktopList(this.vmTableInfo).then(res => {
        this.vmLoading = false
        this.vmTotal = res.searchCount
        this.vmData = res.data
      })
    },
    tableInfoChangeHandler(name) {
      this[`get${name}Data`]()
    }
  },
  mounted: function () {
    this.$nextTick(_ => {
      window.onresize = () => {
        return (() => {
          this.getDataHandler()
        })()
      }
      this.getDataHandler()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .page-dashboard-warpper {
    padding: 20px;
  }
  .dashboard-card {
    height: calc(~'100% / 2 - 10px');
    border: none;
    &:hover {
      box-shadow: none;
    }
    .card-title {
      font-size: 20px;
      color: #2D3F49;
      margin-bottom: 30px;
      a {
        margin-left: 40px;
        font-size: 14px;
        color: #3D70B2;
        text-decoration: underline;
      }
    }
    .ivu-row, .ivu-col {
      height: 100%;
    }
    .card-chart-warpper {
      height: calc(~'100% - 60px');
      /*&.scroll{*/
        /*overflow-y: auto;*/
      /*}*/
    }
  }
  .dashboard-card + .dashboard-card {
    margin-top: 20px;
  }
</style>
