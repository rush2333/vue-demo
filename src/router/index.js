import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Vip from '@/components/vip/Vip'
import Cart from '@/components/cart/Cart'
import Search from '@/components/search/Search'
import NewsList from '@/components/news/NewsList'
import NewsDetail from '@/components/newsDetail/newsDetail'
import PhotosList from '@/components/photos/PhotosList'
import PhotoDetail from '@/components/photoDetail/photoDetail'
import GoodsList from '@/components/goodsList/GoodsList'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'link-active',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/vip',
      name: 'vip',
      component: Vip
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/news/list',
      name: 'news.list',
      component: NewsList
    },
    {
      path: '/news/detail',
      name: 'detail',
      component: NewsDetail
    },
    {
      path: '/photos/list/:categoryId',
      name: 'photos.list',
      component: PhotosList
    },
    {
      path: '/photos/detail',
      name: 'photos.detail',
      component: PhotoDetail
    },
    {
      path: '/goods/list/:page',
      name: 'goods.list',
      component: GoodsList
    },
  ]
})
