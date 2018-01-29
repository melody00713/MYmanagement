<template>
  <div class="detail-info-warpper">
    <p class="detail-info-item">
      <span class="detail-info-label">名称：</span>
      <span class="detail-info-content">{{data.name}}</span>
    </p>
    <p class="detail-info-item">
      <span class="detail-info-label">用户：</span>
      <span class="detail-info-content">{{data.activeuser || data.currentuser || '-'}}</span>
    </p>
    <p class="detail-info-item">
      <span class="detail-info-label">在线时长：</span>
      <span class="detail-info-content">{{data.status === 'Up' ? Common.calcOnlineTime(data.laststarttime) : '-'}}</span>
    </p>
    <p class="detail-info-item">
      <span class="detail-info-label">{{ type === 'desktop' ? '配置' : 'MAC地址'}}：</span>
      <span class="detail-info-content">{{(type === 'desktop' ? data.numOfCpus : data.mac) || '-'}}</span>
    </p>
    <p class="detail-info-item">
      <span class="detail-info-label">IP：</span>
      <span class="detail-info-content">{{data.ip || '-'}}</span>
    </p>
  </div>
</template>
<script>
  export default {
    name: 'DetailInfo',
    props: ['data', 'type']
  }
</script>
<style scoped lang="less">
.detail-info-item {
  line-height: 45px;
  font-size: 14px;
}
.detail-info-label {
  text-align: right;
  color: #5A6872;
  width: 90px;
  display: inline-block;
}
.detail-info-content {
  color: #2D3F49;
}
</style>
