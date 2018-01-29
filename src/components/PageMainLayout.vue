<template>
<div class="page-layout">
  <Layout>
  <Header class="page-header">
  <p class="page-header-title">{{title}}</p>
  </Header>
  <Content class="page-content">
    <slot>空</slot>
  </Content>
  </Layout>
  </div>
  </template>

  <script>
import Table from '@/components/Table'
export default {
  name: 'PageMainLayout',
  props: ['title']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .page-layout {
    .page-header {
      height: 85px;
      background: #ECF0F7;
      border-bottom: 1px solid rgba(155,155,155,0.45);
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
      padding: 0 58px 20px;
    }
  }
</style>
