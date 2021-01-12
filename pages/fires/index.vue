<template>
  <section class="section">
    <br>
    <div class="container">
      <h2 class="title">
      FireObservatory
      </h2>
    </div>
      <section class="section">
      <div class="container is-size-3">
        <div class="content is-medium">
      <p>FireObservatory construction site testing</p>
    </div>
  </div>
  </section>
  <section>
    <div class="container">
        <world-m/>
        </div>
  </section>
  </section>

</template>
<script>
/* @flow */
import lonLats from '@/assets/geo/lonlats_fore.json'
import WorldM from '@/components/WorldM.vue'
import { mapGetters } from 'vuex'

export default {

  components: {
    WorldM: WorldM,
  },

  data() {
    return {
   }
  },

  created() {
  },

  computed: {

      ...mapGetters({
      }),

    },

    methods: {
    },

}
</script>
