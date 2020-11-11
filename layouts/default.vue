<template>
  <div>
    <Navbar />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/NavbarApp.vue'
import Footer from '@/components/FooterApp.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
<style>
html,
body {
  height: 100%;
  text-rendering: optimizeLegibility;
  margin: 0;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
