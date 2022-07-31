<template>
  <div id="app">
    <img v-show="false" ref="tmp" :src="imgUrl2" alt="" @load="getAverageColor">
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
        w: window.innerWidth, 
        h: window.innerHeight
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
    getCanvasContentPosition(img) {
      const leftPos = window.innerWidth / 8
      const topPos = window.innerHeight / 5.2
      const imgSize = {
        h: 100 * img.height / img.width,
        w: window.innerWidth - (window.innerWidth / 4) 
      } 
      console.log(`Left: ${leftPos}, Top: ${topPos}, img: h-${imgSize.h} w-${imgSize.w}`)
      return {
        leftPos,
        topPos,
        imgSize
      }
    },
    async generateImg() {
      const img =  new Image()
      img.src = this.imgUrl2
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        const {
          leftPos,
          topPos,
          imgSize
        } = this.getCanvasContentPosition(img)
        this.selfContext.drawImage(
          img,
          leftPos,
          topPos,
          imgSize.w,
          imgSize.h+100
        )
      }
    },
    getAverageColor() {
      const fast = new FastAverageColor()
      const color = fast.getColor(this.$refs.tmp)
      this.generateGradient(color)
      return color
    },
    generateGradient() {
      let superctx = this.$refs.drawer.getContext('2d').createLinearGradient(0,0,0,800);
      window.superctx = superctx
      superctx.addColorStop(0, 'transparent');
      superctx.addColorStop(1, 'transparent');

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
body, html {
  background: black;
  padding: 0;
  margin: 0;
}
 #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
 }

button {
  position: fixed;
  left: 15px;
  right: 15px;
  bottom: 15px;
  padding: 5px;
  height: 58.000003814697266px;
  border-radius: 15px;
  border: none;
  padding: 24px, 64px, 24px, 64px;
  background: linear-gradient(135deg, #A26CFA 15.87%, #792CF2 85.31%);
  color: white;
  font-weight: bold;
}

@media (hover: hover) {
    button:hover {
        background: linear-gradient(135deg, #7454a7 15.87%, #531ea8 85.31%);
    }
}
</style>
