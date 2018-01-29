<template>
  <div class="page-terminal" :loading="loading">
    <efPageDetailLayout :data="data">
      <div slot="info">
        <efDetailInfo type="desktop" :data="data"/>
      </div>
      <div slot="event">
        <efDetailEvent :data="eventData" @nextPageHandler="eventNextPageHandler" />
      </div>
    </efPageDetailLayout>
  </div>
</template>

<script>
  import API from '../api/api'
  import PageDetailLayout from '@/components/PageDetailLayout'
  import DetailInfo from '@/components/DetailInfo'
  import DetailEvent from '@/components/DetailEvent'
  export default {
    name: 'DesktopDetail',
    data () {
      return {
        data: {},
        eventData: [],
        eventInfo: {
          vmid: this.$route.params.id,
          start: 0,
          pageSize: 5
        }
      }
    },
    components: {
      efPageDetailLayout: PageDetailLayout,
      efDetailInfo: DetailInfo,
      efDetailEvent: DetailEvent
    },
    methods: {
      getDataHandler() {
        API.desktopDetail(this.$route.params.id).then(res => {
          this.data = res
        })
        this.getLogHandler()
      },
      getLogHandler() {
        API.desktopLog(this.eventInfo).then(res => {
          var preData = this.eventInfo.start !== 0 ? this.eventData.data : []
          res.data = preData.concat(res.data)
          this.eventData = res
        })
      },
      eventNextPageHandler() {
        this.eventInfo.start += this.eventInfo.pageSize
        this.getLogHandler()
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
