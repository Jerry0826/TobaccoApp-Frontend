import App from './App'
import home from './pages/home/home.vue'
Vue.component('home',home)
import product from './pages/product/product.vue'
Vue.component('product',product)
import add from './pages/add/add.vue'
Vue.component('add',add)
import analyse from './pages/analyse/analyse.vue'
Vue.component('analyse',analyse)
import my from './pages/my/my.vue'
Vue.component('my',my)
import cuCustom from './components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
// #ifndef VUE3
import Vue from 'vue'
// import uView from "uview-ui";
// Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import analyseVue from './pages/analyse/analyse.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif