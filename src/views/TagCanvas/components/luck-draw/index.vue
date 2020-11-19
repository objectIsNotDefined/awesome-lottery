<template>
  <div class="luck-draw-box" ref="luckDrawBox">
    <div id="tags"><ul><li v-for="item in pool_users" :key="item.user_id"><a href="javascript:;">{{item.user_name}}</a></li></ul></div>
    <div class="handle-box">
      <p class="title">本轮奖品</p>
      <p class="content">{{current_prize.name}}</p>
      <p class="title">抽取人数</p>
      <p class="content">{{current_prize.count}}</p>
      <div class="handle-btn" :class="{is_drawing: current_view == 3}" @click="onHandleBtn">{{current_view == 2? '开始抽奖' : current_view == 3? '立即开奖' : '开始下一轮'}}</div>
    </div>
    <div class="result-box" v-if="current_view == 4">
      <p class="title">中奖结果</p>
      <p class="handle-bar">
        <span @click="moreOne">补抽一次</span>
        <span @click="nextPrize">开始下一轮</span>
      </p>
      <ul class="records-list">
        <li v-for="(item, index) in current_prize_records" :key="index"><span>{{item.user_name}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import './../../assets/tagcanvas.js'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapGetters, mapActions } = createNamespacedHelpers('tagCanvas')
export default {
  name: 'LuckDraw',
  data() {
    return {
      is_more_one: false
    }
  },
  computed: {
    ...mapState({
      pool_users: state => state.pool,
      current_view: state => state.current_view
    }),
    ...mapGetters(['current_prize', 'current_prize_records'])
  },
  watch: {
    pool_users() {
      TagCanvas.Reload('rootcanvas') // eslint-disable-line
    }
  },
  created() {
    this.initPageStatus()
  },
  mounted() {
    this.initTagCanvas()
    window.document.addEventListener('keydown', this.bindKeyboardEvent)
  },
  beforeDestroy() {
    window.document.removeEventListener('keydown', this.bindKeyboardEvent)
  },
  methods: {
    ...mapMutations(['setViewStatus', 'createRecordItem']),
    ...mapActions(['getLuckyGuy']),
    initPageStatus() {
      if (this.current_prize_records.length) {
        this.setViewStatus(4)
      }
    },
    initTagCanvas() {
      const canvas = document.createElement('canvas')
      canvas.width = this.$refs['luckDrawBox'].clientWidth - 240
      canvas.height = this.$refs['luckDrawBox'].clientHeight
      canvas.id = 'rootcanvas'
      this.$refs['luckDrawBox'].appendChild(canvas)
      // 初始化滚动效果
      TagCanvas.Start('rootcanvas', 'tags', { // eslint-disable-line
				textColour: '#5EEED9',
				outlineColour: '#5EEED9',
        reverse: true,
        weight: true,
        weightMode: 'both',
        maxSpeed: 0.3,
        zoom: 1.1,
        wheelZoom: false,
        initial: [0.02, -0.04],
        lock: 'xy',
        noSelect: true,
      })
    },
    // 处理按钮事件
    onHandleBtn() {
      // 开始抽奖
      if (this.current_view == 2) {
        TagCanvas.SetSpeed('rootcanvas', [0.15, -.3])  // eslint-disable-line
        this.setViewStatus(3)
      }
      // 显示抽奖结果
      else if (this.current_view == 3) {
        TagCanvas.SetSpeed('rootcanvas', [0.02, -0.04])  // eslint-disable-line
        this.getLuckyGuy(this.is_more_one? 1 : 0)
        this.setViewStatus(4)
        this.is_more_one = false
      }
    },
    // 补抽一次
    moreOne() {
      TagCanvas.SetSpeed('rootcanvas', [0.15, -.3])  // eslint-disable-line
      this.setViewStatus(3)
      this.is_more_one = true
    },
    // 下一轮
    nextPrize() {
      this.setViewStatus(1)
    },
    bindKeyboardEvent(e) {
      let key_code = e.keyCode
      switch (key_code) {
        // 切换操作按钮
        case 32:
          this.onHandleBtn()
          break
        // 补抽一次
        case 77:
          this.current_view == 4 && this.moreOne()
          break
        case 78:
          this.current_view == 4 && this.nextPrize()
          break
        default:
          break
      }
    }
  }
}
</script>

<style src="./index.less" scoped lang="less"></style>