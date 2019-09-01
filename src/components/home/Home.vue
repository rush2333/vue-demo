<template>
  <div id="home">
    <mt-swipe :auto="4000" style="height:150px" class="swipe">
      <mt-swipe-item v-for="(item,index) in imgs" :key="index">
        <img :src="item.image_url" alt />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 九宫格 -->
    <div class="list">
      <ul>
        <li v-for="(grid) in grids" :key="grid.id">
          <router-link :to="grid.router">
            <img :src="grid.src" alt />
            <p>{{grid.title}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template> 

<script>
import src1 from "../../assets/xinwen.png";
import src2 from "../../assets/tuwen.png";
import src3 from "../../assets/shangpin.png";
import src4 from "../../assets/zixun.png";
import src5 from "../../assets/liuyan.png";
import src6 from "../../assets/contact.png";
var grids = [
  { id: 1, src: src1, title: "新闻资讯", router: { name: "news.list" } },
  {
    id: 2,
    src: src2,
    title: "图文分享",
    router: { name: "photos.list", params: { categoryId: 0 } }
  },
  {
    id: 3,
    src: src3,
    title: "商品展示",
    router: { name: "goods.list", params: { page: 1 } }
  },
  { id: 4, src: src4, title: "资讯", router: { name: "news.list" } },
  { id: 5, src: src5, title: "留言", router: { name: "news.list" } },
  { id: 6, src: src6, title: "联系我们", router: { name: "news.list" } }
];

export default {
  name: "Home",
  data() {
    return {
      imgs: [],
      grids: grids
    };
  },
  created() {
    this.$axios
      .get("/image")
      .then(res => {
        this.imgs = res.data.list;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.swipe {
  height: 200px;
}
.swipe img {
  width: 100%;
  height: 100%;
}
.list {
  width: 100%;
}
.list ul {
  display: flex;
  flex-wrap: wrap;
}
.list ul li {
  width: 33%;
  height: 60px;
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
}
.list ul li a {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 0 auto;
}
.list ul li:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.list ul li img {
  width: 30px;
}
.list ul li p {
  margin-top: 5px;
}
</style>