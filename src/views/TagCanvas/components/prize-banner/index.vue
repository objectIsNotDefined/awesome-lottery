<template>
  <div class="prize-banner-box">
    <swiper ref="mySwiper" class="swiper" :options="swiperOptions">
      <swiper-slide>
        <div class="prize-item">
          <img src="https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/52/527a3c33a8e97a8b58300ad87b1fdabb/%E3%80%90Web%E8%BD%AE%E6%92%AD%E3%80%91innovate2020.jpg" alt="">          
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="prize-item">
          <img src="https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/77/7776925affe4784c969f85729fb7e4a2/%E3%80%90Web%E8%BD%AE%E6%92%AD%E3%80%91%E8%B4%A8%E9%87%8F%E4%BA%BA%E5%91%98%E5%BF%85%E5%A4%87%E5%AE%9D%E5%85%B8-%E5%8E%82%E6%88%BF%E8%AE%BE%E6%96%BD%E7%AF%87.jpg" alt="">          
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="prize-item">
          <img src="https://bpy-store.oss-cn-hangzhou.aliyuncs.com/ppc/8b/8bcb5e722c43970f6c54e6ba6fd15843/%E3%80%90Web%E8%BD%AE%E6%92%AD%E3%80%91%E6%99%BA%E5%BA%93%E5%AD%A6%E9%99%A2.jpg" alt="">          
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="prize-item">
          <img src="https://img20.360buyimg.com/pop/s1180x940_jfs/t1/145834/13/2495/96928/5f077497E14f8644e/7122189e35b5e240.jpg.webp" alt="">          
        </div>
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" @click="swiperNavigate(1)" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" @click="swiperNavigate(-1)" slot="button-prev"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
export default {
  name: 'PrizeBanner',
  components: { Swiper, SwiperSlide },
  data() {
    return {
      swiperOptions: {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  created() {

  },
  mounted() {
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    swiperNavigate(type) {
      if (type == 1) {
        this.swiper.slideNext()
      } else {
        this.swiper.slidePrev()
      }
    }
  }
}
</script>

<style src="./index.less" scoped lang="less"></style>