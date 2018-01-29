<template>
  <div class="detail-event-warpper">
    <p class="detail-event-num">事件总数：{{data.searchCount || 0}}</p>
    <Timeline>
      <TimelineItem v-for="item in data.data" :key="item.id">
        <Icon type="ios-information-outline" class="timeline-icon" slot="dot"></Icon>
        <p class="time">{{item.createtime | timer('second')}}</p>
        <p class="date">{{item.createtime | timer('day')}}</p>
        <p class="content">{{(item.username ? `用户"${item.username}"` : '') + item.operator}}</p>
      </TimelineItem>
      <TimelineItem v-show="data.searchCount > data.start + data.pageSize"><a @click="nextPageHandler">查看更多</a></TimelineItem>
      <TimelineItem>
        <Icon type="" class="timeline-icon" slot="dot"></Icon>
      </TimelineItem>
    </Timeline>
  </div>
</template>
<script>
  export default {
    name: 'DetailEvent',
    props: ['data'],
    methods: {
      nextPageHandler() {
        this.$emit('nextPageHandler')
      }
    }
  }
</script>
<style scoped lang="less">
  .detail-event-num {
    font-size: 14px;
    line-height: 34px;
    color: #5A6872;
    margin: 15px 0 25px;
  }
  .timeline-icon {
    color: #5AAAFA;
    font-size: 26px;
  }
  .time {
    font-size: 16px;
    font-weight: bolder;
    color: #2D3F49;
    line-height: 22px;
    margin-top: -3px;
    margin-bottom: 4px;
  }
  .date {
    font-size: 12px;
    line-height: 18px;
    color: #4A4A4A;
  }
  .content {
    margin-top: 15px;
    font-size: 14px;
    color: #152934;
    line-height: 18px;
  }
</style>
