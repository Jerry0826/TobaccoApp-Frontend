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
import {
  Pagination,
  Menu,
  MenuItem,
  Input,
  Radio,
  RadioGroup,
  RadioButton,
  Backtop,
  Option,
  Select,
  Button,
  Rate,
  Table,
  TableColumn,
  Progress,
  Loading,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Pagination);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Backtop);
Vue.use(Option);
Vue.use(Select);
Vue.use(Button);
Vue.use(Rate);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Progress);
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