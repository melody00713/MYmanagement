<template>
  <div>
    <div class="table-tool" v-if="!simple">
      <Form ref="infoForm" :model="info" inline style="display: inline-block">
        <FormItem>
          <Select v-model="info.pageSize" style="width: 60px;">
            <Option v-for="item in pageLength" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <span class="table-info">每页显示 {{info.pageSize}} 条</span>
          <span class="table-info">{{info.page}} / {{Math.ceil(total / info.pageSize)}} 页</span>
          <span class="table-info">共 {{total}} 条数据</span>
        </FormItem>
        <FormItem>
          <Input type="text" v-model="info.all" icon="ios-search-strong" placeholder="请输入搜索内容" />
        </FormItem>
      </Form>
      <div class="table-operations">
        <slot></slot>
      </div>
    </div>
    <div class="table-warpper">
      <Table
        :loading="loading"
        stripe
        :height="height"
        :columns="columns"
        :data="data"
        @on-sort-change="tableSortChangeHandler"
      />
      <Page
        :total="total"
        :current="info.page"
        :page-size="info.pageSize"
        @on-change="pageChangeHandler"
        size="small"
        style="margin: 15px 30px; text-align: right;"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'EfTable',
  props: {
    columns: Array,
    data: Array,
    info: Object,
    height: Number,
    loading: Boolean,
    total: Number,
    simple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageLength: [5, 10, 15, 20]
    }
  },
  watch: {
    'info': {
      handler (val) {
        this.$emit('tableInfoChange', val)
      },
      deep: true
    }
  },
  methods: {
    pageChangeHandler(page) {
      this.info.page = page
      this.info.start = (page - 1) * this.info.pageSize
    },
    tableSortChangeHandler(column) {
      column.order = column.order !== 'normal' ? column.order : 'asc'
      this.info.orderName = column.key
      this.info.order= column.order
    }
  }
}
</script>
<style scoped lang="less">
  .table-tool {
    height: 80px;
    padding: 23px 0;
  }
  .table-info {
    font-size: 14px;
    color: #4A4A4A;
    padding: 0 10px;
    &:first-child {
      border-right: 1px solid #bcb6b6;
    }
  }
  .table-operations {
    float: right;
  }
  .table-warpper {
    border: 1px solid #CECECE;
    background: #ffffff;
  }
  .ivu-form-inline .ivu-form-item {
    margin-bottom: 0;
  }
</style>
