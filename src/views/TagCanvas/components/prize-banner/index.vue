<template>
  <div class="prize-banner-box">
    <swiper ref="mySwiper" class="swiper" :options="swiperOptions">
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
    <Button type="primary" class="enter-btn" @click="setViewStatus(2)">进入抽奖</Button>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('tagCanvas')
import 'swiper/swiper-bundle.css'
export default {
  name: 'PrizeBanner',
  components: { Swiper, SwiperSlide },
  data() {
    let vm = this
    return {
      swiperOptions: {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChangeTransitionEnd: function() {
            vm.changeCurrentPrizeIndex(vm.prize_config[this.realIndex]._id)
          }
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
    ...mapState({
      prize_config: state => state.prize_config
    })
  },
  created() {

  },
  mounted() {
    window.document.addEventListener('keydown', this.bindKeyboardEvent)
  },
  beforeDestroy() {
    window.document.removeEventListener('keydown', this.bindKeyboardEvent)
  },
  methods: {
    ...mapMutations(['changeCurrentPrizeIndex', 'setViewStatus']),
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
          this.setViewStatus(2)
          break
        default:
          break
      }
    }
  }
}
</script>

<style src="./index.less" scoped lang="less"></style>