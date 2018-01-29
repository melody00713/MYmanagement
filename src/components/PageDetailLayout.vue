<template>
  <div class="page-detail">
    <Layout>
      <Header class="page-header">
        <a @click="linkBackHandler" class="page-header-back"><Icon type="arrow-left-c"></Icon>返回</a>
        <p class="page-header-info">{{data.name}} <span class="page-header-info-status">状态：<i :class="`icon-status ${data.status}`"></i>{{Common.statusCN(data.status)}}</span></p>
      </Header>
      <Content class="page-content">
        <Tabs value="info">
          <TabPane label="基本信息" name="info">
            <slot name="info">空</slot>
          </TabPane>
          <TabPane label="事件" name="event">
            <slot name="event">空</slot>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  </div>
</template>

<script>
  import Table from '@/components/Table'
  export default {
    name: 'PageDetailLayout',
    props: ['data'],
    methods: {
      linkBackHandler() {
        this.$router.go(-1);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .page-detail{
    .page-header {
      height: 85px;
      background: #ECF0F7;
      padding: 40px 58px 0;
      box-sizing: border-box;
    }

    .page-header-title {
      font-size: 20px;
      color: #2D3F49;
      line-height: 20px;
      margin: 0;
    }

    .page-content {
      .ivu-tabs-tabpane {
        padding: 0 58px;
      }
    }

    .page-header-back {
      position: absolute;
      margin-top: -40px;
      margin-left: -20px;
      font-size: 14px;
      color: #3D70B2;
      .ivu-icon-arrow-left-c {
        margin-right: 10px;
      }
    }

    .page-header-info {
      font-size: 21px;
      color: #152934;
      height: 50px;
      line-height: 50px;
    }

    .page-header-info-status {
      font-size: 12px;
      color: #212121;
      margin-left: 20px;
      vertical-align: middle;
      :global {
        .icon-status {
          width: 8px;
          height: 8px;
          margin-left: 8px;
        }
      }
    }
  }
</style>
