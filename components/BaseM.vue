<template>
    <div class="box">
     <!-- Inner Content -->
      <svg
        style="overflow: hidden;"
        width="100%"
        height="100%"
        class="pan-zoom"
        :zoom-transform="zoomTransform"
        :mapData="mapData"
        :viewBox="viewBoxString"
      >

        <g v-bind="transformProp">
          <path
            :fill="colorBack"
            stroke="#909090"
            stroke-width="0.5"
            :d="d()"
          />
          <rect 
            v-for="(item, index) in coords"
            :key="index"
            :x="item[0][0]"
            :y="item[0][1]"
            width="3.4"
            height="3.4"
            :fill="item[1]"
          />

        </g>
      <g>
        <text
          y="192"
          fill="#202020"
          x=15
          font-size="12px"
          > {{ getLabel }}</text>

        <rect
          v-for="(item, index) in colorScale.range()"
          :key="index"
          :x="getlinScale(index - 1) + 7"
          y="210"
          width="31"
          height="10"
          :fill="item"
        />
        <text
          v-for="(item, index) in mapData.thresholds"
          y="205"
          fill="#202020"
          :x="getlinScale(index) - mapData.shift"
          font-size="10px"
          >{{ item }}</text>
      </g>

 
      </svg>
    </div>
</template>

<script>
import * as d3 from 'd3'
import { event, zoom, zoomIdentity } from 'd3'
import * as topojson from 'topojson-client'
import dataset from '@/assets/geo/ind_topo_simp_quant.json'

