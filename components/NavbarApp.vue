<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="container">
    <div class="navbar-brand">
    </div>
  </div>
  </nav>
</template>
<script>
export default {
  name: 'NavbarApp',
  data() {
    return {
      msg: '',
      activator: false
    }
  },
  methods: {
    makeBurger() {
      this.activator = !this.activator
      console.log('burger', this.activator)
      return this.activator
    },
    toggleBurger() {
      if (this.activator) {
        this.activator = !this.activator
      }
    }
  }
}
</script>
<style lang="scss">
.ymca {
  color: $primary; // will be resolved to #333
}

</style>
