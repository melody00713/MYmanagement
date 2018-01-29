<template>
  <div class="page-terminal">
    <efPageMainLayout :title="title">
      <EfTable :total="total" :loading="loading" :columns="columns" :data="data" :info="tableInfo" @tableInfoChange="tableInfoChangeHandler">
        <Button type="ghost" class="table-operation-btn" @click="exportHandler">导出</Button>
      </EfTable>
    </efPageMainLayout>
  </div>
</template>

<script>
  import API from '../api/api'
  import Common from '../assets/js/common'
  import Table from '@/components/Table'
  import PageMainLayout from '@/components/PageMainLayout'
  export default {
    name: 'Log',
    data () {
      return {
        title: '日志',
        loading: false,
        tableInfo: {
          orderName: 'createtime',
          order: 'asc',
          start: 0,
          pageSize: 10,
          all: '',
          page: 1,
        },
        total: 0,
        data: [],
        columns: [
          {
            title: '时间',
            key: 'createtime',
            ellipsis: true
          },
          {
            title: '用户',
            key: 'username',
            sortable: true,
            ellipsis: true,
            render: (h, params) => {
              return h('span', params.row.username || '-')
            }
          },
          {
            title: '终端',
            key: 'terminalname',
            sortable: true,
            ellipsis: true,
            render: (h, params) => {
              return h('span', params.row.terminalname || '-')
            }
          },
          {
            title: '桌面',
            key: 'vmname',
            sortable: true,
            ellipsis: true,
            render: (h, params) => {
              return h('span', params.row.vmname || '-')
            }
          },
          {
            title: '操作',
            key: 'operator',
            ellipsis: true
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
        API.logList(this.tableInfo).then(res => {
          this.loading = false
          this.total = res.searchCount
          this.data = res.data
          this.data.map(val => {
            val.createtime = Common.formatterTime(val.createtime)
            return val
          })
        })
      },
      tableInfoChangeHandler() {
        this.getDataHandler()
      },
      exportHandler() {
        API.logExport(this.tableInfo)
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
  .table-operation-btn {
    border: 1px solid #3D70B2;
    color: #3D70B2;
  }
</style>
