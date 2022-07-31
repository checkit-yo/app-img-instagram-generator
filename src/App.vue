<template>
  <div id="app">
    <img ref="tmp" :src="imgUrl2" alt="" @load="getAverageColor">
      <button @click="downloadSnapshot">
        Share on Instagram bro !
      </button>
    <canvas ref="drawer" id="el-canvaso"></canvas>
  </div>
</template>

<script>
import {FastAverageColor} from 'fast-average-color'

export default {
  name: 'App',
  async mounted() {
    this.$refs.drawer.width = this.canvasSize.w
    this.$refs.drawer.height = this.canvasSize.h
    this.$refs.tmp.crossOrigin = 'Anonymous'
    this.selfContext = this.$refs.drawer.getContext('2d')

    await this.generateImg()
  },
  data() { 
    return {
      canvasSize: {
        w: 415, 
        h: 890
      },
      isLoaded: false,
      selfContext: null,
      imgUrl2: 'https://ik.imagekit.io/checkmyfreakyimage/checkit_0JkQOOBv8'
    }
  },
  computed: {
    isContextLoaded() {
      return this.selfContext !== null
    }
  },
  methods: {
    async generateImg() {
      const img =  new Image()
      img.src = this.imgUrl2
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        this.selfContext.drawImage(img, 59, 152, 313, 313)
      }
    },
    getAverageColor() {
      const fast = new FastAverageColor()
      const color = fast.getColor(this.$refs.tmp)
      this.generateGradient(color)
      return color
    },
    generateGradient({hex}) {
      let superctx = this.$refs.drawer.getContext('2d').createLinearGradient(0,0,0,800);
      window.superctx = superctx
      superctx.addColorStop(0, hex);
      superctx.addColorStop(1, '#2f3136');

      // Fill with gradient
      this.selfContext.fillStyle = superctx;
      this.selfContext.fillRect(0,0,this.canvasSize.w,this.canvasSize.h);
    },
    async downloadSnapshot() {
      const dataUrl = await this.$refs.drawer.toDataURL()
      console.log(dataUrl)
      const blob = await (await fetch(dataUrl)).blob();
      const filesArray = [
        new File(
          [blob],
          'animation.png',
          {
            type: blob.type,
            lastModified: new Date().getTime()
          }
        )
      ];
      const shareData = {
        files: filesArray,
      };
      navigator.share(shareData);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
 }

</style>
