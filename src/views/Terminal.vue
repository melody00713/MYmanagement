<template>
  <div class="page-terminal">
    <efPageMainLayout :title="title">
      <EfTable :total="total" :loading="loading" :columns="columns" :data="data" :info="tableInfo" @tableInfoChange="tableInfoChangeHandler"/>
    </efPageMainLayout>
  </div>
</template>

<script>
import API from '../api/api'
import Table from '@/components/Table'
import PageMainLayout from '@/components/PageMainLayout'
export default {
  name: 'Terminal',
  data () {
    return {
      title: '终端',
      loading: false,
      tableInfo: {
        orderName: 'status',
        order: 'desc',
        start: 0,
        status: '',
        pageSize: 10,
        all: '',
        page: 1
      },
      total: 0,
      data: [],
      columns: [
        {
          title: '终端',
          key: 'name',
          sortable: 'custom',
          ellipsis: true,
          render: (h, params) => {
            const value = params.row.name
            return h('Tooltip', {
              props: {
                placement: 'top-start',
                content: value
              }
            }, [
              h('router-link', {
                props: {
                  to: `/terminal/detail/${params.row.id}`
                }
              }, value)
            ]);
          }
        },
        {
          title: '部门',
          key: 'department',
          ellipsis: true,
          render: (h, params) => {
            const value = params.row.department || '-';
            return h('Tooltip', {
              props: {
                placement: 'top-start',
                content: value
              }
            }, [
              h('span', value)
            ]);
          }
        },
        {
          title: '用户',
          key: 'activeuser',
          ellipsis: true,
          render: (h, params) => {
            const value = params.row.activeuser || '-'
            return h('Tooltip', {
              props: {
                placement: 'top-start',
                content: value
              }
            }, [
              h('span', value)
            ]);
          }
        },
        {
          title: '在线时长',
          key: 'onlinetime',
          ellipsis: true,
          render: (h, params) => {
            const value = params.row.status === 'Up' && this.Common.calcOnlineTime(params.row.laststarttime) || '-'
            return h('Tooltip', {
              props: {
                placement: 'top-start',
                content: value
              }
            }, [
              h('span', value)
            ]);
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
            this.tableInfo.status = a[0]
            this.tableInfo.page = 1
            this.tableInfo.start = 0
          },
          render: (h, params) => {
            const value = this.Common.statusCN(params.row.status)
            return h('Tooltip', {
              props: {
                placement: 'top-start',
                content: value
              }
            }, [
              h('span',
                [
                  h('i', {
                    attrs: {
                      class: `icon-status ${params.row.status}`
                    }
                  }),
                  h('span', value)
                ])
            ]);
          }
        }
      ]
    }
  },
  components: {
    EfTable: Table,
    efPageMainLayout: PageMainLayout
  },
  methods: {
    getDataHandler(loop) {
      if(!loop) this.loading = true
      API.terminalList(this.tableInfo).then(res => {
        this.loading = false
        this.total = res.searchCount
        this.data = res.data
      })
    },
    tableInfoChangeHandler() {
      this.getDataHandler()
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      this.getDataHandler(true)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
