<template>
  <div id="app">
    <mt-header fixed title="信息管理系统" >
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <router-view />

    <div class="tabBar">
      <ul>
        <li v-for="(tab,index) in tabs" :key="tab.id">
          <router-link :to="tab.routerName" @click.native="changeHash(index)" :class='{"link-active":index == currentIndex}'>
            <img :src="tab.imgSrc" alt />
            <p>{{tab.title}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <img slot="icon" src="./assets/home.png" />
        首页
      </mt-tab-item>
      <mt-tab-item id="vip">
        <img slot="icon" src="./assets/vip.png" />
        会员
      </mt-tab-item>
      <mt-tab-item id="cart">
        <img slot="icon" src="./assets/cart.png" />
        购物车
      </mt-tab-item>
      <mt-tab-item id="search">
        <img slot="icon" src="./assets/search.png" />
        搜索
      </mt-tab-item>
    </mt-tabbar> -->
  </div>
</template>

<script>
import index from "./assets/home.png";
import vip from "./assets/vip.png";
import shopcart from "./assets/cart.png";
import search from "./assets/search.png";

var tabs = [
  { id: 1, title: "首页", imgSrc: index, routerName: { name: "home" } },
  { id: 2, title: "会员", imgSrc: vip, routerName: { name: "vip" } },
  { id: 3, title: "购物车", imgSrc: shopcart, routerName: { name: "cart" } },
  { id: 4, title: "搜索", imgSrc: search, routerName: { name: "search" } }
];
export default {
  name: "App",
  data() {
    return {
      selected: "home",
      tabs: tabs,
      currentIndex:0,
    };
  },
  methods:{
    changeHash(index){
      this.currentIndex = index;
    }
  },
  watch: {
    selected: function(newV) {
      this.$router.push({ name: this.selected });
    }
  },
  // created(){
  //   this.$axios.get('/api/getUser/2')
  //   .then(res=>{console.log(res)})
  // }
};
</script>

<style scoped>
.tabBar {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    180deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 50%
  );
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: top left;
  background-color: #fafafa;
}
.tabBar ul {
  width: 100%;
  overflow: hidden;
}
.tabBar ul li {
  float: left;
  width: 25%;
  height: 55px;
  text-align: center;
}
.tabBar ul li a img {
  width: 25px;
  height: 25px;
}
.tabBar ul li a {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding-top: 10px;
}
.tabBar ul li a.link-active {
  background-color: #ceceff
} 
.tabBar ul li a p {
  font-size: 12px;
}
</style>