// const land = topojson.feature(dataset, dataset.objects.IDN_adm1_lon_lat)
const land = topojson.feature(dataset, dataset.objects.ind_geojson)
export default {

  props: {
    zoomTransform: {
      type: Object,
        },
      mapData: {
          type: Object,
      }
  },

  data() {
    return {
      colorBack: String,
      colorScale: null,
      coords: [],
      land: null,
      dimensions: {
        width: 610,
        height: 225
        // viewBox: '0 0 700 700'
      },
      transformProp: null,
      selection: null,
      zooming: false,
      watcher: null,

      mapwidth: 610,
      mapheight: 225,
      translator: null,
      scaler: null,
      transform: this.zoomTransform,
      d: null,
      projection: d3
        .geoEquirectangular()
        .scale(1)
        .translate([0, 0]),

      colorScaleOptions: [
          {text: 'Forecast', value: d3.scaleThreshold().domain(this.mapData.thresholds).range(d3.schemeOrRd[6])},
          {text: 'Climatology', value: d3.scaleThreshold().domain(this.mapData.thresholds).range(d3.schemeOrRd[6])},
          {text: 'Anomaly', value: d3.scaleThreshold().domain(this.mapData.thresholds).range(d3.schemeRdBu[7].reverse())},
          {text: 'Active fires', value: d3.scaleThreshold().domain(this.mapData.thresholds).range(d3.schemeOrRd[6])},
          {text: 'Validation', value: d3.scaleOrdinal().domain(this.mapData.thresholds).range(["#70c1b3", "#247ba0", "#f25f5c", "#ffe066"])},
      ],
    }
  },

  created() {
    this.path = d3.geoPath().projection(this.projection)
    this.d = () => this.path(land)
    this.colorScale = this.getColorScale
    this.linScale = d3.scaleLinear()
      .domain([-1, this.colorScale.range().length - 1])
      .rangeRound([0, 200])
  },

  watch: {
    mapData(newVal) {
      this.colorScale = this.getColorScale
      this.coords = this.reproject
      this.colorBack = this.colorScale(0)
    }
  },

  mounted() {
    this.land = land
    this.colorBack = this.colorScale(0)
    window.addEventListener('resize', this.updateDimensions)
    this.updateDimensions()

    // determine scale and translatio
    const b = this.path.bounds(land)
    this.scaler =
      0.99 /
      Math.max(
        (b[1][0] - b[0][0]) / this.mapwidth,
        (b[1][1] - b[0][1]) / this.mapheight
      )

    this.translator = [
      (this.mapwidth - this.scaler * (b[1][0] + b[0][0])) / 2,
      (this.mapheight - this.scaler * (b[1][1] + b[0][1])) / 2
    ]
    this.projection = this.realProjection

    this.coords = this.reproject
    this.path = d3.geoPath().projection(this.projection)
    this.d = () => this.path(land)

    this.watcher = this.$watch(
        () => {
          return {
            w: this.dimensions.width,
            h: this.dimensions.height,
            k: this.zoomTransform.k,
            x: this.zoomTransform.x,
            y: this.zoomTransform.y
          }
        },
        () => {
          if (this.selection)
            this.zoom.transform(this.selection, this.zoomTransform)
        }
      )

    this.selection = d3.select(this.$el)
    this.zoom.on('zoom', this.onZoom)
    this.zoom.on('start', () => {
      if (this.watcher) this.watcher()
      this.zooming = true
    })
    this.zoom.on('end', () => {
      this.zooming = false
      this.watcher = this.$watch(
        () => {
          return {
            w: this.dimensions.width,
            h: this.dimensions.height,
            k: this.zoomTransform.k,
            x: this.zoomTransform.x,
            y: this.zoomTransform.y
          }
        },
        () => {
          if (this.selection)
            this.zoom.transform(this.selection, this.zoomTransform)
        }
      )
    })
    this.zoom(this.selection)
  },

  Updated() {
    this.onZoom()
  },

  beforeDestroy() {
    if (this.watcher) this.watcher()
    this.zoom.on('zoom', null)
    window.removeEventListener('resize', this.updateDimensions)
  },

  activated() {
    window.addEventListener('resize', this.updateDimensions)
  },
  deactivated() {
    window.removeEventListener('resize', this.updateDimensions)
  },

  computed: {
 
    getLabel: function() {
        if (this.mapData.label === 'Active fires') {
            return this.mapData.label.concat(" count")
        } 
        else if (this.mapData.label === 'Validation') {
            return this.mapData.label
        }
        else if (this.mapData.label === 'Anomaly') {
            return "Probability ".concat(this.mapData.label).concat(" %")
        }
        else {
            return this.mapData.label.concat(" probability %")
        }
    },

    getColorScale: function() {
      let colorScale = this.colorScaleOptions.find(x => x.text === this.mapData.label)
      colorScale = colorScale.value
      colorScale.domain(this.mapData.thresholds)
      return colorScale
    },

    reproject: function() {
      let coordsNew = []
      for (let i = 0; i < this.mapData.vals.length; i++) {
        coordsNew[i] = []; // Initialize inner array
            coordsNew[i][0] = this.projection(this.mapData.vals[i][1])
            coordsNew[i][1] = this.colorScale(this.mapData.vals[i][0])
      }
      return coordsNew
    },

    getColorC: function() {
      return this.colorScale(Math.random())
    },

    zoom() {
      return zoom().scaleExtent([1, 3])
    },

    viewBoxString() {
      return `0 0 ${this.mapwidth} ${this.mapheight}`
    },
    realProjection() {
      return d3
        .geoEquirectangular()
        .translate(this.translator)
        .scale(this.scaler)
        .precision(0.001)
    }
  },

  methods: {

  getlinScale(index) {
      return this.linScale(index)
  },

    updateDimensions() {
        const bounds = (this.$refs.svg || this.$el).getBoundingClientRect()
        this.dimensions.width = bounds.width
        this.dimensions.height = bounds.height
    },

    onZoom() {

      /** @type {D3ZoomEvent} */
      const e = event
      const tx = Math.min(
        0,
        Math.max(e.transform.x, this.mapwidth - this.mapwidth * e.transform.k)
      )
      const ty = Math.min(
        0,
        Math.max(e.transform.y, this.mapheight - this.mapheight * e.transform.k)
      )
      e.transform.x = tx
      e.transform.y = ty
      this.transformProp = {
        transform: e.transform.toString()
      }

      this.$emit('update:zoomTransform', e.transform)
    },
    reset() {
      this.$emit('zoomTransform', zoomIdentity)
    }
  }
}
</script>

<style scoped lang="scss">
div.box {
  padding: 0px;
  margin: 0px;
  display: flex;
}
.pan-zoom {
  overflow: visible;
  position: relative;
}

.pan-content {
  clip-path: rect(0 0 0 0px);
}
</style>
