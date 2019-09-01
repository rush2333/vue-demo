<template>
  <div class="photos-list">
    <NavBar title="图文分享" />
    <div class="category-list">
      <ul>
        <li
          v-for="(items,index) in categoryList"
          :key="items.id"
          @click="chooseCategory(items.id,index)"
        >
          <a href="javaScript:void(0)" :class="{active:index==currentIndex}">{{items.title}}</a>
        </li>
      </ul>
    </div>

    <div class="photo-list">
      <ul>
        <li v-for="items in imgList" :key="items.id">
          <router-link :to="{name:'photos.detail',query:{id:items.id}}">
            <!-- <img :src="items.img_url" alt /> -->
            <!-- mint-UI lazy Load -->
            <img v-lazy="items.img_url" />
          </router-link>
          <p>
            <span>{{items.title}}</span>
            <br />
            <span>{{items.summary}}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import photo1 from "../../assets/demophto.jpg";
export default {
  name: "PhotosList",
  data() {
    return {
      photo1: photo1,
      categoryList: [],
      imgList: [],
      currentIndex: 0
    };
  },
  methods: {
    loadImgsList(id) {
      this.$axios
        .get(`getImages/${id}`)
        .then(res => {
          console.log(res);
          this.imgList = res.data.data;
          if (this.imgList.length === 0) {
            this.$toast({
              message: "没有图片",
              iconClass: "iconfont icon-shibai",
              duration: 1000
            });
          }
          console.log(res);
        })
        .catch(err => {
          console.log("无法获取图片");
        });
    },
    chooseCategory(id, index) {
      this.$router.push({ name: "photos.list", params: { categoryId: id } });
      this.currentIndex = index;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadImgsList(to.params.categoryId);
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to);
    this.loadImgsList(to.params.categoryId);
    next();
  },
  created() {
    this.$axios
      .get("getCategoryList", {
        params: {
          id: 0
        }
      })
      .then(res => {
        this.categoryList = res.data.data;
        this.categoryList.unshift({ id: 0, title: "全部" });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.photos-list {
  padding-bottom: 100px;
}
.category-list {
  width: 100%;
  overflow: hidden;
}
.category-list ul {
  width: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
  white-space: nowrap;
}
.category-list ul li {
  display: inline-block;
  width: 25%;
  height: 100%;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
}
.category-list ul li a {
  text-decoration: none;
}
.category-list ul li a.active {
  color: #fc0280;
}
.photos-list ul li a {
  text-decoration: none;
  display: block;
  width: 100%;
}
.photos-list ul li {
  position: relative;
}
.photos-list ul li p {
  overflow: hidden;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 5px 0;
}
.photos-list ul li p span {
  color: #e6e6e6;
  display: inline-block;
  margin: 0 5px;
  font-size: 12px;
}
.photos-list ul li a img {
  width: 100%;
  height: 200px;
}
image[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>