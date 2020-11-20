<template>
  <div class="home-box">
    <div class="nav-item" v-for="item in nav_list" :key="item.url"><span>{{item.title}}</span></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      nav_list: [
        {
          title: 'TagCanvas',
          url: '/tagcanvas'
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style src="./index.less" lang="less"></style>