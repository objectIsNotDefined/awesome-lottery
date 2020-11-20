<template>
  <div class="tagcanvas-lottery-box">
    <ToolsBar></ToolsBar>
    <div class="content-body">
      <p class="lottery-title"><span>{{lottery_basic_info.title || '幸运抽奖'}}</span></p>
      <template v-if="prize_config.length">
        <PrizeBanner v-if="current_view == 1"></PrizeBanner>
        <LockDraw v-else></LockDraw>
      </template>
    </div>
  </div>
</template>

<script>
import PrizeBanner from './components/prize-banner'
import ToolsBar from './components/tools-bar'
import LockDraw from './components/luck-draw'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('tagCanvas')
export default {
  name: 'TagCanvas',
  components: { PrizeBanner, ToolsBar, LockDraw },
  data() {
    return {
      
    }
  },
  created() {
    this.initPageData()
  },
  computed: {
    ...mapState({
      current_view: state => state.current_view,
      pool_users: state => state.pool,
      prize_config: state => state.prize_config,
      lottery_basic_info: state => state.basic
    })
  },
  watch: {
    prize_config: {
      handler: function() {
        this.refreashPageStatus()
      },
      deep: true
    },
    'lottery_basic_info.title': {
      handler: function() {
        document.title = this.lottery_basic_info.title || 'Awesome Lottery'
      },
      immediate: true
    }
  },
  mounted() {
    if (this.prize_config.length == 0) {
      this.$Notice.warning({
        title: '提示',
        desc: '请先添加奖品'
      })
    }
    if (this.pool_users.length == 0) {
      this.$Notice.warning({
        title: '提示',
        desc: '请先添加参与人员'
      })
    }
  },
  methods: {
    ...mapActions({
      initPageData: 'initStatus',
      refreashPageStatus: 'refreashPageStatus'
    })
  }
}
</script>

<style src="./index.less" lang="less"></style>