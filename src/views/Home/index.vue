<template>
  <div class="home-box">
    <div class="nav-item" @click="navigatorAction(item)" v-for="item in nav_list" :key="item.url"><span>{{item.title}}</span></div>
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
    navigatorAction(nav) {
      this.$router.push(nav.url)
    }
  }
}
</script>

<style src="./index.less" lang="less"></style>