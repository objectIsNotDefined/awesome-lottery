<template>
  <div class="tagcanvas-lottery-box">
    <ToolsBar></ToolsBar>
    <PrizeBanner v-if="current_view == 1"></PrizeBanner>
  </div>
</template>

<script>
import PrizeBanner from './components/prize-banner'
import ToolsBar from './components/tools-bar'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('tagCanvas')
export default {
  name: 'TagCanvas',
  components: { PrizeBanner, ToolsBar },
  data() {
    return {
      
    }
  },
  created() {
    this.initPageData()
  },
  computed: {
    ...mapState({
      current_view: state => state.current_view
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