<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="container">
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item" active-class="is-active" exact @click.native="toggleBurger">
        <h1 class="is-size-5">
          <strong>indonesia</strong>
        </h1>
      </nuxt-link>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navMenu"
        :class="{ 'is-active': activator }"
        @click="makeBurger"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navMenu" class="navbar-menu" :class="{ 'is-active': activator }">
      <div class="navbar-start">
        <nuxt-link to="/fires" class="navbar-item" active-class="is-active" exact @click.native="toggleBurger">
          Fires
        </nuxt-link>

      </div>

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
