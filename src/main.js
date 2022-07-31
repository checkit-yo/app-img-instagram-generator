import Vue from 'vue'
import App from './App.vue'
import ImageKit from "imagekitio-vue"

Vue.config.productionTip = false

Vue.use(ImageKit, {
  urlEndpoint: "https://ik.imagekit.io/checkmyfreakyimage", // Required. Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
  publicKey: "public_qMGhlXVCyJbi/kvK6IJhsGKHf4Q=", // optional
  authenticationEndpoint: "http://check-it-official-api.herokuapp.com/api/v1.4.0/apps/imagekit-auth" // optional
})

new Vue({
  render: h => h(App),
}).$mount('#app')
