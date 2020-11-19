<template>
  <div class="tagcanvas-lottery-box">
    <ToolsBar></ToolsBar>
    <div class="content-body">
      <p class="lottery-title"><span>幸运大抽奖</span></p>
      <template v-if="pool_users.length && pool_users.length">
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
      prize_config: state => state.prize_config
    })
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      initPageData: 'initStatus'
    })
  }
}
</script>

<style src="./index.less" lang="less"></style>