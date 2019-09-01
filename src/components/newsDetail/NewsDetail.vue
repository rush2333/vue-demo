<template>
  <div class="news-detail">
    <NavBar title="新闻详情" />
    <div class="item">
      <p>{{detail.title}}</p>
      <div>
        <span>{{detail.click}}次点击</span>
        <span>分类：民生经济</span>
        <span>添加时间:{{detail.add_time|coverTime('YYYY-MM-DD')}}</span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="detail-content">{{detail.content}}</div>
  </div>
</template>

<script>
export default {
  name: "NewsDetail",
  data(){
    return{
      detail:{}
    }
  },
  created() {
    let id = this.$route.query.id;
    this.$axios
      .get("getNew", {
        data: {
          id: id
        }
      })
      .then(res => {
        this.detail = res.data.data[0]
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
.news-detail {
  padding-bottom: 55px;
}
.item p {
  color: #66ccff;
  font-size: 24px;
  font-weight: 600;
}
.item span {
  margin-right: 15px;
  color: #999;
  font-size: 12px;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: #b3b3b3;
  margin: 5px 0;
}
.detail-content {
  padding: 3px;
}
</style>