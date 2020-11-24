<template>
  <div class="prize-banner-box">
    <swiper ref="mySwiper" v-if="is_show_banner" class="swiper" :options="swiper_options">
      <swiper-slide v-for="prize in prize_config" :key="prize._id">
        <div class="img-box" v-if="prize.img">
          <img :src="prize.img" alt="">
        </div>
        <div class="name-box" v-else>
          {{prize.name}}
        </div>
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" @click="swiperNavigate(1)" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" @click="swiperNavigate(-1)" slot="button-prev"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapGetters } = createNamespacedHelpers('tagCanvas')
import 'swiper/swiper-bundle.css'
export default {
  name: 'PrizeBanner',
  components: { Swiper, SwiperSlide },
  data() {
    return {
      is_show_banner: false,
      swiper_options: {}
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
    ...mapGetters(['current_prize_index']),
    ...mapState({
      prize_config: state => state.prize_config,
      pool_users: state => state.pool
    })
  },
  created() {

  },
  mounted() {
    window.document.addEventListener('keydown', this.bindKeyboardEvent)
    // mounted中初始化swiper -> data初始化先于cumputed，导致无法获取当前slideIndex
    this.initSwiperOptions()
  },
  beforeDestroy() {
    window.document.removeEventListener('keydown', this.bindKeyboardEvent)
  },
  methods: {
    ...mapMutations(['changeCurrentPrizeId', 'setViewStatus']),
    initSwiperOptions() {
      let vm = this
      this.swiper_options = {
        loop: true,
        initialSlide: this.current_prize_index,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChangeTransitionEnd: function() {
            vm.changeCurrentPrizeId(vm.prize_config[this.realIndex]._id)
          }
        }
      }
      this.is_show_banner = true
    },
    swiperNavigate(type) {
      if (type == 1) {
        this.swiper.slideNext()
      } else {
        this.swiper.slidePrev()
      }
    },
    bindKeyboardEvent(e) {
      let key_code = e.keyCode
      switch (key_code) {
        case 37:
          this.swiper.slidePrev()
          break
        case 39:
          this.swiper.slideNext()
          break
        // 进入抽奖
        case 32:
          if (this.pool_users.length) {
            this.setViewStatus(2)
          } else {
            this.$Message.error('请先添加参与人员')
          }
          break
        default:
          break
      }
    }
  }
}
</script>

<style src="./index.less" scoped lang="less"></style>