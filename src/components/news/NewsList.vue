<template>
  <div class="news">
    <NavBar title="新闻列表" />
    <div class="news-list">
      <ul>
        <li v-for="news in newsList " :key="news.id">
          <router-link :to='{name:"detail", query:{id:news.id}}'>
            <div class="new-img">
              <img :src="news.img_url" alt />
            </div>
            <div class="content">
              <p class="title">{{news.title}}</p>
              <div class="news-desc">
                <p class="summary">{{news.summary}}</p>
                <p>
                  <span class="praise">点赞数：{{news.click}}</span>
                  <!-- 使用过滤器格式化时间 -->
                  <span class="time">发表时间：{{news.add_time | coverTime('YYYY-MM-DD')}}</span>
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsList",
  data() {
    return {
      newsList: []
    };
  },
  created() {
    this.$axios
      .get("getnewslist")
      .then(res => {
        this.newsList = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.news {
  padding-bottom: 55px;
}
.news-list {
  width: 100%;
  border-bottom: 1px solid #cccccc;
  font-size: 12px;
}
.news-list ul li {
  position: relative;
}
.news-list ul li a {
  display: block;
  width: 100%;
  height: 120px;
  color: #808080;
  display: flex;
  text-decoration: none;
}
.new-img {
  width: 30%;
  margin: 10px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.news-list ul li a img {
  border-radius: 3px;
  background-color: #aaddee;
  width: 100px;
  height: 80px;
}
.content {
  margin-right: 15px;
}
.content .title {
  font-size: 15px;
  display: inline-block;
  color: #131f3c;
  letter-spacing: 0;
  padding-bottom: 7px;
  margin-top: 10px;
  font-family: PingFangSC-Regular;
}
.news-desc span {
  color: #ff6700;
}
.summary {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
.praise {
  position: absolute;
  bottom: 10px;
}
.time {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
</style>