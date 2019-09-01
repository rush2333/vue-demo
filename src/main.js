import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import Axios from 'axios'
import Moment from 'moment'
import 'mint-ui/lib/style.css'
import '../static/css/global.css'
import './assets/font_class/iconfont.css'
import './mock'

import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview);

Vue.config.productionTip = false

Vue.use(MintUI);

Axios.defaults.baseURL = 'http://rush2333.com/api/';
Vue.prototype.$axios = Axios;
import Comment from '@/components/common/Comment'
import NavBar from '@/components/common/NavBar'
// 定义过滤器
Vue.filter('coverTime', function (data, Str) {
  return Moment(data).format(Str)
})
Vue.filter('relativeTime', function (data) {
  return Moment(data).fromNow()
})
Vue.filter('controllShow', function (str, num) {
  if (str.length <= num) {
    return str
  }
  if (str.length > num) {
    return str.substr(0, num - 1) + '...';
  }
})


Moment.locale('zh-cn')

Vue.component(NavBar.name, NavBar)
Vue.component(Comment.name, Comment)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
