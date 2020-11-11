<template>
    <div class="field">
      <div class="control">
      <div class="select is-primary" 
          v-click-outside="hide">
          <select v-model="selOption" @change="changeOption($event)">
              <option disabled value="">Please select</option>
              <option v-for="option in options" :value="option">
              {{ option }}
              </option>
          </select>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },

  props: {
    options: Array,
    selected: String
  },
  data() {
    return {
      selOption: this.selected,
      isActive: false
    }
  },

  mounted() {
    console.log('selector mounted')
  },
   
  methods: {
    hide() {
      if (this.isActive) {
        this.isActive = false
      }
    },

    changeOption(option) {
      let value = option.target.value
      console.log('option changed', value)
      this.$emit('updateOption', value)
    },

	setValue: function(selValue) {
    	this.selOption = selValue;      
    },
  },
  watch: {
    // whenever selected changes, this function will run
    selected: function (newSelected, oldSelected) {
    this.setValue(newSelected)
    }
  }
}
</script>
<style>
.field {
    display: inline-block;
}
</style>
