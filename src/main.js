// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '../theme/index.less'
import './assets/styles/common.less'
import Common from './assets/js/common'

Vue.config.productionTip = false

Vue.prototype.Common = Common
Vue.use(iView)

Vue.filter('timer', Common.formatterTime)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
