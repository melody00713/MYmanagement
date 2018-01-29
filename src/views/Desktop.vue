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
    name: 'Desktop',
    data () {
      return {
        title: '桌面',
        loading: false,
        tableInfo: {
          orderName: 'name',
          order: 'asc',
          start: 0,
          pageSize: 5,
          status: '',
          all: '',
          page: 1,
        },
        total: 0,
        data: [],
        columns: [
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
            key: 'currentuser',
            ellipsis: true,
            render: (h, params) => {
              return h('span', params.row.currentuser || '-')
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
              this.tableInfo.status = a[0]
              this.tableInfo.page = 1
              this.tableInfo.start = 0
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
        API.desktopList(this.tableInfo).then(res => {
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
        this.getDataHandler()
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
