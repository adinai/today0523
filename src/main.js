import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import router from './router'
Vue.use(ElementUI, { locale });

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
