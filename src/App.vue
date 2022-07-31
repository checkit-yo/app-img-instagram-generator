<template>
  <div id="app">
    <button>
      Share on Instagram bro !
    </button>
    <canvas ref="drawer" id="el-canvaso"></canvas>
  </div>
</template>

<script>
export default {
  name: 'App',
  async mounted() {
    this.selfContext = this.$refs.drawer.getContext('2d')

    this.generateImg()
    this.addBackground()
  },
  data() {
    return {
      canvasSize: {
        w: 415, 
        l: 890
      },
      selfContext: null,
      imgUrl: 'https://media-private.canva.com/mo_Uw/MAE9WDmo_Uw/1/s3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20220731%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220731T001536Z&X-Amz-Expires=62356&X-Amz-Signature=214c4fb3547389778d1cf0b34bcb45030b31edd4209c139240f3b6d87abb3689&X-Amz-SignedHeaders=host&response-expires=Sun%2C%2031%20Jul%202022%2017%3A34%3A52%20GMT'
    }
  },
  computed: {
    isContextLoaded() {
      return this.selfContext !== null
    }
  },
  methods: {
    generateImg() {
      const img =  new Image()
      img.src = this.imgUrl
      img.onload = () => {
        this.selfContext.drawImage(img, 0, 0)
      }
    },
    addBackground() {

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

#el-canvaso {
    width: 100%;
    height: 100%;
  }

  img {
    width: 179px;
    height: 200px;
  }
</style>
