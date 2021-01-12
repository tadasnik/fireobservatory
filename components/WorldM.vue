<template>
  <section class="section">
    <div class = "box">
       <!-- Inner Content -->
        <svg

        style="overflow: hidden;"
        width="100%"
        height="100%"
        :viewBox="viewBoxString"
        >
        <g>
          <path
            fill="#909090"
            stroke="#909090"
            stroke-width="0.5"
            :d="d()"
          />
          </g>
        <g>
          <path
            fill="None"
            stroke="#909090"
            stroke-width="0.5"
            :d="out()"
          />
          </g>

       </svg>
      </div>
  </section>
</template>

<script>
import {geoPath} from "d3-geo";
import {geoEckert3} from "d3-geo-projection"
import {geoOrthographic, geoGraticule} from "d3-geo"
import { event, zoom, zoomIdentity } from 'd3'
import * as topojson from 'topojson-client'
import dataset from '@/assets/110m.json'
//import dataset from '@/assets/geo/ind_topo_simp_quant.json'
//const world = topojson("https://unpkg.com/world-atlas@1/world/110m.json")

//const land = topojson.feature(dataset, dataset.objects.ind_geojson)
const land = topojson.feature(dataset, dataset.objects.land)
export default {
   // <p v-if="$fetchState.pending">Fetching mountains...</p>
   // <p v-else-if="$fetchState.error">An error occurred :(</p>

  //async fetch() {
  //  const borders = await fetch('https://unpkg.com/world-atlas@1.1.4/world/110m.json').then((res) => res.json())
    async fetch() {
          this.borders = await fetch(
            //'https://api.nuxtjs.dev/mountains'
            'https://unpkg.com/world-atlas@1.1.4/world/110m.json'
          ).then(res => res.json())
        },
    



  props: {
  },

  data() {
    return {
      mapwidth: 300,
      mapheight: 300,
      projection: geoOrthographic()
        .scale(1)
        .translate([0, 0]),

//     projection = d3.geoOrthographic()
//      .fitExtent([[1, 1], [width - 20, height - 40]], sphere)
//      .translate([width / 2, height / 2])
//      .rotate([-25, -20, 0])
//      .precision(.1),

      borders: {},
      graticule: null,
      outline: null,
      land: null,
      path: null,
      d: null,

    }
  },

  created() {
    this.path = geoPath().projection(this.projection)
    this.d = () => this.path(land)
    this.out = () => this.path(geoGraticule().outline())
    //this.colorScale = this.getColorScale
    //this.linScale = d3.scaleLinear()
    //  .domain([-1, this.colorScale.range().length - 1])
    //  .rangeRound([0, 200])
  },

  watch: {

    //mapData(newVal) {
     // this.colorScale = this.getColorScale
      //this.coords = this.reproject
     // this.colorBack = this.colorScale(0)
  },

  mounted() {
    console.log(this.borders)
    this.land = land
    //this.land = this.borders.objects.land
    //console.log(this.borders.objects)
    const b = this.path.bounds(land)
    this.scaler =
      .99 /
      Math.max(
        (b[1][0] - b[0][0]) / this.mapwidth,
        (b[1][1] - b[0][1]) / this.mapheight
      )

    this.translator = [
      (this.mapwidth - this.scaler * (b[1][0] + b[0][0])) / 2,
      (this.mapheight - this.scaler * (b[1][1] + b[0][1])) / 2
    ]
    this.projection = this.realProjection

    //this.coords = this.reproject
    this.path = geoPath().projection(this.projection)
    this.d = () => this.path(land)
    this.out = () => this.path(geoGraticule().outline())

   //this.land = topojson.feature(this.borders, this.borders.objects.countries)
    //this.path = d3.geoPath().projection(this.projection)
    //this.d = () => this.path(land)
 
    //this.colorBack = this.colorScale(0)
    //window.addEventListener('resize', this.updateDimensions)
    //this.updateDimensions()
  },

  computed: {
    viewBoxString() {
      return `0 0 ${this.mapwidth} ${this.mapheight}`
    },

    realProjection() {
      return geoOrthographic()
        .translate(this.translator)
        .scale(this.scaler)
        .precision(0.1)
    }


  },

  methods: {

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
